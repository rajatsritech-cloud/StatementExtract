import Link from "next/link";
import { Metadata } from "next";
import { getAllPosts } from "@/lib/blogs";

export const metadata: Metadata = {
  title: "Statement Extract Blog | Product Updates, Guides & Insights",
  description: "Read the latest product news, implementation guides, and industry insights from the Statement Extract team.",
  openGraph: {
    title: "Statement Extract Blog | Product Updates, Guides & Insights",
    description: "Read the latest product news, implementation guides, and industry insights from the Statement Extract team.",
    type: "website",
    images: ["/assets/StatementExtract_Workflow_img.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Statement Extract Blog | Product Updates, Guides & Insights",
    description: "Read the latest product news, implementation guides, and industry insights from the Statement Extract team.",
    images: ["/assets/StatementExtract_Workflow_img.png"],
  },
  alternates: {
    canonical: "/blogs",
  },
};

export const revalidate = 21600;

export default async function BlogsPage() {
  const posts = await getAllPosts();

  return (
    <main className="min-h-screen bg-[hsl(var(--background))]">
      <section className="border-b border-[hsl(var(--border))]">
        <div className="mx-auto flex max-w-5xl flex-col gap-6 px-6 py-20 text-center animate-fade-in">
          <span className="mx-auto inline-flex items-center gap-2 rounded-full border border-[hsl(var(--primary))]/40 bg-[hsl(var(--muted))]/60 px-4 py-2 text-sm font-medium text-[hsl(var(--primary))]">
            Blog & Insights
          </span>
          <h1 className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
            News, tutorials, and stories from the Statement Extract team
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-[hsl(var(--muted-foreground))]">
            Stay up to date with best practices for document automation, release notes, and deep dives into how we power data extraction for world-class finance teams.
          </p>
        </div>
      </section>

      <section className="relative mx-auto max-w-6xl px-6 py-12">
        <div className="pointer-events-none absolute inset-0 z-0 overflow-visible">
          <div className="absolute top-[-8rem] left-[-28rem] h-[42rem] w-[42rem] opacity-30">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#22C55E"
                d="M492.5 130.5C538.5 220 376 348 274.5 492.5C173 637 54.5 455 -1.5 304.5C-57.5 154 36.5 41 199 15.5C361.5 -10 446.5 41 492.5 130.5Z"
              />
            </svg>
          </div>
          <div className="absolute bottom-[-8rem] right-[-28rem] h-[40rem] w-[40rem] opacity-30">
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 500 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="#22C55E"
                d="M375 64.5C406 142 429.5 240 374 330.5C318.5 421 184.5 504.5 90 427.5C-4.5 350.5 -19.5 192.5 40 102.5C99.5 12.5 311 16.5 375 64.5Z"
              />
            </svg>
          </div>
        </div>

        <div className="relative z-10 grid gap-6 md:grid-cols-2 lg:grid-cols-2 animate-slide-up">
          {posts.length === 0 && (
            <p className="col-span-full text-center text-sm text-[hsl(var(--muted-foreground))]">
              No blog posts found. Create one from the admin dashboard to get started.
            </p>
          )}

          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blogs/${post.slug}`}
              className="group block h-full overflow-hidden rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
            >
              <article className="flex h-full flex-col justify-between">
                <div className="overflow-hidden rounded-xl border border-primary/50 bg-[hsl(var(--background))] shadow-glow transition-all duration-200">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {post.coverImage ? (
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02]"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">
                      No cover image
                    </div>
                  )}
                </div>
                <div className="px-5 pb-5 pt-4">
                  {post.tags.length > 0 && (
                    <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[hsl(var(--primary))]">
                      {post.tags[0]}
                    </div>
                  )}
                  <h2 className="text-2xl font-semibold text-[hsl(var(--foreground))] transition-colors group-hover:text-[hsl(var(--primary))]">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-[hsl(var(--muted-foreground))]">{post.summary}</p>
                </div>
                <div className="flex items-center justify-between px-5 pb-4 pt-1 text-xs text-[hsl(var(--muted-foreground))]">
                  <span>{post.date}</span>
                  <span className="inline-flex items-center gap-1 text-[hsl(var(--primary))] group-hover:text-[hsl(var(--primary-light))]">
                    Read more
                    <svg
                      className="h-3 w-3 transition-transform group-hover:translate-x-1"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14" />
                      <path d="m12 5 7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
