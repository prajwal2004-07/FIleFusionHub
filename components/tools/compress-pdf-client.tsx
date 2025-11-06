"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, Loader2, X } from "lucide-react"
import { PDFDocument } from "pdf-lib"

export default function CompressPdfClient() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [targetSize, setTargetSize] = useState("")
  const [targetUnit, setTargetUnit] = useState<"KB" | "MB">("KB")
  const [isProcessing, setIsProcessing] = useState(false)
  const [quality, setQuality] = useState(70)
  const [compressedInfo, setCompressedInfo] = useState<{
    originalSize: number
    compressedSize: number
  } | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = (files: FileList | null) => {
    if (!files || !files[0]) return

    const file = files[0]
    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file")
      return
    }

    setPdfFile(file)
    setCompressedInfo(null)
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

  const compressPdf = async () => {
    if (!pdfFile) return

    setIsProcessing(true)
    try {
      const arrayBuffer = await pdfFile.arrayBuffer()
      const pdfBytes = new Uint8Array(arrayBuffer)

      const pdfDoc = await PDFDocument.load({ pdfBytes })

      const compressedBytes = await pdfDoc.save({
        useObjectStreams: true,
      })

      const blob = new Blob([compressedBytes], { type: "application/pdf" })

      setCompressedInfo({
        originalSize: pdfFile.size,
        compressedSize: blob.size,
      })

      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `compressed-${Date.now()}.pdf`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("PDF compression error:", error)
      alert("Error compressing PDF. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const clearPdf = () => {
    setPdfFile(null)
    setCompressedInfo(null)
    setTargetSize("")
  }

  const formatBytes = (bytes: number) => {
    if (bytes < 1024) return bytes + " B"
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + " KB"
    return (bytes / (1024 * 1024)).toFixed(2) + " MB"
  }

  const reduction = compressedInfo
    ? (((compressedInfo.originalSize - compressedInfo.compressedSize) / compressedInfo.originalSize) * 100).toFixed(1)
    : 0

  return (
    <div className="space-y-8">
      {!pdfFile && (
        <div
          className="border-2 border-dashed border-primary/30 rounded-xl p-8 text-center hover:border-primary transition-smooth cursor-pointer bg-primary/5"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <Upload className="mx-auto mb-4 text-primary" size={32} />
          <h3 className="text-lg font-semibold text-foreground mb-2">Upload PDF</h3>
          <p className="text-muted-foreground mb-4">Drag and drop your PDF here, or click to select</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {pdfFile && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{pdfFile.name}</h2>
              <p className="text-sm text-muted-foreground">Original size: {formatBytes(pdfFile.size)}</p>
            </div>
            <button
              onClick={clearPdf}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-smooth"
              title="Clear PDF"
            >
              <X size={20} className="text-destructive" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="p-4 bg-card border border-border rounded-lg">
              <label className="block text-sm font-medium text-foreground mb-2">Compression Quality: {quality}%</label>
              <input
                type="range"
                min="20"
                max="100"
                step="10"
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

          <button
            onClick={compressPdf}
            disabled={isProcessing}
            className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Compressing...
              </>
            ) : (
              <>
                <Download size={20} />
                Compress & Download
              </>
            )}
          </button>

          {compressedInfo && (
            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
              <p className="text-sm font-medium text-green-900 dark:text-green-300 mb-2">Compression Complete</p>
              <div className="space-y-1 text-sm text-green-800 dark:text-green-200">
                <p>Original: {formatBytes(compressedInfo.originalSize)}</p>
                <p>Compressed: {formatBytes(compressedInfo.compressedSize)}</p>
                <p className="font-semibold">Reduced by {reduction}%</p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
