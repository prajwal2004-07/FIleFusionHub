"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Moon, Sun, Download, ImagePlus, FileText, ImageIcon, Zap, Sparkles } from "lucide-react"

export default function HomePage() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setIsDark(isDarkMode)
  }, [])

  const toggleDarkMode = () => {
    const html = document.documentElement
    html.classList.toggle("dark")
    setIsDark(!isDark)
    localStorage.setItem("darkMode", String(!isDark))
  }

  const tools = [
    {
      id: "merge",
      title: "Merge Images",
      description: "Combine multiple images with drag-and-drop ordering. Vertical or horizontal layout.",
      icon: ImagePlus,
      href: "/merge-images",
      color: "from-blue-500 to-blue-600",
    },
    {
      id: "img2pdf",
      title: "Image to PDF",
      description: "Convert images (JPG, PNG, WEBP) to PDF instantly with custom page ordering.",
      icon: FileText,
      href: "/image-to-pdf",
      color: "from-purple-500 to-purple-600",
    },
    {
      id: "pdf2img",
      title: "PDF to Image",
      description: "Convert PDF pages to high-quality images. Download all or single pages.",
      icon: ImageIcon,
      href: "/pdf-to-image",
      color: "from-orange-500 to-orange-600",
    },
    {
      id: "compress-pdf",
      title: "Compress PDF",
      description: "Reduce PDF file size or compress to an exact KB/MB target.",
      icon: Zap,
      href: "/compress-pdf",
      color: "from-green-500 to-green-600",
    },
    {
      id: "compress-image",
      title: "Compress Image",
      description: "Shrink image to exact file size while maintaining quality.",
      icon: Download,
      href: "/compress-image",
      color: "from-indigo-500 to-indigo-600",
    },
    {
      id: "ai-tools",
      title: "AI Tools",
      description: "AI image upscaler & background remover for professional results.",
      icon: Sparkles,
      href: "/ai-tools",
      color: "from-pink-500 to-pink-600",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">F</span>
            </div>
            <h1 className="text-xl font-bold text-foreground">FileFusionHub</h1>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-muted transition-smooth"
              aria-label="Toggle dark mode"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-4 text-balance">
            Convert, Merge & Compress
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 text-balance max-w-2xl mx-auto">
            Quick, Secure & Free Image & PDF Tools. No login required. Files stay private.
          </p>
          <div className="inline-block px-4 py-2 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 text-sm font-medium">
            ✓ File secure — we don't store your data
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.map((tool) => {
            const IconComponent = tool.icon
            return (
              <Link key={tool.id} href={tool.href}>
                <div className="h-full p-6 rounded-xl bg-card border border-border hover:border-primary hover:shadow-lg transition-smooth cursor-pointer group">
                  <div
                    className={`w-12 h-12 rounded-lg bg-gradient-to-br ${tool.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
                  >
                    <IconComponent className="text-white" size={24} />
                  </div>
                  <h3 className="text-lg font-semibold text-card-foreground mb-2">{tool.title}</h3>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </div>
              </Link>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl p-8 text-center border border-primary/20">
          <h3 className="text-2xl font-bold text-foreground mb-3">Start Converting Today</h3>
          <p className="text-muted-foreground mb-6 max-w-lg mx-auto">
            Choose any tool above to get started. All processing happens in your browser for maximum security and speed.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Tools</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/merge-images" className="hover:text-primary transition-smooth">
                    Merge Images
                  </Link>
                </li>
                <li>
                  <Link href="/image-to-pdf" className="hover:text-primary transition-smooth">
                    Image to PDF
                  </Link>
                </li>
                <li>
                  <Link href="/pdf-to-image" className="hover:text-primary transition-smooth">
                    PDF to Image
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">More</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/compress-pdf" className="hover:text-primary transition-smooth">
                    Compress PDF
                  </Link>
                </li>
                <li>
                  <Link href="/compress-image" className="hover:text-primary transition-smooth">
                    Compress Image
                  </Link>
                </li>
                <li>
                  <Link href="/ai-tools" className="hover:text-primary transition-smooth">
                    AI Tools
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/about" className="hover:text-primary transition-smooth">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/privacy" className="hover:text-primary transition-smooth">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:text-primary transition-smooth">
                    Terms & Conditions
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Support</h4>
              <p className="text-sm text-muted-foreground">This site is supported by non-intrusive ads ❤️</p>
            </div>
          </div>
          <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2025 FileFusionHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
