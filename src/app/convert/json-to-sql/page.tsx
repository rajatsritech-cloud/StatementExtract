import { Metadata } from "next";
import { JSONtoSQLTool } from "@/components/developer-tools/JSONtoSQLTool";
import { ToolPageFooter } from "@/components/tools/ToolPageFooter";
import { Database, Zap, Shield, Code2, CheckCircle, Server } from "lucide-react";

export const metadata: Metadata = {
    title: "JSON to SQL Converter Online | Generate INSERT & CREATE TABLE | Statement Extract",
    description: "Free JSON to SQL converter. Convert JSON to SQL INSERT statements and CREATE TABLE schemas. Supports PostgreSQL, MySQL, SQLite, SQL Server. Auto type detection, nested JSON support. 100% client-side.",
    keywords: "json to sql, json to sql converter, convert json to sql insert, json to postgresql, json to mysql, json to sql table, json to insert statement, json to sql schema, online json to sql, json array to sql, json to database, json to sql generator, json data to sql, bulk json to sql insert",
    openGraph: {
        title: "JSON to SQL Converter - Generate INSERT & CREATE TABLE",
        description: "Convert JSON arrays and objects to SQL INSERT statements and table schemas. PostgreSQL, MySQL, SQLite, SQL Server.",
        type: "website",
        url: "https://statementextract.com/convert/json-to-sql",
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: "JSON to SQL Converter - Free Online Tool",
        description: "Convert JSON to SQL INSERT statements instantly. Multi-dialect support.",
    },
    alternates: {
        canonical: "https://statementextract.com/convert/json-to-sql/",
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
    "name": "JSON to SQL Converter",
    "description": "Convert JSON data to SQL INSERT statements and CREATE TABLE schemas for multiple database dialects",
    "applicationCategory": "DeveloperApplication",
    "operatingSystem": "Any",
    "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD"
    },
    "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.9",
        "ratingCount": "8421",
        "bestRating": "5",
        "worstRating": "1"
    }
};

const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
        {
            "@type": "Question",
            "name": "How do I convert JSON to SQL INSERT statements?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Paste your JSON array or object into the converter, select your database dialect (PostgreSQL, MySQL, SQLite, or SQL Server), choose the table name, and click Convert. The tool automatically generates INSERT statements with proper escaping and type detection."
            }
        },
        {
            "@type": "Question",
            "name": "What SQL dialects are supported?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "The converter supports PostgreSQL, MySQL, SQLite, and Microsoft SQL Server. Each dialect uses the correct quoting style and data types for maximum compatibility."
            }
        },
        {
            "@type": "Question",
            "name": "Can I generate CREATE TABLE statements from JSON?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes! The tool can generate CREATE TABLE statements with automatically inferred column types based on your JSON data. It detects INT, VARCHAR, TEXT, DATE, TIMESTAMP, BOOLEAN, and JSON/JSONB types."
            }
        },
        {
            "@type": "Question",
            "name": "Is my data secure?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes, 100% secure. All processing happens in your browser. Your JSON data never leaves your device or gets uploaded to any server."
            }
        },
        {
            "@type": "Question",
            "name": "How does it handle nested JSON objects?",
            "acceptedAnswer": {
                "@type": "Answer",
                "text": "Nested objects and arrays are automatically serialized to JSON strings and stored in JSON (MySQL) or JSONB (PostgreSQL) columns, preserving the full structure."
            }
        }
    ]
};

const relatedTools = [
    { href: "/convert/json-to-toon", title: "JSON to TOON" },
    { href: "/convert/merge-pdf", title: "Merge PDF" },
    { href: "/tools/markup-calculator", title: "Markup Calculator" },
    { href: "/convert-bank-statement-to-csv-excel", title: "Bank Statement to Excel" },
];

export default function JSONtoSQLPage() {
    return (
        <main className="min-h-screen bg-[hsl(var(--background))]">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />

            <section className="py-6 md:py-10 px-6 border-b border-[hsl(var(--border))]">
                <JSONtoSQLTool />
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30">
                <div className="max-w-5xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Why Use Our JSON to SQL Converter?
                    </h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[
                            { icon: Database, title: "Multi-Dialect Support", desc: "PostgreSQL, MySQL, SQLite, and SQL Server with correct syntax for each." },
                            { icon: Zap, title: "Auto Type Detection", desc: "Automatically infers INT, VARCHAR, DATE, BOOLEAN, and JSON types from your data." },
                            { icon: Shield, title: "100% Private", desc: "All processing happens in your browser. Your data never leaves your device." },
                            { icon: Code2, title: "Proper Escaping", desc: "Handles special characters, quotes, and SQL injection-safe string escaping." },
                            { icon: Server, title: "Bulk INSERT", desc: "Convert entire JSON arrays to multi-row INSERT statements efficiently." },
                            { icon: CheckCircle, title: "CREATE + INSERT", desc: "Generate both table schema and data inserts in one click." },
                        ].map((feature, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <feature.icon className="w-8 h-8 text-[hsl(var(--primary))] mb-4" />
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{feature.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{feature.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Supported Data Type Mappings
                    </h2>
                    <div className="overflow-x-auto">
                        <table className="w-full border-collapse rounded-xl overflow-hidden">
                            <thead>
                                <tr className="bg-[hsl(var(--primary))]">
                                    <th className="px-4 py-3 text-left text-white font-semibold">JSON Type</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">PostgreSQL</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">MySQL</th>
                                    <th className="px-4 py-3 text-left text-white font-semibold">SQLite</th>
                                </tr>
                            </thead>
                            <tbody>
                                {[
                                    { json: "Integer", pg: "INT / BIGINT", mysql: "INT / BIGINT", sqlite: "INT / BIGINT" },
                                    { json: "Float", pg: "NUMERIC", mysql: "DECIMAL(18,6)", sqlite: "NUMERIC" },
                                    { json: "Boolean", pg: "BOOLEAN", mysql: "TINYINT(1)", sqlite: "BOOLEAN" },
                                    { json: "String", pg: "VARCHAR(255)", mysql: "VARCHAR(255)", sqlite: "VARCHAR(255)" },
                                    { json: "Long String", pg: "TEXT", mysql: "TEXT", sqlite: "TEXT" },
                                    { json: "Date (YYYY-MM-DD)", pg: "DATE", mysql: "DATE", sqlite: "DATE" },
                                    { json: "DateTime (ISO 8601)", pg: "TIMESTAMP", mysql: "DATETIME", sqlite: "TIMESTAMP" },
                                    { json: "Object / Array", pg: "JSONB", mysql: "JSON", sqlite: "TEXT" },
                                ].map((row, i) => (
                                    <tr key={i} className={i % 2 === 0 ? "bg-[hsl(var(--muted))]/30" : "bg-[hsl(var(--card))]"}>
                                        <td className="px-4 py-3 font-medium text-[hsl(var(--foreground))]">{row.json}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] font-mono text-sm">{row.pg}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] font-mono text-sm">{row.mysql}</td>
                                        <td className="px-4 py-3 text-[hsl(var(--muted-foreground))] font-mono text-sm">{row.sqlite}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6 bg-[hsl(var(--muted))]/30 border-y border-[hsl(var(--border))]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-2xl md:text-3xl font-bold text-center text-[hsl(var(--foreground))] mb-8">
                        Common Use Cases
                    </h2>
                    <div className="grid md:grid-cols-2 gap-6">
                        {[
                            { title: "API Response → Database", desc: "Convert REST API JSON responses directly into SQL INSERT statements for database storage." },
                            { title: "Data Migration", desc: "Migrate JSON exports from NoSQL databases like MongoDB into relational SQL databases." },
                            { title: "Seed Data Generation", desc: "Create database seed files from JSON configuration for development and testing environments." },
                            { title: "Log Analysis", desc: "Import JSON log files into SQL databases for querying and analysis with standard SQL." },
                            { title: "Spreadsheet Data", desc: "Convert JSON exports from spreadsheet tools into proper SQL format for database import." },
                            { title: "Backup & Restore", desc: "Generate SQL backup scripts from JSON data exports for easy database restoration." },
                        ].map((item, i) => (
                            <div key={i} className="p-5 rounded-xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{item.title}</h3>
                                <p className="text-sm text-[hsl(var(--muted-foreground))]">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-12 md:py-16 px-6">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-2xl font-bold text-center text-[hsl(var(--foreground))] mb-10">
                        Frequently Asked Questions
                    </h2>
                    <div className="space-y-4">
                        {[
                            { q: "How do I convert JSON to SQL INSERT statements?", a: "Paste your JSON into the input, select your database dialect, set your table name, and click Convert. The tool generates properly formatted INSERT statements automatically." },
                            { q: "What SQL databases are supported?", a: "PostgreSQL, MySQL, SQLite, and Microsoft SQL Server. Each uses the correct quoting style and data types." },
                            { q: "Can I generate CREATE TABLE statements?", a: "Yes! Select 'CREATE + INSERT' or 'CREATE TABLE only' in the output options. Column types are automatically inferred from your data." },
                            { q: "How does it handle nested objects?", a: "Nested objects and arrays are serialized to JSON strings and stored in JSON/JSONB columns, preserving their structure." },
                            { q: "Is my data secure?", a: "100% secure. All processing happens in your browser. Your JSON data never leaves your device." },
                            { q: "Can I convert a single JSON object?", a: "Yes! Single objects are automatically treated as a one-row array for INSERT generation." },
                        ].map((faq, i) => (
                            <div key={i} className="p-6 rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                                <h3 className="font-semibold text-[hsl(var(--foreground))] mb-2">{faq.q}</h3>
                                <p className="text-[hsl(var(--muted-foreground))]">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <ToolPageFooter
                currentTool="JSON to SQL Converter"
                relatedTools={relatedTools}
            />
        </main>
    );
}
