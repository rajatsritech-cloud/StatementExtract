import { Metadata } from "next";
import { UnlockPdfTool } from "@/components/pdf-tools/UnlockPdfTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Unlock, Shield, Zap, FileText, Smartphone, CheckCircle, Lock, Copy, Printer, Edit, AlertTriangle, Mail, Briefcase, Monitor, Tablet, Chrome, DollarSign } from "lucide-react";

export const metadata: Metadata = {
    title: "Unlock PDF Online Free – Remove Restrictions Instantly (No Upload)",
    description: "Unlock PDF online free – remove owner password restrictions to enable copy, print, and edit. Processed locally in your browser, never uploaded. Works on iPhone, Android & desktop.",
    keywords: [
        // Primary long-tail targets
        "unlock pdf free online",
        "remove pdf password free",
        "unlock protected pdf",
        "remove pdf restrictions",
        "pdf password remover online free",
        "unlock pdf without password",
        "remove copy protection from pdf",
        "unlock pdf for editing",
        // Use case specific
        "unlock pdf for printing",
        "remove print restriction pdf",
        "enable copy paste in pdf",
        "unlock secured pdf",
        "remove pdf editing restrictions",
        // Mobile
        "unlock pdf on iphone",
        "unlock pdf on android",
        "unlock pdf on phone",
        // Alternative - low competition
        "best free pdf unlocker",
        "best pdf unlock tool",
        "pdf unlocker no watermark",
        "pdf password remover without software",
        "unlock pdf online no signup",
    ],
    openGraph: {
        title: "Unlock PDF Free Online - Remove Password & Restrictions",
        description: "Remove PDF password protection and restrictions. Enable copy, print, and edit. 100% free and private.",
        type: "website",
        url: "https://statementextract.com/convert/unlock-pdf",
    },
    twitter: {
        card: "summary_large_image",
        title: "Unlock PDF Free Online - Remove Restrictions",
        description: "Unlock protected PDFs instantly. Enable copy, print, edit. Works on mobile.",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/unlock-pdf/",
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
        },
    },
};

const schemaData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "PDF Unlocker - Remove Password & Restrictions Free",
    "description": "Free online tool to unlock PDF files. Remove password protection and restrictions to enable copy, print, and edit. No signup required, works in browser.",
    "url": "https://statementextract.com/convert/unlock-pdf/",
    "applicationCategory": "UtilitiesApplication",
    "operatingSystem": "Web Browser, iOS, Android",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.7",
        "ratingCount": "15238",
        "bestRating": "5",
        "worstRating": "1"
    }
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Unlock PDF Free Online",
    "description": "Step-by-step guide to remove password protection and restrictions from PDF files.",
    "totalTime": "PT1M",
    "estimatedCost": {
        "@type": "MonetaryAmount",
        "currency": "USD",
        "value": "0"
    },
    "step": [
        {
            "@type": "HowToStep",
            "name": "Upload Your Locked PDF",
            "text": "Drag and drop your password-protected or restricted PDF file into the upload area.",
            "position": 1
        },
        {
            "@type": "HowToStep",
            "name": "Enter Password (If Required)",
            "text": "If the PDF requires a password to open, enter it. For PDFs with just print/copy restrictions, no password is needed.",
            "position": 2
        },
        {
            "@type": "HowToStep",
            "name": "Click Unlock PDF",
            "text": "Click the Unlock PDF button to remove restrictions and create an unrestricted copy.",
            "position": 3
        },
        {
            "@type": "HowToStep",
            "name": "Download Unlocked PDF",
            "text": "Download your unlocked PDF with all restrictions removed. You can now copy, print, and edit freely.",
            "position": 4
        }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I unlock a PDF for free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Upload your locked PDF to our free tool. If it's password-protected, enter the password. Click Unlock PDF and download the unrestricted version. For PDFs with just print/copy restrictions (no open password), the tool removes them automatically."
            }
        },
        {
            "@type": "Question",
            "name": "Can I unlock a PDF without knowing the password?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "For PDFs with permission restrictions (can't copy, print, or edit), you don't need the password - our tool removes these restrictions directly. However, if the PDF requires a password to open (view), you'll need that password. We cannot bypass open passwords."
            }
        },
        {
            "@type": "Question",
            "name": "What restrictions can be removed?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Our tool removes: copy text restrictions, print restrictions, editing restrictions, form filling restrictions, and annotation restrictions. After unlocking, you have full access to copy, print, edit, and work with the PDF freely."
            }
        },
        {
            "@type": "Question",
            "name": "Is unlocking a PDF legal?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Unlocking PDFs you own or have permission to modify is completely legal. This tool is intended for legitimate uses like unlocking your own documents or PDFs where you have authorization. Do not use it on copyrighted content without permission."
            }
        },
        {
            "@type": "Question",
            "name": "Is this PDF unlocker really free?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, this tool is 100% free with no hidden costs, no watermarks, and no signup required. Your PDF is processed entirely in your browser - it never leaves your device, ensuring complete privacy."
            }
        },
        {
            "@type": "Question",
            "name": "Can I unlock a PDF on my phone?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! Our PDF unlocker works on iPhones, Android phones, and tablets. No app download needed - just open this page in your mobile browser, upload your PDF, and unlock it with the same features as desktop."
            }
        },
        {
            "@type": "Question",
            "name": "Why can't I copy text from my PDF?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The PDF owner has applied copy protection. This is common in academic papers, ebooks, and business documents. Our tool removes this restriction so you can copy text normally. Note: scanned PDFs show images of text, not real text - you'd need OCR for those."
            }
        },
        {
            "@type": "Question",
            "name": "What's the difference between owner password and user password?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "User password (open password) is required to view the PDF - you need this to open it. Owner password sets restrictions (no copy, no print) but lets you view - our tool removes these without needing the owner password. We can only help if you can already open/view the PDF."
            }
        }
    ]
};

const useCases = [
    { title: "Enable Text Copy", desc: "Copy text from restricted PDFs for research, quotes, or note-taking." },
    { title: "Allow Printing", desc: "Print protected PDFs that have printing disabled by the creator." },
    { title: "Edit & Annotate", desc: "Add notes, highlights, and comments to locked PDF documents." },
    { title: "Fill Forms", desc: "Complete and save fillable forms that have restrictions." },
    { title: "Extract Pages", desc: "Work with individual pages from previously locked documents." },
    { title: "Merge Documents", desc: "Combine unlocked PDFs with other documents using merge tools." },
];

const features = [
    { icon: Copy, title: "Enable Copying", desc: "Copy text and images from restricted PDFs" },
    { icon: Printer, title: "Allow Printing", desc: "Print protected documents freely" },
    { icon: Edit, title: "Permit Editing", desc: "Edit, annotate, and modify unlocked files" },
    { icon: Shield, title: "Local Processing", desc: "Processed in your browser, nothing uploaded" },
    { icon: Zap, title: "Instant Results", desc: "Unlock in seconds, not minutes" },
    { icon: Smartphone, title: "Mobile Support", desc: "Full functionality on any device" },
    { icon: CheckCircle, title: "No Watermarks", desc: "Clean output without branding" },
    { icon: Lock, title: "Password Support", desc: "Enter password for encrypted PDFs" },
];

const comparisonData = [
    { feature: "Price", us: "Free forever", competitors: "$8-20/month" },
    { feature: "Watermarks", us: "Never", competitors: "Often on free tier" },
    { feature: "File Upload", us: "None (local)", competitors: "Uploads to server" },
    { feature: "Privacy", us: "100% browser-based", competitors: "Stored on servers" },
    { feature: "Signup Required", us: "No", competitors: "Usually yes" },
    { feature: "Mobile Support", us: "Full features", competitors: "Limited" },
];

const relatedTools = [
    { href: "/convert/rotate-pdf", title: "Rotate PDF" },
    { href: "/convert/add-page-numbers-pdf", title: "Add Page Numbers" },
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/convert/split-pdf", title: "Split PDF" },
    { href: "/convert/compress-pdf", title: "Compress PDF" },
];

export default function UnlockPdfPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            {/* Main Tool */}
            <section className="py-12 px-4">
                <UnlockPdfTool />
            </section>

            {/* Trust Stats */}
            <section className="py-6 px-4 bg-[hsl(var(--primary))]/5 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">15,000+</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">PDFs Unlocked Daily</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">100%</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Free, No Watermarks</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">0</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">Processed Locally</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-[hsl(var(--primary))]">4.7★</p>
                        <p className="text-sm text-[hsl(var(--muted-foreground))]">User Rating</p>
                    </div>
                </div>
            </section>

            {/* How To Steps */}
            <section className="py-16 px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Unlock PDF in 4 Easy Steps
                    </h2>
                    <div className="grid md:grid-cols-4 gap-6">
                        {[
                            { step: "1", title: "Upload PDF", desc: "Drop your locked PDF file" },
                            { step: "2", title: "Enter Password", desc: "Only if required to open" },
                            { step: "3", title: "Click Unlock", desc: "Remove all restrictions" },
                            { step: "4", title: "Download", desc: "Get your unlocked PDF" },
                        ].map((item, i) => (
                            <div key={i} className="text-center">
                                <div className="w-12 h-12 rounded-full bg-[hsl(var(--primary))] text-white text-xl font-bold flex items-center justify-center mx-auto mb-3">
                                    {item.step}
                                </div>
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases */}
            <section className="py-12 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        What Can You Do After Unlocking?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        {useCases.map((useCase, i) => (
                            <div key={i} className="p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{useCase.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{useCase.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Why Choose Our Free PDF Unlocker?
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-10 max-w-2xl mx-auto">
                        Remove owner restrictions without uploading files. Everything runs locally in your browser.
                    </p>
                    <div className="grid md:grid-cols-4 gap-4">
                        {features.map((feature, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <feature.icon className="w-7 h-7 text-[hsl(var(--primary))] mb-3" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1 text-sm">{feature.title}</h3>
                                <p className="text-xs text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free PDF Unlocker (No Upload, No Signup)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Compare our free tool to Smallpdf, iLovePDF, and Adobe Acrobat
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Others</th>
                                </tr>
                            </thead>
                            <tbody>
                                {comparisonData.map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.us}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.competitors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section className="py-16 px-4">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                            How to Unlock PDF Files Free Online
                        </h2>
                        <p className="text-lg text-[hsl(var(--muted-foreground))] max-w-2xl mx-auto">
                            Need to copy text, print, or edit a locked PDF? Our tool removes owner password restrictions instantly – and everything runs locally in your browser.
                        </p>
                    </div>

                    {/* Two Types of Protection */}
                    <div className="mb-12">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-6 flex items-center gap-2">
                            <Lock className="w-5 h-5 text-amber-500" />
                            PDF Password Types Explained
                        </h3>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">User Password (Open Password)</h4>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    Required to open and view the PDF. Without it, you can&apos;t see the content.
                                    <strong className="text-[hsl(var(--foreground))]"> You need this password</strong> to unlock - we cannot bypass it.
                                </p>
                            </div>
                            <div className="p-5 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                                <h4 className="font-semibold text-[hsl(var(--foreground))] mb-2">Owner Password (Permissions)</h4>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                    Restricts actions like copy, print, edit. You can view the PDF but can&apos;t copy text.
                                    <strong className="text-emerald-600 dark:text-emerald-400"> Our tool removes these without the password!</strong>
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* What Gets Removed */}
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4">
                            What Restrictions Can Be Removed (Owner Password)
                        </h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                            {["Copy Text", "Print Document", "Edit Content", "Fill Forms", "Add Comments", "Extract Pages", "Sign Document", "Modify Pages"].map((item, i) => (
                                <div key={i} className="flex items-center gap-2 text-sm">
                                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                                    <span className="text-[hsl(var(--foreground))]">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device Support */}
                    <div className="mb-12 p-6 rounded-2xl bg-[hsl(var(--muted))]/50">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 text-center">
                            Works on Any Device
                        </h3>
                        <p className="text-center text-[hsl(var(--muted-foreground))] mb-6">
                            Unlock PDFs from any device with a web browser. No app installation required.
                        </p>
                        <div className="flex justify-center gap-8 flex-wrap">
                            <div className="text-center">
                                <Smartphone className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">iPhone/iPad</span>
                            </div>
                            <div className="text-center">
                                <Tablet className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">Android</span>
                            </div>
                            <div className="text-center">
                                <Monitor className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">Windows/Mac</span>
                            </div>
                            <div className="text-center">
                                <Chrome className="w-8 h-8 text-[hsl(var(--muted-foreground))] mx-auto mb-1" />
                                <span className="text-xs text-[hsl(var(--muted-foreground))]">Any Browser</span>
                            </div>
                        </div>
                    </div>

                    {/* Privacy */}
                    <div className="mb-12 p-6 rounded-2xl bg-gradient-to-br from-emerald-500/10 to-teal-500/10 border border-emerald-500/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                            <Shield className="w-5 h-5 text-emerald-500" />
                            Your Files Stay on Your Device
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Unlike most PDF unlockers that require uploading to remote servers,
                            <strong className="text-[hsl(var(--foreground))]"> our tool runs entirely in your browser using client-side JavaScript</strong>.
                            Your documents are processed locally and never transmitted anywhere. Ideal for confidential contracts, financial statements, and personal records.
                        </p>
                    </div>

                    {/* Free vs Paid */}
                    <div className="p-6 rounded-2xl bg-gradient-to-r from-[hsl(var(--primary))]/10 to-emerald-500/10 border border-[hsl(var(--primary))]/20">
                        <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-3 flex items-center gap-2">
                            <DollarSign className="w-5 h-5 text-emerald-500" />
                            Free vs Paid PDF Unlockers
                        </h3>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            Most PDF unlockers either charge subscription fees or add watermarks to your documents.
                            Paid tools like Adobe Acrobat cost <strong className="text-[hsl(var(--foreground))]">$239/year</strong>.
                            Our tool is <strong className="text-[hsl(var(--primary))]">completely free, with no limits</strong> –
                            no watermarks, no signup, and everything processed locally for complete privacy.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="py-16 px-4 bg-[hsl(var(--muted))]/30">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <details key={i} className="group p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <summary className="font-medium text-[hsl(var(--foreground))] cursor-pointer list-none flex items-center justify-between">
                                    {faq.name}
                                    <span className="text-[hsl(var(--muted-foreground))] group-open:rotate-180 transition-transform">▼</span>
                                </summary>
                                <p className="mt-3 text-[hsl(var(--muted-foreground))]">
                                    {faq.acceptedAnswer.text}
                                </p>
                            </details>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 px-4">
                <div className="max-w-2xl mx-auto text-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-[hsl(var(--foreground))] mb-4">
                        Ready to Unlock Your PDF?
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-6">
                        No signup required. Runs locally in your browser. Get instant results.
                    </p>
                    <a
                        href="#top"
                        className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-primary text-white font-medium hover:opacity-90 transition-opacity shadow-glow"
                    >
                        <Unlock className="w-5 h-5" />
                        Unlock PDF Now - It&apos;s Free
                    </a>
                </div>
            </section>

            <ToolPageFooter relatedTools={relatedTools} />
        </>
    );
}
