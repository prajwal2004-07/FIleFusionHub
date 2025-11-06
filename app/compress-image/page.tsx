"use client"

import Link from "next/link"
import CompressImageClient from "@/components/tools/compress-image-client"
import { ArrowLeft } from "lucide-react"

export const dynamic = "force-dynamic"

export default function CompressImagePage() {
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
          <h1 className="text-3xl font-bold text-foreground">Compress Image</h1>
          <p className="text-muted-foreground mt-2">Compress images to exact file size</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <CompressImageClient />
      </div>
    </div>
  )
}
