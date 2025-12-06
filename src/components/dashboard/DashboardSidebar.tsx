"use client";

import { FileText, Receipt, FileSpreadsheet, Settings, CreditCard, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/clerk-react";

interface SidebarProps {
    className?: string;
}

export const DashboardSidebar = ({ className }: SidebarProps) => {
    const { user } = useUser();
    const navItems = [
        { icon: LayoutDashboard, label: "Home", active: false, href: "/" },
        { icon: FileSpreadsheet, label: "Bank Statements", active: true },
        { icon: Receipt, label: "Invoices", active: false, badge: "Soon" },
        { icon: FileText, label: "Receipts", active: false, badge: "Soon" },
        { icon: CreditCard, label: "Credit Cards", active: false, badge: "Soon" },
    ];

    return (
        <div className={cn("flex h-full w-67 flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))]", className)}>
            <div className="p-6">
                <div className="flex items-center gap-2 font-bold text-xl text-[hsl(var(--foreground))]">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
                        <FileText className="h-4 w-4 text-white" />
                    </div>
                    <span>Statement Extract</span>
                </div>
            </div>

            <div className="flex-1 px-4 py-2">
                <nav className="space-y-1">
                    {navItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href || "#"}
                            className={cn(
                                "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                                item.active
                                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                            )}
                        >
                            <div className="flex items-center gap-3">
                                <item.icon className="h-4 w-4" />
                                <span>{item.label}</span>
                            </div>
                            {item.badge && (
                                <span className="rounded-full bg-[hsl(var(--muted))] px-2 py-0.5 text-[10px] font-medium text-[hsl(var(--muted-foreground))]">
                                    {item.badge}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                <div className="mt-8 mb-2 px-2 text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                    Settings
                </div>
                <nav className="space-y-1">
                    <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))] transition-colors">
                        <Settings className="h-4 w-4" />
                        <span>Preferences</span>
                    </button>
                </nav>
            </div>

            <div className="p-4 border-t border-[hsl(var(--border))] space-y-4">
                <div className="rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 p-4">
                    <h4 className="mb-1 text-sm font-semibold text-[hsl(var(--foreground))]">Free Plan</h4>
                    <p className="text-xs text-[hsl(var(--muted-foreground))] mb-3">
                        Free Tier: 10 pages per day
                    </p>
                    <div className="h-1.5 w-full rounded-full bg-[hsl(var(--background))]">
                        <div className="h-full w-[20%] rounded-full bg-[hsl(var(--primary))]" />
                    </div>
                </div>

                {/* User Profile Section */}
                <div className="flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors">
                    <UserButton afterSignOutUrl="/" />
                    <div className="flex flex-col overflow-hidden">
                        <span className="text-sm font-medium truncate text-[hsl(var(--foreground))]">
                            {user?.fullName || user?.firstName || "User"}
                        </span>
                        <span className="text-xs text-[hsl(var(--muted-foreground))] truncate">
                            {user?.primaryEmailAddress?.emailAddress}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};
