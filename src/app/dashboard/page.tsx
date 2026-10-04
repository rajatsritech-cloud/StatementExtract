import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { DashboardContent } from "@/components/dashboard/DashboardContent";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Dashboard | Statement Extract",
    description: "Manage your documents and extractions.",
};

export default function DashboardPage() {
    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden">
                <DashboardSidebar className="hidden md:flex" />
                <DashboardContent />
            </div>
        </ProtectedRoute>
    );
}
