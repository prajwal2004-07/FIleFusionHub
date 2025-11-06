import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export default function TermsPage() {
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
          <h1 className="text-3xl font-bold text-foreground">Terms & Conditions</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="prose prose-invert max-w-none space-y-6">
          <div className="bg-card border border-border rounded-lg p-6">
            <h2 className="text-2xl font-bold text-foreground mb-4">Terms & Conditions</h2>
            <p className="text-muted-foreground mb-4">
              Welcome to FileFusionHub. By using our service, you agree to the following terms and conditions.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Service Availability</h3>
            <p className="text-muted-foreground mb-4">
              FileFusionHub is provided on an "as-is" basis. We strive to keep the service available 24/7, but we do not
              guarantee uninterrupted access. We may suspend or modify the service at any time without notice.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">User Responsibilities</h3>
            <p className="text-muted-foreground mb-4">
              You agree to use FileFusionHub only for lawful purposes. You must not upload files that violate copyright,
              contain malware, or are intended for illegal use. You are solely responsible for ensuring you have the
              right to upload and convert any files.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Limitation of Liability</h3>
            <p className="text-muted-foreground mb-4">FileFusionHub is not responsible for:</p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-4">
              <li>Data loss or corruption resulting from the conversion process</li>
              <li>Service interruptions or downtime</li>
              <li>Loss of income or profits from using the service</li>
              <li>Misuse of the service by third parties</li>
            </ul>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Intellectual Property</h3>
            <p className="text-muted-foreground mb-4">
              You retain all rights to files you upload. FileFusionHub does not claim ownership of your files or
              converted content. We only have the right to use your files for the stated conversion purpose.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Advertising</h3>
            <p className="text-muted-foreground mb-4">
              By using FileFusionHub, you consent to viewing advertisements. We use non-intrusive ads to support our
              service. Some ads may be personalized based on your browsing data.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Changes to Terms</h3>
            <p className="text-muted-foreground mb-4">
              We may update these Terms & Conditions at any time. Your continued use of the service indicates your
              acceptance of the updated terms.
            </p>

            <h3 className="text-xl font-semibold text-foreground mt-6 mb-3">Dispute Resolution</h3>
            <p className="text-muted-foreground mb-4">
              Any disputes arising from the use of FileFusionHub shall be resolved under applicable law. You agree not
              to hold FileFusionHub liable for any damages resulting from the service.
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
