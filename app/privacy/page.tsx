import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/30">
      <div className="border-b border-border bg-card/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-smooth mb-4"
          >
            <ArrowLeft size={20} />
            Back to Home
          </Link>
          <h1 className="text-3xl font-bold text-foreground">Privacy Policy</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Your Privacy Matters</h2>
            <p className="text-muted-foreground mb-4">
              At FileFusionHub, we are committed to protecting your privacy. This Privacy Policy explains how we handle
              your data.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">File Security</h3>
            <p className="text-muted-foreground mb-4">
              We do not store or view your files. All file processing happens securely on your device (client-side) or
              through temporary server processing. Uploaded files are automatically deleted immediately after
              conversion. We do not keep logs of conversions or access to your files.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Data Collection</h3>
            <p className="text-muted-foreground mb-4">
              We do not collect personal information unless you voluntarily provide it (such as through contact forms).
              We use anonymous analytics to understand how our service is used, but we do not track individual users.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Cookies</h3>
            <p className="text-muted-foreground mb-4">
              We use minimal cookies for essential functionality only (such as dark mode preferences). We do not use
              cookies for tracking or advertising purposes.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Third-Party Services</h3>
            <p className="text-muted-foreground mb-4">
              Our website may contain ads from Adsterra. Adsterra may use cookies and pixel tags to track user behavior
              for targeted advertising. You can opt out of Adsterra ads through their privacy controls.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Changes to This Policy</h3>
            <p className="text-muted-foreground mb-4">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new
              policy on this page. Your continued use of the service constitutes your acceptance of the updated policy.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Contact Us</h3>
            <p className="text-muted-foreground">
              If you have any questions about this Privacy Policy, please contact us through our contact form.
            </p>
          </div>

          <p className="text-sm text-muted-foreground text-center">
            Last updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
        </div>
      </div>
    </div>
  )
}
