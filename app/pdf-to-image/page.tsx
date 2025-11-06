"use client"

import { dynamic as dynamicImport } from "next/dynamic"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Suspense } from "react"

const PdfToImageClient = dynamicImport(() => import("@/components/tools/pdf-to-image-client"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  ),
})

export default function PdfToImagePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground">PDF to Image</h1>
          <p className="text-muted-foreground mt-2">Convert PDF pages to high-quality images</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
          <PdfToImageClient />
        </Suspense>
      </div>
    </div>
  )
}
