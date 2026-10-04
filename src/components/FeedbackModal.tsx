"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ContactForm } from "@/components/ContactForm";
import { MessageSquarePlus, X } from "lucide-react";

export function FeedbackModal() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Only show on /convert and /tools pages
    // Also excluding the main directories listing pages if desired, but user said "all converters and tools"
    // so let's keep it broad.
    const shouldShow = pathname?.startsWith("/convert") || pathname?.startsWith("/tools");

    if (!mounted || !shouldShow) return null;

    return (
        <>
            {/* Trigger Button - Fixed position or placed in header? 
          User asked for "in top", so we might just place this component in Header 
          and have it render a button there.
          
          Let's assume this component renders the BUTTON + the MODAL.
      */}
            <Button
                variant="outline"
                size="sm"
                className="hidden md:flex gap-2 bg-[hsl(var(--primary))] text-[hsl(var(--primary-foreground))] hover:bg-[hsl(var(--primary))]/90 shadow-md transition-all hover:-translate-y-0.5"
                onClick={() => setIsOpen(true)}
            >
                <MessageSquarePlus className="w-4 h-4" />
                Feedback
            </Button>

            {/* Mobile Icon Only version if space is tight? Or just hide on mobile? 
          Let's make a mobile version too.
      */}
            <Button
                variant="ghost"
                size="icon"
                className="md:hidden text-[hsl(var(--muted-foreground))]"
                onClick={() => setIsOpen(true)}
            >
                <MessageSquarePlus className="w-5 h-5" />
            </Button>


            {/* Custom Modal Overlay */}
            {isOpen && (typeof document !== 'undefined') && createPortal(
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
                    <div
                        className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-[hsl(var(--background))] rounded-xl shadow-2xl border border-[hsl(var(--border))] animate-in zoom-in-95 duration-200 p-6 md:p-8"
                        role="dialog"
                        aria-modal="true"
                    >
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-4 right-4 text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] transition-colors"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-[hsl(var(--foreground))]">Feedback & Suggestions</h2>
                            <p className="text-[hsl(var(--muted-foreground))] mt-2">
                                Found a bug? Have a feature request? Let us know how we can improve this tool.
                            </p>
                        </div>

                        <ContactForm />
                    </div>

                    {/* Backdrop click to close */}
                    <div className="absolute inset-0 -z-10" onClick={() => setIsOpen(false)} />
                </div>,
                document.body
            )}
        </>
    );
}
