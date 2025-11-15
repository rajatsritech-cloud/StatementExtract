import { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blogs";
import Link from "next/link";
import "./page.module.css";

export const revalidate = 300;

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
const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");

type Heading = {
  id: string;
  text: string;
  level: number;
};

const extractHeadings = (content: string): Heading[] => {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;
    const text = match[2].trim();
    const id = slugifyHeading(text);
    headings.push({ id, text, level });
  }

  return headings;
};

const markdownComponents = {
  h1: ({ children, ...props }: any) => {
    const text = String(children);
    const id = slugifyHeading(text);
    return (
      <h1
        id={id}
        className="mt-8 scroll-mt-28 text-3xl font-semibold text-[hsl(var(--foreground))]"
        {...props}
      >
        {children}
      </h1>
    );
  },
  h2: ({ children, ...props }: any) => {
    const text = String(children);
    const id = slugifyHeading(text);
    return (
      <h2
        id={id}
        className="mt-8 scroll-mt-28 text-2xl font-semibold text-[hsl(var(--foreground))]"
        {...props}
      >
        {children}
      </h2>
    );
  },
  h3: ({ children, ...props }: any) => {
    const text = String(children);
    const id = slugifyHeading(text);
    return (
      <h3
        id={id}
        className="mt-6 scroll-mt-28 text-xl font-medium text-[hsl(var(--foreground))]"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: (props: any) => (
    <p
      className="mt-4 leading-7 text-[hsl(152deg_12.04%_17.8%)]"
      {...props}
    />
  ),
  ul: (props: any) => (
    <ul
      className="mt-4 list-disc space-y-2 pl-5 text-[hsl(152deg_12.04%_17.8%)]"
      {...props}
    />
  ),
  ol: (props: any) => (
    <ol
      className="mt-4 list-decimal space-y-2 pl-5 text-[hsl(152deg_12.04%_17.8%)]"
      {...props}
    />
  ),
  li: (props: any) => <li className="leading-7" {...props} />,
  a: (props: any) => (
    <a
      className="text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary))]/40 underline-offset-4 hover:text-[hsl(var(--primary-light))]"
      {...props}
    />
  ),
  code: (props: any) => (
    <code
      className="rounded bg-[hsl(var(--muted))] px-1 py-0.5 text-sm text-[hsl(var(--foreground))]"
      {...props}
    />
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
  const headings = extractHeadings(content);

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto flex max-w-4xl flex-col gap-5 px-6 py-14 text-left animate-fade-in md:py-16">
          <nav className="flex items-center gap-2 text-xs font-medium text-[hsl(var(--muted-foreground))]">
            <Link
              href="/blogs"
              className="transition-colors hover:text-[hsl(var(--primary))]"
            >
              Blogs
            </Link>
            <span className="text-[hsl(var(--border))]">/</span>
            <span className="truncate text-[hsl(var(--muted-foreground))]">
              {title}
            </span>
          </nav>

          <div className="space-y-4">
            <h1 className="text-3xl font-semibold tracking-tight text-[hsl(var(--foreground))] md:text-4xl lg:text-5xl">
              {title}
            </h1>

            {(date || tags.length > 0) && (
              <div className="flex flex-wrap items-center gap-3 text-xs md:text-sm text-[hsl(var(--muted-foreground))]">
                {date && (
                  <span className="inline-flex items-center rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--background))] px-3 py-1">
                    {date}
                  </span>
                )}
                {tags.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wide text-[hsl(var(--primary))]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
      <section className="blog-light-theme bg-[hsl(var(--background))]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16 lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10 animate-slide-up">
          <aside className="mb-10 self-start lg:mb-0 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm">
              <h2 className="text-xs font-semibold tracking-wide text-[hsl(var(--muted-foreground))] uppercase text-left">
                TABLE OF CONTENTS
              </h2>
              <nav
                aria-label="Table of contents"
                className="mt-4 pr-1 text-left text-sm"
              >
                {headings.length === 0 && (
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">
                    This article has no section headings yet.
                  </p>
                )}
                {headings.length > 0 && (
                  <ul className="space-y-2">
                    {headings.map((heading) => (
                      <li key={heading.id} className="group">
                        <a
                          href={`#${heading.id}`}
                          className="flex items-start gap-2 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                        >
                          <span className="inline-flex mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]/60 group-hover:bg-[hsl(var(--primary))]" />
                          <span className="flex-1 text-xs md:text-sm leading-snug">
                            {heading.text}
                          </span>
                          <svg
                            aria-hidden="true"
                            className="hidden h-3 w-3 text-[hsl(var(--muted-foreground))] group-hover:text-[hsl(var(--primary))] sm:block"
                            viewBox="0 0 16 16"
                            fill="none"
                          >
                            <path
                              d="M5 3.5L10 8L5 12.5"
                              stroke="currentColor"
                              strokeWidth="1.4"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </nav>
            </div>
          </aside>

          <div className="space-y-10">
          {summary && (
            <section className="rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-6 text-left text-sm text-[hsl(152deg_12.04%_17.8%)] md:text-base">
              {summary}
            </section>
          )}

          {coverImage && (
            <div className="overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt={title}
                className="h-auto w-full object-cover"
              />
            </div>
          )}

          <article className="blog-article space-y-6 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-8 shadow-sm md:px-10 md:py-10">
            <ReactMarkdown components={markdownComponents}>{content}</ReactMarkdown>
          </article>
        </div>
      </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
