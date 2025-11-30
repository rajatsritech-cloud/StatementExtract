import { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { getAllPostSlugs, getPostBySlug } from "@/lib/blogs";
import Link from "next/link";
import LazyTweet from "@/components/LazyTweet";
import { BlogNewsletterSignup } from "@/components/BlogNewsletterSignup";
import { BlogInlineCTA } from "@/components/BlogInlineCTA";
import styles from "./page.module.css";

// Disable ISR (Incremental Static Regeneration)
// We want strict SSG (Static Site Generation) to avoid Cloudflare Worker limits.
// Content updates will require a site rebuild.
export const dynamicParams = false; // 404 if slug not found in generateStaticParams

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
      type: "article",
      siteName: "Statement Extractor",
      url: `/blogs/${slug}`,
      publishedTime: post.date || undefined,
      tags: post.tags && post.tags.length > 0 ? post.tags : undefined,
      images: post.coverImage
        ? [post.coverImage]
        : ["/assets/StatementExtract_Workflow_img.png"],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.summary || undefined,
      images: post.coverImage
        ? [post.coverImage]
        : ["/assets/StatementExtract_Workflow_img.png"],
    },
    alternates: {
      canonical: `/blogs/${slug}`,
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

const YOUTUBE_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/;

const TWITTER_REGEX =
  /^(?:https?:\/\/)?(?:www\.)?(?:twitter\.com|x\.com)\/[^/]+\/status\/(\d+)/;

const extractHeadings = (content: string): Heading[] => {
  const headingRegex = /^(#{1,3})\s+(.+)$/gm;
  const headings: Heading[] = [];
  let match: RegExpExecArray | null;

  while ((match = headingRegex.exec(content)) !== null) {
    const level = match[1].length;

    // Only include level-2 headings (##) in the table of contents
    if (level !== 2) {
      continue;
    }

    const text = match[2].trim();
    const id = slugifyHeading(text);
    headings.push({ id, text, level });
  }

  return headings;
};

/**
 * Preprocess markdown/html content to normalize embeds:
 * - Convert Twitter blockquote+script => plain tweet URL on its own line
 * - Convert Youtube <iframe src="/embed/ID"> => https://www.youtube.com/watch?v=ID
 * - Convert youtu.be iframe srcs as well
 */
function preprocessContentForEmbeds(raw: string) {
  let s = String(raw);

  // ONLY grab the <a href="..."> that contains "/status/" to avoid t.co/internal links
  s = s.replace(
    /<blockquote[^>]*class=["']?[^"'>]*twitter-tweet[^"'>]*["']?[\s\S]*?<a[^>]*href=["']([^"']*\/status\/\d+[^"']*)["'][\s\S]*?<\/blockquote>\s*(?:<script[\s\S]*?<\/script>)?/gi,
    "\n$1\n"
  );

  // youtube iframe => watch url
  s = s.replace(
    /<iframe[^>]*src=["'](?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/([A-Za-z0-9_-]{11})[^"']*["'][\s\S]*?<\/iframe>/gi,
    (_m, id) => `https://www.youtube.com/watch?v=${id}`
  );

  s = s.replace(
    /<iframe[^>]*src=["'](?:https?:\/\/)?youtu\.be\/([A-Za-z0-9_-]{11})[^"']*["'][\s\S]*?<\/iframe>/gi,
    (_m, id) => `https://www.youtube.com/watch?v=${id}`
  );

  return s;
}


/**
 * Helper to extract a URL string from a React child that may be:
 * - a plain string
 * - an <a href="...">...</a> element
 * - a nested element containing a string child
 */
function extractUrlFromChild(onlyChild: any): string | undefined {
  if (!onlyChild) return undefined;

  // plain string
  if (typeof onlyChild === "string") {
    const text = onlyChild.trim();
    // treat lone URLs only
    if (text.startsWith("http://") || text.startsWith("https://")) return text;
    return undefined;
  }

  // element with href prop (anchor)
  if (React.isValidElement(onlyChild)) {
    const element =
      onlyChild as React.ReactElement<{ href?: string; children?: React.ReactNode }>;
    const { href, children: elementChildren } = element.props ?? {};
    if (
      typeof href === "string" &&
      (href.startsWith("http://") || href.startsWith("https://"))
    ) {
      return href.trim();
    }

    // children might be string or nested array — try to find a string URL inside
    const childArray = React.Children.toArray(elementChildren ?? []);
    for (const c of childArray) {
      if (typeof c === "string") {
        const t = c.trim();
        if (t.startsWith("http://") || t.startsWith("https://")) return t;
      } else if (React.isValidElement(c)) {
        const childElement =
          c as React.ReactElement<{ href?: string; children?: React.ReactNode }>;
        const href = childElement.props.href;
        if (
          typeof href === "string" &&
          (href.startsWith("http://") || href.startsWith("https://"))
        ) {
          return href.trim();
        }
      }
    }
  }

  return undefined;
}

const markdownComponents = {
  blockquote: ({ children, ...props }: any) => {
    return (
      <blockquote
        className="my-4 rounded border-l-4 border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 text-sm"
        {...props}
      >
        {children}
      </blockquote>
    );
  },
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
  p: ({ children, ...props }: any) => {
    const childArray = React.Children.toArray(children);

    // Flatten simple text children to detect inline CTA phrase
    const textContent = childArray
      .map((child: any) => {
        if (typeof child === "string") return child;
        if (React.isValidElement(child)) {
          const element = child as React.ReactElement<{ children?: React.ReactNode }>;
          const { children: elementChildren } = element.props ?? {};
          if (typeof elementChildren === "string") {
            return elementChildren;
          }
        }
        return "";
      })
      .join(" ")
      .trim();

    const hasInlineCTA = textContent.includes("Try StatementExtract for Free Today");

    if (childArray.length === 1) {
      const onlyChild: any = childArray[0];

      let url: string | undefined;

      // improved extraction (handles <a href="...">, nested anchor or plain url string)
      url = extractUrlFromChild(onlyChild);

      if (url) {
        const ytMatch = url.match(YOUTUBE_REGEX);
        if (ytMatch) {
          const videoId = ytMatch[1];
          const embedUrl = `https://www.youtube.com/embed/${videoId}`;

          return (
            <div style={{ aspectRatio: "16/9", width: "100%", overflow: "hidden", borderRadius: 12 }}>
              <iframe
                src={embedUrl}
                title="YouTube video"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                style={{ width: "100%", height: "100%", border: 0, display: "block" }}
              />
            </div>
          );
        }

        const twitterMatch = url.match(TWITTER_REGEX);
        if (twitterMatch) {
          const tweetId = twitterMatch[1];
          return (
            <div className="my-6 w-full" data-tweet-id={tweetId}>
              <LazyTweet id={tweetId} />
            </div>
          );
        }
      }
    }

    const paragraph = (
      <p
        className="mt-4 leading-7 text-[hsl(152deg_12.04%_17.8%)]"
        {...props}
      >
        {children}
      </p>
    );

    if (hasInlineCTA) {
      return (
        <>
          {paragraph}
          <div className="mt-6">
            <BlogInlineCTA />
          </div>
        </>
      );
    }

    return paragraph;
  },

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
  a: ({ href, children, ...props }: any) => (
    <a
      href={href}
      className="text-[hsl(var(--primary))] underline decoration-[hsl(var(--primary))]/40 underline-offset-4 hover:text-[hsl(var(--primary-light))]"
      {...props}
    >
      {children}
    </a>
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
  table: ({ className, ...props }: any) => (
    <div className="mt-4 w-full overflow-x-auto">
      <table
        className={`min-w-full text-sm ${className ?? ""}`}
        {...props}
      />
    </div>
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

  // preprocess content to normalize embeds (twitter blockquote -> url, youtube iframe -> watch URL)
  const processedContent = preprocessContentForEmbeds(content);

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
      <section className={`${styles['blog-light-theme']} bg-[hsl(var(--background))]`}>
        <div className="mx-auto max-w-6xl px-6 py-12 lg:py-16 lg:grid lg:grid-cols-[minmax(0,260px)_minmax(0,1fr)] lg:gap-10 animate-slide-up">
          <aside className="mb-10 self-start lg:mb-0 lg:sticky lg:top-28">
            <div className="rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-5 shadow-sm">
              <h2 className="text-xs font-semibold tracking-wide text-[hsl(var(--muted-foreground))] uppercase text-left">
                TABLE OF CONTENTS
              </h2>
              <nav
                aria-label="Table of contents"
                className={`mt-4 text-left text-sm lg:max-h-[calc(100vh-10rem)] lg:overflow-y-auto lg:pr-1 ${styles['toc-scroll']}`}
              >
                <div className="lg:hidden">
                  <details className="group rounded-xl border border-[hsl(var(--border))] bg-[hsl(var(--background))]">
                    <summary className="flex cursor-pointer items-center justify-between px-3 py-2 text-xs font-medium text-[hsl(var(--muted-foreground))]">
                      <span>Table of contents</span>
                      <svg
                        aria-hidden="true"
                        className="h-3 w-3 text-[hsl(var(--muted-foreground))] group-open:rotate-90 transition-transform"
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
                    </summary>
                    <div className="border-t border-[hsl(var(--border))] px-3 py-3">
                      {headings.length === 0 && (
                        <p className="text-xs text-[hsl(var(--muted-foreground))]">
                          This article has no section headings yet.
                        </p>
                      )}
                      {headings.length > 0 && (
                        <ul className="mt-2 space-y-2">
                          {headings.map((heading) => (
                            <li key={heading.id} className="group">
                              <a
                                href={`#${heading.id}`}
                                className="flex items-start gap-2 text-[hsl(var(--muted-foreground))] transition-colors hover:text-[hsl(var(--primary))]"
                              >
                                <span className="inline-flex mt-2 h-1.5 w-1.5 rounded-full bg-[hsl(var(--primary))]/60 group-hover:bg-[hsl(var(--primary))]" />
                                <span className="flex-1 text-xs leading-snug">
                                  {heading.text}
                                </span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </details>
                </div>

                <div className="hidden pr-1 lg:block">
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
                </div>
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
              <div className="relative aspect-video w-full overflow-hidden rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--background))] shadow-sm">
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1024px) 100vw, 860px"
                />
              </div>
            )}

            <article className={`${styles['blog-article']} space-y-6 rounded-3xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] px-6 py-8 shadow-sm md:px-10 md:py-10`}>
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {processedContent}
              </ReactMarkdown>
            </article>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl px-6 pb-16">
          <BlogNewsletterSignup />
        </div>
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
