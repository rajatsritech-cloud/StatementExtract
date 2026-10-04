"use client";

import { useState, useEffect } from "react";
import { X, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SignInButton } from "@clerk/clerk-react";

export const LoginPromptModal = () => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        // Show modal after a short delay to let user see the tool first
        const timer = setTimeout(() => {
            setIsOpen(true);
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
            <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-[hsl(var(--card))] border border-[hsl(var(--border))] shadow-2xl animate-scale-in">

                {/* Close Button */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="absolute right-4 top-4 rounded-full p-1 text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors"
                >
                    <X className="h-4 w-4" />
                </button>

                <div className="p-6 text-center">
                    {/* Icon */}
                    <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[hsl(var(--primary))]/10">
                        <Sparkles className="h-6 w-6 text-[hsl(var(--primary))]" />
                    </div>

                    {/* Title */}
                    <h2 className="mb-2 text-xl font-bold text-[hsl(var(--foreground))]">
                        Unlock Advanced Features for Free!
                    </h2>

                    {/* Description */}
                    <p className="mb-6 text-sm text-[hsl(var(--muted-foreground))]">
                        Login to the tool to see your dashboard. It's free of cost and no credit card required.
                    </p>

                    {/* Feature List (Optional but persuasive) */}
                    <div className="mb-6 space-y-2 text-left">
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Save and manage your extractions</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Access higher usage limits</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                            <span>Export to multiple formats</span>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex flex-col gap-3">
                        <SignInButton mode="modal" forceRedirectUrl="/dashboard">
                            <Button className="w-full gap-2 shadow-lg hover:shadow-xl transition-all">
                                Login / Sign Up Free
                            </Button>
                        </SignInButton>

                        <Button
                            variant="ghost"
                            onClick={() => setIsOpen(false)}
                            className="text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))]"
                        >
                            Continue as Guest
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
