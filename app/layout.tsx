import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FileFusionHub - Image & PDF Tools Online",
  description:
    "Free online tool to merge images, convert image to PDF, convert PDF to image, compress PDFs & images to exact size. Fast, secure, no login needed.",
  keywords: "image to pdf, pdf to image, merge images, compress pdf, compress image, online converter",
  openGraph: {
    title: "FileFusionHub - Image & PDF Tools",
    description: "Convert, merge, and compress images and PDFs online for free",
    type: "website",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
