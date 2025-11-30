import Link from "next/link";
import { getAllPosts } from "@/lib/blogs";

export async function RecentBlogs() {
    const allPosts = await getAllPosts();
    const recentPosts = allPosts.slice(0, 3);

    if (recentPosts.length === 0) {
        return null;
    }

    return (
        <section className="bg-[hsl(var(--background))] py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-[hsl(var(--foreground))] sm:text-4xl">
                        Latest Articles & Guides
                    </h2>
                    <p className="mt-2 text-lg leading-8 text-[hsl(var(--muted-foreground))]">
                        Learn more about bank statement extraction, financial automation, and industry best practices.
                    </p>
                </div>
                <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                    {recentPosts.map((post) => (
                        <Link
                            key={post.slug}
                            href={`/blogs/${post.slug}`}
                            className="group flex flex-col items-start justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow"
                        >
                            <div className="relative w-full">
                                <div className="aspect-[16/9] w-full rounded-2xl bg-[hsl(var(--muted))] sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {post.coverImage ? (
                                        <img
                                            src={post.coverImage}
                                            alt={post.title}
                                            className="absolute inset-0 h-full w-full object-fill transition-transform duration-200 group-hover:scale-[1.02]"
                                        />
                                    ) : (
                                        <div className="flex h-full w-full items-center justify-center text-xs text-[hsl(var(--muted-foreground))]">
                                            No cover image
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="max-w-xl">
                                <div className="mt-8 flex items-center gap-x-4 text-xs">
                                    <time dateTime={post.date} className="text-[hsl(var(--muted-foreground))]">
                                        {post.date}
                                    </time>
                                    {post.tags.length > 0 && (
                                        <div className="relative z-10 rounded-full bg-[hsl(var(--primary))]/10 px-3 py-1.5 font-medium text-[hsl(var(--primary))]">
                                            {post.tags[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--primary))]">
                                        <span className="absolute inset-0" />
                                        {post.title}
                                    </h3>
                                    <p className="mt-5 line-clamp-3 text-sm leading-6 text-[hsl(var(--muted-foreground))]">
                                        {post.summary}
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
                <div className="mt-10 flex justify-center">
                    <Link
                        href="/blogs"
                        className="text-sm font-semibold leading-6 text-[hsl(var(--primary))] hover:text-[hsl(var(--primary-light))]"
                    >
                        View all posts <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
