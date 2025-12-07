"use client";

import { useState, useEffect } from "react";
import { FileText, Receipt, FileSpreadsheet, Settings, CreditCard, LayoutDashboard, Shield, Truck, Activity, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { UserButton, useUser } from "@clerk/clerk-react";
import { useUsage } from "@/hooks/useUsage";

interface SidebarProps {
    className?: string;
}

export const DashboardSidebar = ({ className }: SidebarProps) => {
    const { user } = useUser();
    const { usage: usageData, isLoading } = useUsage();
    const [isCollapsed, setIsCollapsed] = useState(false);

    type NavItem = {
        icon: React.ElementType;
        label: string;
        active?: boolean;
        href?: string;
        badge?: string;
        disabled?: boolean;
    };

    const mainNav: NavItem[] = [
        { icon: LayoutDashboard, label: "Home", active: false, href: "/" },
    ];

    const productItems: NavItem[] = [
        { icon: FileText, label: "Bank Statements", active: true, href: "/dashboard" },
        { icon: Receipt, label: "Invoices", disabled: true, badge: "Soon" },
        { icon: Shield, label: "Insurance", disabled: true, badge: "Soon" },
        { icon: Truck, label: "Logistics", disabled: true, badge: "Soon" },
        { icon: Activity, label: "Healthcare", disabled: true, badge: "Soon" },
    ];

    const accountItems: NavItem[] = [
        { icon: CreditCard, label: "Billing", active: false, href: "/billing" },
        { icon: Settings, label: "Settings", active: false, href: "/settings" },
    ];

    return (
        <div
            className={cn(
                "flex h-full flex-col border-r border-[hsl(var(--border))] bg-[hsl(var(--card))] transition-all duration-300 ease-in-out relative",
                isCollapsed ? "w-16" : "w-64",
                className
            )}
        >
            {/* Collapse Toggle Button */}
            <button
                onClick={() => setIsCollapsed(!isCollapsed)}
                className="absolute -right-3 top-9 z-50 flex h-6 w-6 items-center justify-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--card))] text-[hsl(var(--muted-foreground))] hover:text-[hsl(var(--foreground))] hover:bg-[hsl(var(--muted))] shadow-sm transition-colors"
            >
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronLeft className="h-3 w-3" />}
            </button>

            <div className={cn("p-4", isCollapsed && "px-2")}>
                <div className={cn("flex items-center gap-2 font-bold text-lg text-[hsl(var(--foreground))]", isCollapsed && "justify-center")}>
                    <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-gradient-primary">
                        <FileText className="h-4 w-4 text-white" />
                    </div>
                    {!isCollapsed && <span>Statement Extract</span>}
                </div >
            </div >

            <div className="flex-1 px-3 py-2 overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
                {/* Main Nav */}
                <nav className="space-y-0.5 mb-4">
                    {mainNav.map((item) => (
                        <a
                            key={item.label}
                            href={item.href || "#"}
                            className={cn(
                                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isCollapsed ? "justify-center px-2" : "justify-between",
                                item.active
                                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span>{item.label}</span>}
                            </div>
                        </a>
                    ))}
                </nav>

                {/* Products Section */}
                {!isCollapsed && (
                    <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        Products
                    </div>
                )}
                <nav className="space-y-0.5 mb-4">
                    {productItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.disabled ? undefined : (item.href || "#")}
                            className={cn(
                                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isCollapsed ? "justify-center px-2" : "justify-between",
                                item.active
                                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                                    : item.disabled
                                        ? "text-[hsl(var(--muted-foreground))] opacity-70 cursor-not-allowed"
                                        : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span>{item.label}</span>}
                            </div>
                            {!isCollapsed && item.badge && (
                                <span className="rounded-full bg-[hsl(var(--primary))]/10 px-1.5 py-0.5 text-[9px] font-medium text-[hsl(var(--primary))]">
                                    {item.badge}
                                </span>
                            )}
                        </a>
                    ))}
                </nav>

                {/* Account Section */}
                {!isCollapsed && (
                    <div className="mb-2 px-2 text-[10px] font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))]">
                        Account
                    </div>
                )}
                <nav className="space-y-0.5">
                    {accountItems.map((item) => (
                        <a
                            key={item.label}
                            href={item.href || "#"}
                            className={cn(
                                "flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                isCollapsed ? "justify-center px-2" : "justify-between",
                                item.active
                                    ? "bg-[hsl(var(--primary))]/10 text-[hsl(var(--primary))]"
                                    : "text-[hsl(var(--muted-foreground))] hover:bg-[hsl(var(--muted))] hover:text-[hsl(var(--foreground))]"
                            )}
                            title={isCollapsed ? item.label : undefined}
                        >
                            <div className={cn("flex items-center gap-3", isCollapsed && "justify-center")}>
                                <item.icon className="h-4 w-4 shrink-0" />
                                {!isCollapsed && <span>{item.label}</span>}
                            </div>
                        </a>
                    ))}
                </nav>
            </div>

            <div className={cn("border-t border-[hsl(var(--border))] space-y-3", isCollapsed ? "p-2" : "p-3")}>
                {!isCollapsed ? (
                    <div className="rounded-xl bg-gradient-to-br from-[hsl(var(--primary))]/20 to-[hsl(var(--accent))]/20 p-3">
                        <h4 className="mb-1 text-xs font-semibold text-[hsl(var(--foreground))] capitalize">
                            {usageData ? `${usageData.tier} Plan` : "Free Plan"}
                        </h4>
                        <p className="text-[10px] text-[hsl(var(--muted-foreground))] mb-2">
                            {usageData
                                ? `${usageData.usage} / ${usageData.limit} pages used today`
                                : "Loading usage..."}
                        </p>
                        <div className="h-1 w-full rounded-full bg-[hsl(var(--background))] overflow-hidden">
                            <div
                                className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
                                style={{
                                    width: usageData
                                        ? `${Math.min(100, (usageData.usage / usageData.limit) * 100)}%`
                                        : '0%'
                                }}
                            />
                        </div>
                    </div>
                ) : (
                    // Collapsed Usage Indicator (Simple dot or mini-bar)
                    <div className="flex justify-center" title={usageData ? `${usageData.usage}/${usageData.limit} pages` : "Usage"}>
                        <div className="h-1.5 w-8 rounded-full bg-[hsl(var(--background))] overflow-hidden border border-[hsl(var(--border))]">
                            <div
                                className="h-full rounded-full bg-[hsl(var(--primary))] transition-all duration-500"
                                style={{
                                    width: usageData
                                        ? `${Math.min(100, (usageData.usage / usageData.limit) * 100)}%`
                                        : '0%'
                                }}
                            />
                        </div>
                    </div>
                )}

                {/* User Profile Section */}
                <div className={cn("flex items-center gap-2 rounded-lg hover:bg-[hsl(var(--muted))] transition-colors", isCollapsed ? "justify-center p-1" : "px-2 py-1.5")}>
                    <UserButton afterSignOutUrl="/" />
                    {!isCollapsed && (
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-xs font-medium truncate text-[hsl(var(--foreground))]">
                                {user?.fullName || user?.firstName || "User"}
                            </span>
                            <span className="text-[10px] text-[hsl(var(--muted-foreground))] truncate">
                                {user?.primaryEmailAddress?.emailAddress}
                            </span>
                        </div>
                    )}
                </div>
            </div>
        </div >
    );
};
