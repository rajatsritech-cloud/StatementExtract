import { Metadata } from "next";
import Link from "next/link";
import { VcfToCsvTool } from "@/components/tools/VcfToCsvTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import {
    CheckCircle,
    Zap,
    Shield,
    FileText,
    Users,
    Smartphone,
    Mail,
    Database,
    Lock
} from "lucide-react";

export const metadata: Metadata = {
    title: "Free VCF to CSV Converter | Export iPhone Contacts to Excel",
    description: "Convert VCF (vCard) files to CSV/Excel online. Extract contacts from iPhone, Android, or Outlook to a clean spreadsheet. Private & Secure & client-side.",
    keywords: "convert vcf to csv, vcard to excel, export iphone contacts to csv, vcf converter, vcf to excel online, vcard to csv converter, extract vcf contacts",
    openGraph: {
        title: "VCF to CSV Converter - Export Contacts to Excel",
        description: "Convert your contact lists (VCF) to clean Excel/CSV files instantly. Perfect for migrating contacts from iPhone or Android.",
        type: "website",
        url: "https://statementextract.com/convert/vcf-to-csv",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/vcf-to-csv",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "VCF to CSV Converter",
    "applicationCategory": "ProductivityApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "featureList": "Convert VCF to CSV, Extract Photo/Email/Phone, Client-side Privacy",
    "softwareRequirements": "Modern Web Browser"
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://statementextract.com" },
        { "@type": "ListItem", "position": 2, "name": "Converters", "item": "https://statementextract.com/convert" },
        { "@type": "ListItem", "position": 3, "name": "VCF to CSV" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert iPhone contacts to Excel?",
            "acceptedAnswer": { "@type": "Answer", "text": "1. Go to iCloud.com or use your phone to export contacts as VCF. 2. Upload the VCF file here. 3. Click Convert to download a CSV file you can open in Excel." }
        },
        {
            "@type": "Question",
            "name": "Is my contact data private?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes, absolutely. This tool runs entirely in your browser. Your contacts are never uploaded to our servers, ensuring total privacy." }
        },
        {
            "@type": "Question",
            "name": "Does it support multiple contacts in one file?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes! We support VCard 2.1, 3.0, and 4.0 files containing single or thousands of contacts. We extract them all into a single list." }
        },
        {
            "@type": "Question",
            "name": "Can I import the result into Google Contacts or Outlook?",
            "acceptedAnswer": { "@type": "Answer", "text": "Yes. The output is a standard CSV file compatible with Google Contacts, Outlook, Salesforce, HubSpot, and Mailchimp." }
        }
    ]
};

const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How to Convert VCF to Excel Online",
    "step": [
        { "@type": "HowToStep", "name": "Upload VCF", "text": "Select your .vcf or .vcard file containing your contacts." },
        { "@type": "HowToStep", "name": "Preview Contacts", "text": "Verify the extracted names, numbers, and emails in the preview table." },
        { "@type": "HowToStep", "name": "Convert", "text": "Click 'Convert to CSV' to process the file." },
        { "@type": "HowToStep", "name": "Download", "text": "Save the clean CSV file and open it in Excel." }
    ]
};

const useCases = [
    { title: "iPhone to Excel", desc: "Easily backup your entire iPhone address book to a spreadsheet for safe keeping." },
    { title: "Email Marketing", desc: "Extract email addresses from your vCard exports to build a newsletter list for Mailchimp." },
    { title: "CRM Migration", desc: "Move contacts from an old phone or system into Salesforce, HubSpot, or Zoho CRM." },
    { title: "Android Backup", desc: "Convert Android 'Contacts.vcf' exports into a readable format on your PC." },
];

const relatedTools = [
    { href: "/convert/csv-to-excel", title: "CSV to Excel Converter" },
    { href: "/convert/excel-to-csv", title: "Excel to CSV Converter" },
    { href: "/convert/json-to-csv", title: "JSON to CSV Converter" },
    { href: "/tools/merge-pdf", title: "Merge PDF Files" },
];

export default function VcfToCsvPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <VcfToCsvTool />
            </section>

            {/* Why Use This Tool */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Why Use Our VCF to CSV Converter?
                    </h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Shield,
                                title: "Private & Secure",
                                desc: "Your contacts are personal. We process everything locally in your browser so no data ever leaves your device."
                            },
                            {
                                icon: Zap,
                                title: "Bulk Conversion",
                                desc: "Convert a single VCF file containing thousands of contacts in seconds. No per-contact limits."
                            },
                            {
                                icon: Users,
                                title: "Smart Extraction",
                                desc: "We intelligently parse standardized fields (FN, TEL, EMAIL) to clean up messy vCard data."
                            },
                            {
                                icon: Smartphone,
                                title: "Mobile Friendly",
                                desc: "Works perfectly on your phone. Export contacts on iOS/Android and convert them directly in Safari or Chrome."
                            },
                            {
                                icon: Database,
                                title: "CRM Ready",
                                desc: "The output CSV is formatted perfectly for importing into Salesforce, HubSpot, or Google Contacts."
                            },
                            {
                                icon: FileText,
                                title: "Zero Dependencies",
                                desc: "A lightweight, dedicated tool without the bloat of generic file converters. It just works."
                            }
                        ].map((feature, i) => (
                            <div key={i} className="p-8 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] hover:shadow-lg transition-shadow">
                                <feature.icon className="w-10 h-10 text-[hsl(var(--primary))] mb-4" />
                                <h3 className="text-xl font-bold text-[hsl(var(--foreground))] mb-3">{feature.title}</h3>
                                <p className="text-[hsl(var(--muted-foreground))] leading-relaxed">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How To Section */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        How to Convert VCard to Excel
                    </h2>
                    <div className="space-y-6">
                        {[
                            { step: 1, title: "Export Contacts", desc: "Export contacts from your phone or email app as a .vcf or .vcard file." },
                            { step: 2, title: "Upload File", desc: "Drop the file into our secure converter above." },
                            { step: 3, title: "Review Data", desc: "Check the preview to see how many contacts were found." },
                            { step: 4, title: "Download", desc: "Get your clean CSV file ready for Excel." },
                        ].map((item) => (
                            <div key={item.step} className="flex gap-4 items-start">
                                <div className="w-10 h-10 rounded-full bg-[hsl(var(--primary))] text-white flex items-center justify-center font-bold shrink-0">
                                    {item.step}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{item.title}</h3>
                                    <p className="text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Use Cases Grid */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Perfect for These Use Cases
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {useCases.map((useCase, i) => (
                            <div key={i} className="flex gap-4 items-start p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <CheckCircle className="w-6 h-6 text-[hsl(var(--primary))] shrink-0 mt-0.5" />
                                <div>
                                    <h3 className="font-semibold text-[hsl(var(--foreground))] mb-1">{useCase.title}</h3>
                                    <p className="text-sm text-[hsl(var(--muted-foreground))]">{useCase.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table */}
            <section className="py-12 md:py-16 px-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        Best Free VCF to CSV Converter (Vs. Competitors)
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Why use our tool instead of ad-filled alternatives?
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">Statement Extract</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Other Online Tools</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Privacy", us: "Fully Client-Side", competitors: "Uploads to Server (Risky)" },
                                    { feature: "Speed", us: "Instant", competitors: "Queue / Slow" },
                                    { feature: "Cost", us: "Free Forever", competitors: "Freemium / Paywall" },
                                    { feature: "Bulk Support", us: "Unlimited Contacts", competitors: "Often limited to 10-50" },
                                    { feature: "Clean Output", us: "Auto-Columns (Name, Tel, Email)", competitors: "Messy Raw Text" },
                                    { feature: "Accessibility", us: "Mobile & Desktop", competitors: "Desktop Only" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.us}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.competitors}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Deep Technical Dive: The iPhone Context */}
            <section className="py-12 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center mb-8">The "Apple Contacts" Trap</h2>
                    <p>
                        Apple uses a specific version of vCard (3.0) with custom fields for photos and "related names". When you try to open this directly in Excel, it fails because Excel expects a comma-separated list, not a vCard block.
                    </p>
                    <div className="grid md:grid-cols-2 gap-8 not-prose my-8">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                                <Smartphone className="w-5 h-5 text-[hsl(var(--primary))]" />
                                How to Export from iPhone (iCloud)
                            </h3>
                            <ol className="list-decimal pl-4 space-y-3 text-sm text-[hsl(var(--muted-foreground))]">
                                <li>Go to <strong>iCloud.com</strong> on your computer.</li>
                                <li>Click <strong>Contacts</strong>.</li>
                                <li>Select the contacts you want (or press generic Ctrl+A).</li>
                                <li>Click the <strong>Gear Icon</strong> (Settings) → <strong>Export vCard</strong>.</li>
                                <li>Upload that file here!</li>
                            </ol>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))]">
                            <h3 className="font-bold text-[hsl(var(--foreground))] mb-4 flex items-center gap-2">
                                <Database className="w-5 h-5 text-[hsl(var(--primary))]" />
                                VCard Version Wars
                            </h3>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="border-b border-[hsl(var(--border))]">
                                        <th className="text-left pb-2">Ver</th>
                                        <th className="text-left pb-2">Used By</th>
                                        <th className="text-left pb-2">Status</th>
                                    </tr>
                                </thead>
                                <tbody className="text-[hsl(var(--muted-foreground))]">
                                    <tr className="border-b border-[hsl(var(--border))]/50">
                                        <td className="py-2">2.1</td>
                                        <td>Ancient Mobiles (Nokia)</td>
                                        <td className="text-yellow-500">Supported</td>
                                    </tr>
                                    <tr className="border-b border-[hsl(var(--border))]/50">
                                        <td className="py-2">3.0</td>
                                        <td><strong>iPhone / iOS / Mac</strong></td>
                                        <td className="text-green-500 font-bold">Supported</td>
                                    </tr>
                                    <tr>
                                        <td className="py-2">4.0</td>
                                        <td>Modern Standards (RFC 6350)</td>
                                        <td className="text-green-500 font-bold">Supported</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </section>

            {/* SEO Content Block */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-2xl font-bold text-[hsl(var(--foreground))] mb-6">
                        The Easiest Way to View VCF Files in Excel
                    </h2>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        <strong>VCF (Virtual Contact File)</strong> is the standard format for storing contact information, but Excel doesn't always open it nicely. If you've ever tried to open a vCard in Excel and seen a jumbled mess of text, you know the struggle.
                    </p>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Our <strong>VCF to CSV Converter</strong> bridges this gap. It reads the structured vCard data and organizes it into neat columns: Name, Phone Number, Email, and Organization. This makes it incredibly easy to manage your contacts, build email lists, or migrate data between devices.
                    </p>

                    <h3 className="text-xl font-semibold text-[hsl(var(--foreground))] mb-4 mt-8">
                        Why Privacy Matters for Contact Conversion
                    </h3>
                    <p className="text-[hsl(var(--muted-foreground))] mb-4">
                        Most online converters require you to upload your file to their server. For personal contact lists, this is a privacy risk. We built this tool to run <strong>entirely in your browser</strong>. Your contacts are parsed by your own device's processor, and the CSV is generated locally. We never see your data.
                    </p>
                </div>
            </section>

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="VCF to CSV"
                relatedTools={relatedTools}
            />
        </main >
    );
}
