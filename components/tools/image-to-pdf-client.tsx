"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, GripVertical, X, Loader2 } from "lucide-react"

interface PdfImage {
  id: string
  file: File
  preview: string
}

export default function ImageToPdfClient() {
  const [images, setImages] = useState<PdfImage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [dragOverId, setDragOverId] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files) return

    Array.from(files).forEach((file) => {
      if (!file.type.startsWith("image/")) return

      const reader = new FileReader()
      reader.onload = (e) => {
        const newImage: PdfImage = {
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

  const convertToPdf = async () => {
    if (images.length === 0) {
      alert("Please upload at least 1 image")
      return
    }

    setIsProcessing(true)
    try {
      // Dynamically import jsPDF and html2canvas
      const { jsPDF } = await import("jspdf")
      const html2canvas = (await import("html2canvas")).default

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      })

      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      for (let i = 0; i < images.length; i++) {
        const img = new Image()
        img.crossOrigin = "anonymous"

        await new Promise((resolve, reject) => {
          img.onload = resolve
          img.onerror = reject
          img.src = images[i].preview
        })

        // Calculate dimensions to fit page
        let imgWidth = pageWidth - 20 // 10mm margin
        let imgHeight = (img.height / img.width) * imgWidth

        if (imgHeight > pageHeight - 20) {
          imgHeight = pageHeight - 20
          imgWidth = (img.width / img.height) * imgHeight
        }

        const x = (pageWidth - imgWidth) / 2
        const y = (pageHeight - imgHeight) / 2

        if (i > 0) {
          pdf.addPage()
        }

        pdf.addImage(img.src, "JPEG", x, y, imgWidth, imgHeight)
      }

      pdf.save(`converted-${Date.now()}.pdf`)
    } catch (error) {
      console.error("PDF conversion error:", error)
      alert("Error converting to PDF. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <div className="space-y-8">
      <div
        className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary transition-smooth cursor-pointer bg-primary/5"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload className="mx-auto mb-4 text-primary" size={32} />
        <h3 className="text-lg font-semibold text-foreground mb-2">Upload Images</h3>
        <p className="text-muted-foreground mb-4">Drag and drop images here, or click to select</p>
        <p className="text-sm text-muted-foreground">Supports JPG, PNG, WebP, and more</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />
      </div>

      {images.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">{images.length} Images Selected</h2>

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
                    alt={`page-${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-foreground truncate">
                    Page {idx + 1}: {img.file.name}
                  </p>
                  <p className="text-sm text-muted-foreground">{(img.file.size / 1024).toFixed(2)} KB</p>
                </div>
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
            onClick={convertToPdf}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Converting...
              </>
            ) : (
              <>
                <Download size={20} />
                Convert to PDF
              </>
            )}
          </button>
        </div>
      )}

      {images.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No images uploaded yet. Upload images to convert to PDF.</p>
        </div>
      )}
    </div>
  )
}
