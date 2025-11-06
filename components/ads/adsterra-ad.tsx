"use client"

import { useEffect } from "react"

interface AdsterraAdProps {
  slotId: string
  type?: "banner" | "square" | "sidebar"
  className?: string
}

export default function AdsterraAd({ slotId, type = "banner", className = "" }: AdsterraAdProps) {
  useEffect(() => {
    // Initialize Adsterra ads
    if ((window as any).atob === undefined) return

    const script = document.createElement("script")
    script.type = "text/javascript"
    script.src = "//a.admaxads.com/script.js"
    script.async = true
    script.onload = () => {
      if ((window as any).atob && (window as any).atob instanceof Function) {
        ;(window as any).AdaxAdsList = (window as any).AdaxAdsList || []
        ;(window as any).AdaxAdsList.push({
          PlaceID: slotId,
          Refresh: 60,
        })
      }
    }
    document.head.appendChild(script)

    return () => {
      try {
        document.head.removeChild(script)
      } catch (e) {
        // Already removed
      }
    }
  }, [slotId])

  return (
    <div
      className={`flex items-center justify-center bg-muted rounded-lg ${className}`}
      style={{
        minHeight: type === "banner" ? "90px" : type === "square" ? "250px" : "600px",
        minWidth: type === "banner" ? "728px" : type === "square" ? "300px" : "160px",
      }}
    >
      <div id={`ads_${slotId}`} className="w-full h-full flex items-center justify-center">
        <div className="text-muted-foreground text-sm">Advertisement Space</div>
      </div>
    </div>
  )
}
