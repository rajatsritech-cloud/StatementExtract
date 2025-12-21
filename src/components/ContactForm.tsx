"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export function ContactForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        company: "",
        help_needed: "",
        details: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [id === "use-case" ? "help_needed" : id]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitStatus("idle");

        try {
            // Determine API URL
            let apiUrl = process.env.NEXT_PUBLIC_API_URL || '';

            const response = await fetch(`${apiUrl}/api/v1/contact/submit`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error("Failed to send message");
            }

            setSubmitStatus("success");
            setFormData({
                name: "",
                email: "",
                company: "",
                help_needed: "",
                details: "",
            });
        } catch (error) {
            console.error("Error submitting form:", error);
            setSubmitStatus("error");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
            <div className="space-y-1">
                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="name">
                    Name
                </label>
                <Input
                    id="name"
                    placeholder="Alex from Example Co."
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="email">
                    Work email
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="company">
                    Company (optional)
                </label>
                <Input
                    id="company"
                    placeholder="Company name"
                    value={formData.company}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="use-case">
                    What would you like help with?
                </label>
                <Input
                    id="use-case"
                    placeholder="e.g. Cleaning up 12 months of bank statements"
                    value={formData.help_needed}
                    onChange={handleChange}
                />
            </div>
            <div className="space-y-1 md:col-span-2">
                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="message">
                    Additional details or questions
                </label>
                <Textarea
                    id="details"
                    placeholder="Share links to example files, banks you use, or anything else that would help."
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                />
            </div>
            <div className="md:col-span-2 flex flex-wrap items-center gap-3">
                <Button type="submit" className="shadow-md" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : (
                        "Send message"
                    )}
                </Button>

                {submitStatus === "success" && (
                    <div className="flex items-center gap-2 text-sm text-green-600 animate-in fade-in slide-in-from-left-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>Message sent! We'll be in touch soon.</span>
                    </div>
                )}

                {submitStatus === "error" && (
                    <div className="flex items-center gap-2 text-sm text-red-600 animate-in fade-in slide-in-from-left-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>Something went wrong. Please try again or email us directly.</span>
                    </div>
                )}

                {submitStatus === "idle" && !isSubmitting && (
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                        This form is for discovery and product feedback. We'll get back to you with next steps
                        or a short demo if helpful.
                    </p>
                )}
            </div>
        </form>
    );
}
