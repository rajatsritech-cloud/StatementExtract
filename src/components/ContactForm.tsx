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
    const [errors, setErrors] = useState<Record<string, string>>({});

    // Client-side spam protection: simple timestamp check
    const [lastSubmitTime, setLastSubmitTime] = useState(0);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        // Clear error when user types
        if (errors[id]) {
            setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors[id];
                return newErrors;
            });
        }

        // Character limit logic for details
        if (id === "details" && value.length > 500) return;

        setFormData((prev) => ({
            ...prev,
            [id === "use-case" ? "help_needed" : id]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";

        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = "Please enter a valid email address";
        }

        if (!formData.details.trim()) {
            newErrors.details = "Please provide some details";
        } else if (formData.details.length < 10) {
            newErrors.details = "Feedback must be at least 10 characters";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Spam prevention: Rate limit (e.g., 10 seconds between submissions)
        const now = Date.now();
        if (now - lastSubmitTime < 10000) {
            setSubmitStatus("error");
            setErrors({ general: "Please wait a moment before sending another message." });
            return;
        }

        if (!validateForm()) return;

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

            setLastSubmitTime(Date.now());
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
                    Name <span className="text-red-500">*</span>
                </label>
                <Input
                    id="name"
                    placeholder="Alex from Example Co."
                    value={formData.name}
                    onChange={handleChange}
                    className={errors.name ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.name && <p className="text-[10px] text-red-500">{errors.name}</p>}
            </div>
            <div className="space-y-1">
                <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="email">
                    Email <span className="text-red-500">*</span>
                </label>
                <Input
                    id="email"
                    type="email"
                    placeholder="you@company.com"
                    value={formData.email}
                    onChange={handleChange}
                    className={errors.email ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.email && <p className="text-[10px] text-red-500">{errors.email}</p>}
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
                <div className="flex justify-between">
                    <label className="text-xs font-medium text-[hsl(var(--muted-foreground))]" htmlFor="details">
                        Additional details or questions <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[10px] text-[hsl(var(--muted-foreground))]">
                        {formData.details.length}/500
                    </span>
                </div>
                <Textarea
                    id="details"
                    placeholder="Share links to example files, banks you use, or anything else that would help."
                    rows={4}
                    value={formData.details}
                    onChange={handleChange}
                    className={errors.details ? "border-red-500 focus-visible:ring-red-500" : ""}
                />
                {errors.details && <p className="text-[10px] text-red-500">{errors.details}</p>}
            </div>

            {errors.general && (
                <div className="md:col-span-2 flex items-center gap-2 text-sm text-red-600 bg-red-50 p-2 rounded-md">
                    <AlertCircle className="h-4 w-4" />
                    <span>{errors.general}</span>
                </div>
            )}

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

                {submitStatus === "error" && !errors.general && (
                    <div className="flex flex-col gap-1 w-full text-sm text-red-600 animate-in fade-in slide-in-from-left-2">
                        <div className="flex items-center gap-2">
                            <AlertCircle className="h-4 w-4" />
                            <span>Server error (possibly overloaded).</span>
                        </div>
                        <p className="ml-6 text-xs text-red-500">
                            Please email us directly at <a href="mailto:support@statementextract.com" className="underline hover:text-red-700">support@statementextract.com</a>
                        </p>
                    </div>
                )}

                {submitStatus === "idle" && !isSubmitting && (
                    <div className="flex flex-col gap-2 w-full">
                        <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            This form is for discovery and product feedback. We'll get back to you with next steps
                            or a short demo if helpful.
                        </p>
                        <p className="text-[10px] text-[hsl(var(--muted-foreground))]">
                            You can also directly email us at <a href="mailto:support@statementextract.com" className="text-[hsl(var(--primary))] hover:underline">support@statementextract.com</a>
                        </p>
                    </div>
                )}
            </div>
        </form>
    );
}
