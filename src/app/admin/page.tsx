import { Metadata } from "next";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { AdminEditor } from "@/components/AdminEditor";
import { isAdminEmail } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Admin Blog Editor | Statement Extract",
};

export default async function AdminPage() {
  const user = await currentUser();
  const email = user?.emailAddresses?.[0]?.emailAddress;

  if (!isAdminEmail(email)) {
    redirect("/");
  }

  return (
    <div className="mx-auto max-w-5xl space-y-10 px-6 py-12">
      <header className="space-y-3">
        <h1 className="text-3xl font-bold text-[hsl(var(--foreground))]">Blog Admin</h1>
        <p className="text-sm text-[hsl(var(--muted-foreground))]">
          Create or edit MDX blog posts. Content is saved directly to GitHub with an option to open a pull request for review.
        </p>
      </header>
      <AdminEditor />
    </div>
  );
}
