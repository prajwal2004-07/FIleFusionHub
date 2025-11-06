"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, Loader2, X } from "lucide-react"

interface ImageFile {
  id: string
  file: File
  preview: string
}

export default function CompressImageClient() {
  const [images, setImages] = useState<ImageFile[]>([])
  const [targetSize, setTargetSize] = useState("")
  const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB")
  const [quality, setQuality] = useState(75)
  const [isProcessing, setIsProcessing] = useState(false)
  const [compressedImages, setCompressedImages] = useState<Map<string, { original: number; compressed: number }>>(
    new Map(),
  )
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: ImageFile = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: e.target?.result as string,
        }
        setImages((prev) => [...prev, newImage])
      }
      reader.readAsDataURL(file)
    })
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    handleFileSelect(e.dataTransfer.files)
  }

  const compressImage = async (imageId: string) => {
    const image = images.find((img) => img.id === imageId)
    if (!image) return

    setIsProcessing(true)
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      const img = new Image()
      img.crossOrigin = "anonymous"

      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
        img.src = image.preview
      })

      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0)

      const targetBytes = targetSize
        ? targetUnit === "MB"
          ? Number(targetSize) * 1024 * 1024
          : Number(targetSize) * 1024
        : image.file.size * 0.8

      let currentQuality = quality
      let compressedBlob: Blob | null = null

      while (currentQuality > 10) {
        const blob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/jpeg", currentQuality / 100)
        })

        if (blob.size <= targetBytes) {
          compressedBlob = blob
          break
        }

        currentQuality -= 5
      }

      if (!compressedBlob) {
        compressedBlob = await new Promise<Blob>((resolve) => {
          canvas.toBlob((b) => resolve(b!), "image/jpeg", 0.1)
        })
      }

      setCompressedImages((prev) => {
        const map = new Map(prev)
        map.set(imageId, {
          original: image.file.size,
          compressed: compressedBlob!.size,
        })
        return map
      })

      const url = URL.createObjectURL(compressedBlob)
      const a = document.createElement("a")
      a.href = url
      a.download = `compressed-${image.file.name.split(".")[0]}-${Date.now()}.jpg`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Image compression error:", error)
      alert("Error compressing image. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const compressAll = async () => {
    setIsProcessing(true)
    try {
      for (const image of images) {
        await compressImage(image.id)
      }
    } finally {
      setIsProcessing(false)
    }
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
    setCompressedImages((prev) => {
      const map = new Map(prev)
      map.delete(id)
      return map
    })
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const totalOriginal = images.reduce((sum, img) => sum + img.file.size, 0)
  const totalCompressed = Array.from(compressedImages.values()).reduce((sum, info) => sum + info.compressed, 0)

  return (
    <div className="space-y-8">
      {images.length === 0 && (
        <div
          className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary transition-smooth cursor-pointer bg-primary/5"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto mb-4 text-primary" size={32} />
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload Images</h3>
          <p className="text-muted-foreground mb-4">Drag and drop images here, or click to select</p>
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{images.length} Images Selected</h2>
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-smooth"
            >
              Add More
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="block text-sm font-medium text-foreground mb-2">Quality: {quality}%</label>
              <input
                type="range"
                min="10"
                max="100"
                step="5"
                value={quality}
                onChange={(e) => setQuality(Number(e.target.value))}
                className="w-full"
              />
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="block text-sm font-medium text-foreground mb-2">Target Size (Optional)</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={targetSize}
                  onChange={(e) => setTargetSize(e.target.value)}
                  placeholder="e.g., 264"
                  className="flex-1 px-3 py-2 bg-background border border-input rounded-lg text-foreground"
                />
                <select
                  value={targetUnit}
                  onChange={(e) => setTargetUnit(e.target.value as "KB" | "MB")}
                  className="px-3 py-2 bg-background border border-input rounded-lg text-foreground"
                >
                  <option>KB</option>
                  <option>MB</option>
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            {images.map((image) => {
              const compressed = compressedImages.get(image.id)
              const reduction = compressed
                ? (((compressed.original - compressed.compressed) / compressed.original) * 100).toFixed(1)
                : 0

              return (
                <div key={image.id} className="flex items-center gap-4 p-4 rounded-lg border border-border bg-card">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                    <img
                      src={image.preview || "/placeholder.svg"}
                      alt={image.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-foreground truncate">{image.file.name}</p>
                    <p className="text-sm text-muted-foreground">{formatBytes(image.file.size)}</p>
                    {compressed && (
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Reduced by {reduction}% → {formatBytes(compressed.compressed)}
                      </p>
                    )}
                  </div>
                  <button
                    onClick={() => compressImage(image.id)}
                    disabled={isProcessing}
                    className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center gap-2"
                  >
                    {isProcessing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />}
                    {compressed ? "Re-compress" : "Compress"}
                  </button>
                  <button
                    onClick={() => removeImage(image.id)}
                    className="p-2 hover:bg-destructive/10 rounded-lg transition-smooth"
                  >
                    <X size={18} className="text-destructive" />
                  </button>
                </div>
              )
            })}
          </div>

          {images.length > 1 && (
            <button
              onClick={compressAll}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Compress All ({images.length} images)
                </>
              )}
            </button>
          )}

          {totalCompressed > 0 && (
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
              <p className="text-sm font-medium text-blue-900 dark:text-blue-300 mb-2">Compression Summary</p>
              <div className="space-y-1 text-sm text-blue-800 dark:text-blue-200">
                <p>Total Original: {formatBytes(totalOriginal)}</p>
                <p>Total Compressed: {formatBytes(totalCompressed)}</p>
                <p className="font-semibold">
                  Reduced by {(((totalOriginal - totalCompressed) / totalOriginal) * 100).toFixed(1)}%
                </p>
              </div>
            </div>
          )}

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept="image/*"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}
    </div>
  )
}
