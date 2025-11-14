'use client';

import { useUser } from '@clerk/nextjs';
import { AdminEditor } from '@/components/AdminEditor';
import { isAdminEmail } from '@/lib/auth';

export function AdminPageClient() {
  const { user, isLoaded, isSignedIn } = useUser();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const isAdmin = isAdminEmail(email);

  if (!isLoaded) {
    return <div className="mx-auto max-w-5xl px-6 py-12">Loading...</div>;
  }

  if (!isSignedIn || !isAdmin) {
    return (
      <div className="mx-auto max-w-5xl px-6 py-12">
        <p className="text-sm text-[hsl(var(--muted-foreground))]">You must be an admin to access this page.</p>
      </div>
    );
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
