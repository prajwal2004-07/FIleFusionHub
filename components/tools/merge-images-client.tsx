"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, RotateCw, GripVertical, X, Loader2 } from "lucide-react"

interface MergedImage {
  id: string
  file: File
  preview: string
  rotation: number
}

export default function MergeImagesClient() {
  const [images, setImages] = useState<MergedImage[]>([])
  const [orientation, setOrientation] = useState<"vertical" | "horizontal">("vertical")
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: MergedImage = {
          id: Math.random().toString(36).substr(2, 9),
          file,
          preview: e.target?.result as string,
          rotation: 0,
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

  const rotateImage = (id: string) => {
    setImages((prev) => prev.map((img) => (img.id === id ? { ...img, rotation: (img.rotation + 90) % 360 } : img)))
  }

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id))
  }

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return
    const newImages = [...images]
    const [movedImage] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, movedImage)
    setImages(newImages)
  }

  const mergeImages = async () => {
    if (images.length < 2) {
      alert("Please upload at least 2 images")
      return
    }

    setIsProcessing(true)
    try {
      const canvas = document.createElement("canvas")
      const ctx = canvas.getContext("2d")!

      // Load all images
      const imgElements: HTMLImageElement[] = await Promise.all(
        images.map(
          (img) =>
            new Promise<HTMLImageElement>((resolve) => {
              const imgEl = document.createElement("img")
              imgEl.onload = () => resolve(imgEl)
              imgEl.src = img.preview
              imgEl.crossOrigin = "anonymous"
            }),
        ),
      )

      // Calculate canvas size
      let totalWidth = 0
      let totalHeight = 0
      const imgHeights: number[] = []
      const imgWidths: number[] = []

      imgElements.forEach((el, idx) => {
        const rotation = images[idx].rotation
        const isRotated = rotation === 90 || rotation === 270

        let width = el.width
        let height = el.height

        if (isRotated) {
          ;[width, height] = [height, width]
        }

        imgWidths.push(width)
        imgHeights.push(height)

        if (orientation === "vertical") {
          totalHeight += height
          totalWidth = Math.max(totalWidth, width)
        } else {
          totalWidth += width
          totalHeight = Math.max(totalHeight, height)
        }
      })

      // Set canvas size with padding
      const padding = 10
      canvas.width = orientation === "vertical" ? totalWidth : totalWidth + padding * (images.length - 1)
      canvas.height = orientation === "vertical" ? totalHeight + padding * (images.length - 1) : totalHeight

      // Fill with white background
      ctx.fillStyle = "#ffffff"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw images
      let currentX = 0
      let currentY = 0

      imgElements.forEach((el, idx) => {
        const rotation = images[idx].rotation
        const width = imgWidths[idx]
        const height = imgHeights[idx]

        ctx.save()
        ctx.translate(currentX + width / 2, currentY + height / 2)
        ctx.rotate((rotation * Math.PI) / 180)
        ctx.drawImage(el, -width / 2, -height / 2, width, height)
        ctx.restore()

        if (orientation === "vertical") {
          currentY += height + padding
        } else {
          currentX += width + padding
        }
      })

      // Download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob)
          const a = document.createElement("a")
          a.href = url
          a.download = `merged-${orientation}-${Date.now()}.png`
          a.click()
          URL.revokeObjectURL(url)
        }
      })
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary transition-smooth cursor-pointer bg-primary/5"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto mb-4 text-primary" size={32} />
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Images</h3>
        <p className="text-muted-foreground mb-4">Drag and drop your images here, or click to select</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {/* Images List */}
      {images.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-foreground">{images.length} Images Selected</h2>
            <div className="flex gap-2">
              <button
                onClick={() => setOrientation("vertical")}
                className={`px-4 py-2 rounded-lg transition-smooth ${
                  orientation === "vertical" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Vertical
              </button>
              <button
                onClick={() => setOrientation("horizontal")}
                className={`px-4 py-2 rounded-lg transition-smooth ${
                  orientation === "horizontal" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                Horizontal
              </button>
            </div>
          </div>

          <div className="space-y-3">
            {images.map((img, idx) => (
              <div
                key={img.id}
                draggable
                onDragOver={() => setDragOverId(img.id)}
                onDragLeave={() => setDragOverId(null)}
                onDrop={() => {
                  const draggedIdx = images.findIndex((i) => i.id === dragOverId)
                  if (draggedIdx !== -1 && draggedIdx !== idx) {
                    moveImage(draggedIdx, idx)
                  }
                  setDragOverId(null)
                }}
                className={`flex items-center gap-4 p-4 rounded-lg border transition-smooth ${
                  dragOverId === img.id ? "border-primary bg-primary/10" : "border-border bg-card"
                }`}
              >
                <GripVertical className="text-muted-foreground flex-shrink-0" size={20} />
                <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                  <img
                    src={img.preview || "/placeholder.svg"}
                    alt={`merged-${idx}`}
                    className="w-full h-full object-cover"
                    style={{ transform: `rotate(${img.rotation}deg)` }}
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">{img.file.name}</p>
                  <p className="text-sm text-muted-foreground">{img.file.size} bytes</p>
                </div>
                <button
                  onClick={() => rotateImage(img.id)}
                  className="p-2 hover:bg-muted rounded-lg transition-smooth"
                  title="Rotate 90°"
                >
                  <RotateCw size={18} className="text-primary" />
                </button>
                <button
                  onClick={() => removeImage(img.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg transition-smooth"
                >
                  <X size={18} className="text-destructive" />
                </button>
              </div>
            ))}
          </div>

          <button
            onClick={mergeImages}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Merging...
              </>
            ) : (
              <>
                <Download size={20} />
                Merge & Download
              </>
            )}
          </button>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images uploaded yet. Upload at least 2 images to get started.</p>
        </div>
      )}
    </div>
  )
}
