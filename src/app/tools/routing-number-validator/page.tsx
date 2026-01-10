import { Metadata } from "next";
import { RoutingValidatorTool } from "@/components/tools/RoutingValidatorTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { PageMeta } from "@/components/PageMeta";
import { CheckCircle, Search, ShieldAlert, CreditCard, Banknote, Globe } from "lucide-react";

export const metadata: Metadata = {
    title: "Routing Number Validator | Verify ABA Number Instantly",
    description: "Validate any US Bank Routing Number (ABA) instantly. Check for errors before sending wires or ACH transfers. Free lookup tool.",
    keywords: "routing number validator, check routing number, verify aba number, routing number checker, is this routing number valid, ach vs wire routing number",
    openGraph: {
        title: "Routing Number Validator - Instant Verification",
        description: "Don't send money to the wrong bank. Verify any US Routing Number instantly.",
        type: "website",
        url: "https://statementextract.com/tools/routing-number-validator",
    },
    alternates: {
        canonical: "https://statementextract.com/tools/routing-number-validator",
    },
};

const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "ABA Routing Number Validator",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Any",
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "featureList": "ABA Checksum Validation, Real-time Verification, Privacy Focused",
};

const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Tools", "item": "https://statementextract.com/tools" },
        { "@type": "ListItem", "position": 2, "name": "Routing Number Validator" }
    ]
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How many digits is a routing number?",
            "acceptedAnswer": { "@type": "Answer", "text": "A US ABA routing number is always exactly 9 digits long." }
        },
        {
            "@type": "Question",
            "name": "Are ACH and Wire routing numbers the same?",
            "acceptedAnswer": { "@type": "Answer", "text": "Not always. Some large banks (like Chase or Bank of America) use different routing numbers for electronic (ACH) transfers versus paper wire transfers. Always verify with your bank." }
        },
        {
            "@type": "Question",
            "name": "What do the first two digits mean?",
            "acceptedAnswer": { "@type": "Answer", "text": "The first two digits indicate the Federal Reserve District where the bank was originally located (01-12)." }
        }
    ]
};

const relatedTools = [
    { href: "/tools/percentage-calculator", title: "Percentage Calculator" },
    { href: "/convert/csv-to-excel", title: "CSV to Excel Converter" },
    { href: "/tools/hourly-to-salary-calculator", title: "Hourly to Salary Calculator" },
];

export default function RoutingValidatorPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <RoutingValidatorTool />
            </section>

            {/* AEO: Where to Find It */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-12">
                        Where to Find Your Routing Number
                    </h2>

                    <div className="bg-[hsl(var(--card))] p-8 rounded-2xl border border-[hsl(var(--border))] shadow-lg mb-10 overflow-hidden relative">
                        <div className="absolute top-4 right-4 text-[hsl(var(--muted-foreground))] opacity-20">
                            <CheckCircle className="w-32 h-32" />
                        </div>
                        <h3 className="font-mono text-xl text-[hsl(var(--muted-foreground))] mb-8 border-b pb-2">YOUR BANK NAME</h3>
                        <div className="font-handwriting text-2xl md:text-4xl text-[hsl(var(--primary))] mb-8 pl-10 transform -rotate-1">
                            Pay to the Order of ____________________ $ ___
                        </div>
                        <div className="flex flex-wrap gap-4 md:gap-8 items-end font-mono text-lg md:text-2xl pt-8 border-t border-dashed border-[hsl(var(--border))]">
                            <div className="relative group">
                                <div className="absolute -top-10 left-0 bg-[hsl(var(--primary))] text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                    Routing Number (9 Digits)
                                </div>
                                <span className="p-2 bg-[hsl(var(--primary))]/10 border border-[hsl(var(--primary))] rounded text-[hsl(var(--primary))] font-bold">
                                    |: 123456789 |:
                                </span>
                            </div>
                            <div className="text-[hsl(var(--muted-foreground))]">000123456789 ||'</div>
                            <div className="text-[hsl(var(--muted-foreground))]">101</div>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Search className="w-5 h-5 text-[hsl(var(--primary))]" />
                                On a Check
                            </h3>
                            <p className="text-[hsl(var(--muted-foreground))]">
                                It is usually the first 9-digit number at the bottom left of your personal check, enclosed by the `|:` symbol.
                            </p>
                        </div>
                        <div>
                            <h3 className="font-bold text-lg mb-2 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-[hsl(var(--primary))]" />
                                Online Banking
                            </h3>
                            <p className="text-[hsl(var(--muted-foreground))]">
                                Log in to your bank's app or website. Look for "Account Details" or "Direct Deposit" information.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Definition & Usage: The Basics */}
            <section className="py-12 px-6">
                <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
                    <div className="prose prose-lg dark:prose-invert">
                        <h2 className="text-3xl font-bold mb-6">What is a Routing Number?</h2>
                        <p className="text-[hsl(var(--muted-foreground))]">
                            A routing number (also known as an <strong>ABA Routing Number</strong> or <strong>RTN</strong>) is a unique 9-digit code assigned to financial institutions in the United States.
                        </p>
                        <p className="text-[hsl(var(--muted-foreground))] mt-4">
                            It serves as an address for your bank, allowing money to be moved accurately between institutions. Just like a zip code ensures mail gets to the right city, a routing number ensures funds get to the right bank.
                        </p>
                    </div>
                    <div className="space-y-4">
                        <h3 className="font-bold text-xl mb-4">When Do You Need It?</h3>
                        {[
                            { icon: Banknote, text: "Setting up Direct Deposit for your paycheck" },
                            { icon: Globe, text: "Sending or receiving Wire Transfers" },
                            { icon: CreditCard, text: "Paying bills online (ACH payments)" },
                            { icon: CheckCircle, text: "Ordering new paper checks" },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <item.icon className="w-6 h-6 text-[hsl(var(--primary))]" />
                                <span className="font-medium">{item.text}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Comparison Table: ACH vs Wire */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center mb-3">
                        ACH Routing Number vs. Wire Routing Number
                    </h2>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8">
                        Using the wrong number can delay your transfer or cause it to be rejected.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]/10">
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--foreground))]">Feature</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--primary))]">ACH / Direct Deposit</th>
                                    <th className="text-left p-4 font-semibold text-[hsl(var(--muted-foreground))]">Wire Transfer</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { feature: "Speed", ach: "1-3 Business Days", wire: "Same Day (Real-time)" },
                                    { feature: "Cost", ach: "Free or Low Cost", wire: "$15 - $50 Fee" },
                                    { feature: "Use Case", ach: "Paychecks, Bill Pay", wire: "Buying a House, Large Sums" },
                                    { feature: "Reversible?", ach: "Yes (in some cases)", wire: "No (Final)" },
                                ].map((row, i) => (
                                    <tr key={i} className="border-b border-[hsl(var(--border))]">
                                        <td className="p-4 text-[hsl(var(--foreground))]">{row.feature}</td>
                                        <td className="p-4 text-[hsl(var(--primary))] font-medium">{row.ach}</td>
                                        <td className="p-4 text-[hsl(var(--muted-foreground))]">{row.wire}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* How It Works: The Algo */}
            <section className="py-12 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-3xl mx-auto prose prose-lg dark:prose-invert">
                    <h2 className="text-center">How to Manually Validate a Routing Number</h2>
                    <p>
                        Can't access our tool? You can validate a US routing number manually using the <strong>Luhn Algorithm</strong> (specifically, the mod 10 algorithm used for ABA numbers).
                    </p>
                    <div className="bg-[hsl(var(--card))] p-6 rounded-xl border border-[hsl(var(--border))] not-prose">
                        <h3 className="font-bold text-lg mb-4">The Formula: 3-7-1-3-7-1-3-7-1</h3>
                        <ol className="space-y-2 text-sm md:text-base list-decimal list-inside">
                            <li>Take the first 8 digits of your routing number.</li>
                            <li>Multiply each digit by the pattern: <strong>3, 7, 1, 3, 7, 1, 3, 7</strong>.</li>
                            <li>Sum up all the results.</li>
                            <li>Round the sum up to the nearest multiple of 10.</li>
                            <li>Subtract your original sum from that multiple of 10.</li>
                            <li>The result must equal the <strong>9th digit</strong> (the checksum).</li>
                        </ol>
                    </div>
                </div>
            </section>

            {/* Routing Number Breakdown: The Science */}
            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/10">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Decoding the 9 Digits (MICR Format)</h2>

                    {/* The XXXX-YYYY-C Pattern */}
                    <div className="grid md:grid-cols-3 gap-6 mb-12">
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))] text-center">
                            <div className="text-4xl font-mono font-bold text-[hsl(var(--primary))] mb-2">XXXX</div>
                            <h3 className="font-semibold mb-2">Federal Reserve Symbol</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                First 4 digits. Identifies the Federal Reserve district and institution type.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))] text-center">
                            <div className="text-4xl font-mono font-bold text-blue-500 mb-2">YYYY</div>
                            <h3 className="font-semibold mb-2">Institution ID</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Next 4 digits. The specific bank or credit union identifier within that district.
                            </p>
                        </div>
                        <div className="bg-[hsl(var(--card))] p-6 rounded-2xl border border-[hsl(var(--border))] text-center">
                            <div className="text-4xl font-mono font-bold text-green-500 mb-2">C</div>
                            <h3 className="font-semibold mb-2">Check Digit</h3>
                            <p className="text-sm text-[hsl(var(--muted-foreground))]">
                                Last digit. Calculated using the checksum formula to verify validity.
                            </p>
                        </div>
                    </div>

                    <h3 className="text-xl font-bold text-center mb-6">Federal Reserve Prefixes & Meanings</h3>
                    <p className="text-center text-[hsl(var(--muted-foreground))] mb-8 max-w-2xl mx-auto">
                        The first two digits tell you the region and type of institution.
                        <br />
                        <span className="text-xs opacity-70">(Add 20 for Thrift/Credit Unions, Add 60 for Electronic/ETIs)</span>
                    </p>

                    <div className="overflow-x-auto bg-[hsl(var(--card))] rounded-xl border border-[hsl(var(--border))]">
                        <table className="w-full text-sm md:text-base">
                            <thead className="bg-[hsl(var(--muted))]/50">
                                <tr>
                                    <th className="p-4 text-left">Reserve Bank (District)</th>
                                    <th className="p-4 text-center">Primary (01-12)</th>
                                    <th className="p-4 text-center">Thrift/CU (+20)</th>
                                    <th className="p-4 text-center">Electronic (+60)</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[hsl(var(--border))]">
                                {[
                                    { area: "Boston", code: "01" }, { area: "New York", code: "02" },
                                    { area: "Philadelphia", code: "03" }, { area: "Cleveland", code: "04" },
                                    { area: "Richmond", code: "05" }, { area: "Atlanta", code: "06" },
                                    { area: "Chicago", code: "07" }, { area: "St. Louis", code: "08" },
                                    { area: "Minneapolis", code: "09" }, { area: "Kansas City", code: "10" },
                                    { area: "Dallas", code: "11" }, { area: "San Francisco", code: "12" }
                                ].map((item) => (
                                    <tr key={item.code} className="hover:bg-[hsl(var(--muted))]/10">
                                        <td className="p-3 pl-6 font-medium">{item.area}</td>
                                        <td className="p-3 text-center font-mono text-[hsl(var(--primary))]">{item.code}</td>
                                        <td className="p-3 text-center font-mono text-blue-500">{String(parseInt(item.code) + 20).padStart(2, '0')}</td>
                                        <td className="p-3 text-center font-mono text-purple-500">{String(parseInt(item.code) + 60).padStart(2, '0')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            {/* Safety Warning */}
            <section className="py-12 px-6 bg-red-500/5 border-y border-red-500/20">
                <div className="max-w-3xl mx-auto flex gap-4 md:items-center flex-col md:flex-row">
                    <div className="w-12 h-12 rounded-full bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                        <ShieldAlert className="w-6 h-6" />
                    </div>
                    <div>
                        <h3 className="text-xl font-bold text-red-900 dark:text-red-400 mb-2">Warning: Protect Your Routing Number</h3>
                        <p className="text-red-800/80 dark:text-red-300/80 leading-relaxed">
                            While routing numbers are public (they identify the bank, not you), they are sensitive when combined with your Account Number. Never share your Account Number unless you trust the recipient completely.
                        </p>
                    </div>
                </div>
            </section>

            {/* FAQ Area */}
            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                    <div className="space-y-4">
                        {faqSchema.mainEntity.map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-lg mb-2">{faq.name}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.acceptedAnswer.text}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-8 px-6">
                <div className="max-w-4xl mx-auto">
                    <PageMeta lastUpdated="January 2026" />
                </div>
            </section>

            <ToolPageFooter
                currentTool="Routing Number Validator"
                relatedTools={relatedTools}
            />
        </main>
    );
}
