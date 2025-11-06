"use client"

import Link from "next/link"
import ImageToPdfClient from "@/components/tools/image-to-pdf-client"
import { ArrowLeft } from "lucide-react"

export default function ImageToPdfPage() {
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
          <h1 className="text-3xl font-bold text-foreground">Image to PDF</h1>
          <p className="text-muted-foreground mt-2">Convert images to PDF with custom page ordering</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <ImageToPdfClient />
      </div>
    </div>
  )
}
