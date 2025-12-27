import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar";
import { InvoiceDashboardContent } from "@/components/dashboard/InvoiceDashboardContent";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Invoices Dashboard | Statement Extract",
    description: "Upload and extract data from invoices.",
};

export default function InvoicesDashboardPage() {
    return (
        <ProtectedRoute>
            <div className="flex h-screen overflow-hidden">
                <DashboardSidebar className="hidden md:flex" />
                <InvoiceDashboardContent />
            </div>
        </ProtectedRoute>
    );
}
