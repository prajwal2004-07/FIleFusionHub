"use client"

import Link from "next/link"
import { ArrowLeft, Sparkles, Zap } from "lucide-react"

export default function AiToolsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground">AI Tools</h1>
          <p className="text-muted-foreground mt-2">Enhance your images with AI-powered features</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* AI Image Upscaler */}
          <div className="p-8 rounded-xl border border-border bg-card hover:border-primary transition-smooth">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center mb-4">
              <Zap className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">AI Image Upscaler</h2>
            <p className="text-muted-foreground mb-6">
              Enhance photo quality and resolution using advanced AI. Perfect for low-resolution images, old photos, and
              screenshots.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>2x, 4x, and 8x upscaling options</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Advanced noise reduction</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Detail preservation and enhancement</span>
              </li>
            </ul>
            <button
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth disabled:opacity-50 cursor-not-allowed"
              disabled
            >
              Coming Soon
            </button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Integration with AI upscaling API (RemoveAPI, Upscayl, or similar)
            </p>
          </div>

          {/* AI Background Remover */}
          <div className="p-8 rounded-xl border border-border bg-card hover:border-primary transition-smooth">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center mb-4">
              <Sparkles className="text-white" size={24} />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-3">AI Background Remover</h2>
            <p className="text-muted-foreground mb-6">
              Instantly remove backgrounds from images with AI precision. Get transparent PNG files ready for design.
            </p>
            <ul className="space-y-2 text-sm text-muted-foreground mb-6">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>One-click background removal</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Automatic edge detection</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">✓</span>
                <span>Output as transparent PNG</span>
              </li>
            </ul>
            <button
              className="w-full px-4 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-smooth disabled:opacity-50 cursor-not-allowed"
              disabled
            >
              Coming Soon
            </button>
            <p className="text-xs text-muted-foreground mt-2 text-center">
              Integration with background removal API (Remove.bg, Segment Anything, etc.)
            </p>
          </div>
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 p-6 bg-primary/10 border border-primary/20 rounded-xl text-center">
          <h3 className="text-lg font-semibold text-foreground mb-2">AI Features Coming Soon</h3>
          <p className="text-muted-foreground">
            We're working on integrating powerful AI features to enhance your workflow. Stay tuned for these exciting
            additions!
          </p>
        </div>

        {/* Info Section */}
        <div className="mt-12 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">Why AI Tools?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Professional Results</h4>
              <p className="text-sm text-muted-foreground">
                Get studio-quality results without manual editing skills or expensive software.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Save Time</h4>
              <p className="text-sm text-muted-foreground">
                Process images in seconds instead of hours with one-click AI operations.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-card border border-border">
              <h4 className="font-semibold text-foreground mb-2">Batch Processing</h4>
              <p className="text-sm text-muted-foreground">
                Apply AI enhancements to multiple images at once for maximum efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
