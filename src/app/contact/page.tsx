import { ContactForm } from "@/components/ContactForm";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | Statement Extract",
    description: "Get in touch with the Statement Extract team for support, sales, or product feedback.",
};

export default function ContactPage() {
    return (
        <div className="relative mx-auto max-w-3xl px-6 py-12 space-y-10">
            <section className="space-y-3">
                <p className="text-xs font-semibold tracking-[0.25em] text-[hsl(var(--muted-foreground))]">
                    CONTACT
                </p>
                <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-[hsl(var(--foreground))]">
                    Get in touch
                </h1>
                <p className="text-sm md:text-base text-[hsl(var(--muted-foreground))]">
                    Have a question about your statement conversion? Need help with a specific bank format?
                    Or interested in our enterprise API? Fill out the form below and we'll get back to you shortly.
                </p>
            </section>

            <section className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 md:p-8 shadow-sm">
                <ContactForm />
            </section>

            <section className="space-y-3 pt-6 border-t border-[hsl(var(--border))]">
                <h2 className="text-sm font-semibold text-[hsl(var(--foreground))]">
                    Direct Email
                </h2>
                <p className="text-sm text-[hsl(var(--muted-foreground))]">
                    You can also email us directly at: <a href="mailto:support@statementextract.com" className="text-[hsl(var(--primary))] hover:underline">support@statementextract.com</a>
                </p>
            </section>
        </div>
    );
}
