"use client";

import { useState, useCallback } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { AdminEditor } from "@/components/AdminEditor";
import { isAdminEmail } from "@/lib/auth";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function AdminPageClient() {
  const { user, isLoaded, isSignedIn } = useUser();
  const { getToken } = useAuth();
  const email = user?.primaryEmailAddress?.emailAddress ?? null;
  const isAdmin = isAdminEmail(email);

  const [searchValue, setSearchValue] = useState("");
  const [loadingPost, setLoadingPost] = useState(false);
  const [initialData, setInitialData] = useState<{
    slug?: string;
    title?: string;
    summary?: string;
    coverImage?: string;
    tags?: string[];
    content?: string;
  } | null>(null);

  const extractSlug = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return "";

    // If it's a full URL, take the last path segment
    if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
      try {
        const url = new URL(trimmed);
        const parts = url.pathname.split("/").filter(Boolean);
        return parts[parts.length - 1] || "";
      } catch {
        return trimmed;
      }
    }

    // Otherwise assume it's already a slug
    return trimmed.replace(/^\/+|\/+$/g, "");
  };

  const handleLoadPost = useCallback(async () => {
    const slug = extractSlug(searchValue);
    if (!slug) {
      toast.error("Please enter a blog URL or slug");
      return;
    }

    setLoadingPost(true);
    try {
      const token = await getToken();
      const res = await fetch(`/api/admin/post?slug=${encodeURIComponent(slug)}`, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
      });

      const json = await res.json();

      if (!res.ok || !json.ok) {
        throw new Error(json.error || "Failed to load post");
      }

      const post = json.post as {
        slug: string;
        title: string;
        summary: string;
        date: string;
        coverImage?: string;
        tags: string[];
        content: string;
      };

      setInitialData(post);
      toast.success(`Loaded post: ${post.title}`);
    } catch (error: any) {
      console.error("Failed to load post", error);
      toast.error(error.message ?? "Failed to load post");
    } finally {
      setLoadingPost(false);
    }
  }, [getToken, searchValue]);

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
      <section className="flex flex-col gap-3 rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-4 shadow-sm md:flex-row md:items-center md:justify-between">
        <div className="flex-1 space-y-1">
          <p className="text-sm font-medium text-[hsl(var(--foreground))]">Edit existing blog</p>
          <p className="text-xs text-[hsl(var(--muted-foreground))]">
            Paste a blog URL (e.g. https://statementextract.com/blogs/my-post) or slug (my-post) to load it into the editor.
          </p>
        </div>
        <div className="mt-3 flex w-full flex-col gap-2 md:mt-0 md:w-auto md:flex-row">
          <Input
            placeholder="Blog URL or slug"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
          />
          <Button onClick={handleLoadPost} disabled={loadingPost}>
            {loadingPost ? "Loading…" : "Load"}
          </Button>
        </div>
      </section>
      <AdminEditor
        key={initialData?.slug || "__new__"}
        initialTitle={initialData?.title}
        initialSlug={initialData?.slug}
        initialSummary={initialData?.summary}
        initialCoverImage={initialData?.coverImage}
        initialTags={initialData?.tags}
        initialContent={initialData?.content}
      />
    </div>
  );
}
