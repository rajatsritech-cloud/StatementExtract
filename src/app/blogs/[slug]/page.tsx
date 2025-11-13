import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blogs";
import Link from "next/link";

export const dynamic = "force-dynamic";

interface PageParams {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: PageParams): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) {
    return {
      title: "Blog post not found",
    };
  }

  return {
    title: `${post.title} | Statement Extract Blog`,
    description: post.summary || undefined,
    openGraph: {
      title: post.title,
      description: post.summary || undefined,
      images: post.coverImage ? [post.coverImage] : undefined,
    },
  };
}

const markdownComponents = {
  h1: (props: any) => <h1 className="mt-8 text-3xl font-bold text-[hsl(var(--foreground))]" {...props} />,
  h2: (props: any) => <h2 className="mt-8 text-2xl font-semibold text-[hsl(var(--foreground))]" {...props} />,
  h3: (props: any) => <h3 className="mt-6 text-xl font-semibold text-[hsl(var(--foreground))]" {...props} />,
  p: (props: any) => <p className="mt-4 leading-7 text-[hsl(var(--muted-foreground))]" {...props} />,
  ul: (props: any) => <ul className="mt-4 list-disc space-y-2 pl-5 text-[hsl(var(--muted-foreground))]" {...props} />,
  ol: (props: any) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-[hsl(var(--muted-foreground))]" {...props} />,
  li: (props: any) => <li className="leading-7" {...props} />,
  a: (props: any) => (
    <a
      className="text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary))]/40 underline-offset-4 hover:text-[hsl(var(--primary-light))]"
      {...props}
    />
  ),
  code: (props: any) => (
    <code className="rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-sm text-[hsl(var(--foreground))]" {...props} />
  ),
  pre: (props: any) => (
    <pre
      className="mt-6 overflow-x-auto rounded-lg bg-[hsl(var(--muted))] p-4 text-sm text-[hsl(var(--foreground))]"
      {...props}
    />
  ),
};

export default async function BlogPostPage({ params }: PageParams) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, summary, date, tags, coverImage, content } = post;

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      <section className="border-b border-[hsl(var(--border))] bg-[hsl(var(--card))]">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-4 px-6 py-16 text-center">
          <nav className="text-sm text-[hsl(var(--muted-foreground))]">
            <Link href="/blogs" className="hover:text-slate-700">
              Blogs
            </Link>
            <span className="mx-2">›</span>
            <span className="font-medium text-[hsl(var(--foreground))] opacity-80">{title}</span>
          </nav>
          <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
            {title}
          </h1>
          {(date || tags.length > 0) && (
            <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-[hsl(var(--muted-foreground))]">
              {date && <span>{date}</span>}
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-[hsl(var(--muted))] px-3 py-1 text-[hsl(var(--muted-foreground))]">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {summary && (
        <section className="mx-auto max-w-3xl px-6 py-10 text-center">
          <p className="text-base text-[hsl(var(--muted-foreground))] md:text-lg">
            {summary}
          </p>
        </section>
      )}

      {coverImage && (
        <div className="mx-auto max-w-3xl px-6">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={coverImage}
            alt={title}
            className="h-auto w-full rounded-2xl border border-[hsl(var(--border))] object-cover shadow-sm"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-6 py-16">
        <article className="space-y-6 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-10 shadow-sm">
          <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
        </article>
      </div>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
