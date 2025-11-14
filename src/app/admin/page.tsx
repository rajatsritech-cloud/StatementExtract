import type { Metadata } from "next";
import { AdminPageClient } from "./AdminPageClient";

export const metadata: Metadata = {
  title: "Admin Blog Editor | Statement Extract",
};

export default function AdminPage() {
  return <AdminPageClient />;
}
