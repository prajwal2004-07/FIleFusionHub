import Link from "next/link"
import { ArrowLeft, Heart, Zap, Shield } from "lucide-react"

export default function AboutPage() {
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
          <h1 className="text-3xl font-bold text-foreground">About FileFusionHub</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Mission */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              FileFusionHub is dedicated to making file conversion and management simple, fast, and secure for everyone.
              We believe that powerful tools shouldn't require complex software installations or subscriptions. Our goal
              is to provide a free, easy-to-use platform where you can merge, convert, and compress images and PDFs
              without compromise.
            </p>
          </div>

          {/* Values */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-card border border-border rounded-lg p-6">
                <Shield className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  Your files are yours alone. We don't store, analyze, or share your data. All processing is done
                  securely.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <Zap className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">
                  Browser-based processing means instant results. No waiting for cloud servers or long upload times.
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-6">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <h3 className="font-semibold text-foreground mb-2">Always Free</h3>
                <p className="text-sm text-muted-foreground">
                  No sign-ups, no paywalls, no hidden costs. FileFusionHub is free for everyone, always.
                </p>
              </div>
            </div>
          </div>

          {/* Features */}
          <div className="bg-card border border-border rounded-lg p-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">Why Choose FileFusionHub?</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>No installation required - works in any browser</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Batch processing for multiple files at once</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Advanced features like drag-and-drop reordering and compression targeting</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Dark mode support for comfortable use anytime</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>Mobile-friendly interface works on any device</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary mt-1">✓</span>
                <span>SEO-optimized for easy discovery</span>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-8 text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">Get in Touch</h2>
            <p className="text-muted-foreground mb-4">Have questions or suggestions? We'd love to hear from you!</p>
            <p className="text-sm text-muted-foreground">Email: support@filefsionhub.com</p>
          </div>
        </div>
      </div>
    </div>
  )
}
