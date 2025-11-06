"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, Download, Loader2, X } from "lucide-react"
import * as pdfjsLib from "pdfjs-dist"

interface PdfPage {
  pageNum: number
  image: string
}

export default function PdfToImageClient() {
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pages, setPages] = useState<PdfPage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [quality, setQuality] = useState(100)
  const [isLoadingPdf, setIsLoadingPdf] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileSelect = async (files: FileList | null) => {
    if (!files || !files[0]) return

    const file = files[0]
    if (file.type !== "application/pdf") {
      alert("Please select a valid PDF file")
      return
    }

    setPdfFile(file)
    await loadPdfPages(file)
  }

  const loadPdfPages = async (file: File) => {
    setIsLoadingPdf(true)
    try {
      const pdf = pdfjsLib
      pdf.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdf.version}/pdf.worker.min.js`

      const arrayBuffer = await file.arrayBuffer()
      const pdfDoc = await pdf.getDocument({ data: arrayBuffer }).promise

      const pageCount = pdfDoc.numPages
      const loadedPages: PdfPage[] = []

      for (let i = 1; i <= pageCount; i++) {
        const page = await pdfDoc.getPage(i)
        const scale = (quality / 100) * 3
        const viewport = page.getViewport({ scale })

        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")!
        canvas.width = viewport.width
        canvas.height = viewport.height

        await page.render({
          canvasContext: context,
          viewport: viewport,
        }).promise

        loadedPages.push({
          pageNum: i,
          image: canvas.toDataURL("image/jpeg", quality / 100),
        })
      }

      setPages(loadedPages)
    } catch (error) {
      console.error("PDF loading error:", error)
      alert("Error loading PDF. Please try again.")
    } finally {
      setIsLoadingPdf(false)
    }
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

  const downloadImage = (image: string, pageNum: number) => {
    const a = document.createElement("a")
    a.href = image
    a.download = `page-${pageNum}-${Date.now()}.jpg`
    a.click()
  }

  const downloadAllImages = async () => {
    setIsProcessing(true)
    try {
      const JSZip = (await import("jszip")).default
      const zip = new JSZip()

      pages.forEach((page) => {
        const base64Data = page.image.split(",")[1]
        zip.file(`page-${page.pageNum}.jpg`, base64Data, { base64: true })
      })

      const blob = await zip.generateAsync({ type: "blob" })
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `pdf-images-${Date.now()}.zip`
      a.click()
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error("Error creating zip:", error)
      alert("Error creating zip file. Please try again.")
    } finally {
      setIsProcessing(false)
    }
  }

  const clearPdf = () => {
    setPdfFile(null)
    setPages([])
  }

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
          <p className="text-muted-foreground mb-4">Drag and drop your PDF file here, or click to select</p>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileSelect(e.target.files)}
            className="hidden"
          />
        </div>
      )}

      {isLoadingPdf && (
        <div className="text-center py-12">
          <Loader2 className="animate-spin mx-auto mb-4 text-primary" size={32} />
          <p className="text-muted-foreground">Loading PDF pages...</p>
        </div>
      )}

      {pdfFile && pages.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-foreground">{pages.length} Pages Found</h2>
              <p className="text-sm text-muted-foreground">{pdfFile.name}</p>
            </div>
            <button
              onClick={clearPdf}
              className="p-2 hover:bg-destructive/10 rounded-lg transition-smooth"
              title="Clear PDF"
            >
              <X size={20} className="text-destructive" />
            </button>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <label className="block text-sm font-medium text-foreground mb-2">Output Quality: {quality}%</label>
            <input
              type="range"
              min="30"
              max="100"
              step="10"
              value={quality}
              onChange={(e) => setQuality(Number(e.target.value))}
              className="w-full"
            />
          </div>

          {pages.length > 1 && (
            <button
              onClick={downloadAllImages}
              disabled={isProcessing}
              className="w-full px-6 py-3 bg-accent text-accent-foreground rounded-lg font-semibold hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed transition-smooth flex items-center justify-center gap-2"
            >
              {isProcessing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Preparing...
                </>
              ) : (
                <>
                  <Download size={20} />
                  Download All ({pages.length} images)
                </>
              )}
            </button>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pages.map((page) => (
              <div
                key={page.pageNum}
                className="group rounded-lg border border-border overflow-hidden hover:border-primary transition-smooth"
              >
                <div className="relative bg-muted aspect-[3/4] overflow-hidden">
                  <img
                    src={page.image || "/placeholder.svg"}
                    alt={`Page ${page.pageNum}`}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-smooth flex items-center justify-center">
                    <button
                      onClick={() => downloadImage(page.image, page.pageNum)}
                      className="p-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-smooth"
                      title={`Download page ${page.pageNum}`}
                    >
                      <Download size={20} />
                    </button>
                  </div>
                </div>
                <div className="p-3 bg-card">
                  <p className="text-sm font-medium text-foreground">Page {page.pageNum}</p>
                  <p className="text-xs text-muted-foreground">Click to download</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {pdfFile && pages.length === 0 && !isLoadingPdf && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No pages found in PDF. Please try another file.</p>
        </div>
      )}
    </div>
  )
}
