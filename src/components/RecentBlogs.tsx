import Link from "next/link";
import Image from "next/image";
import { getAllPosts } from "@/lib/blogs";

export async function RecentBlogs() {
    const allPosts = await getAllPosts();
    const recentPosts = allPosts.slice(0, 3);

    if (recentPosts.length === 0) {
        return null;
    }

    return (
        <section id="recent-blogs" aria-labelledby="recent-blogs-heading" className="relative bg-[hsl(var(--background))] py-24 sm:py-32 overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Themed Diamond Pattern */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: `repeating-linear-gradient(45deg, rgb(99 102 241 / 0.3) 0, rgb(99 102 241 / 0.3) 1px, transparent 0, transparent 50%), repeating-linear-gradient(-45deg, rgb(99 102 241 / 0.3) 0, rgb(99 102 241 / 0.3) 1px, transparent 0, transparent 50%)`,
                    backgroundSize: '30px 30px'
                }} />
                <div className="absolute top-0 right-1/4 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative mx-auto max-w-7xl px-6 lg:px-8 z-10">
                <div className="mx-auto max-w-2xl text-center">
                    <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-1.5 mb-6">
                        <span className="text-sm font-medium text-indigo-500">
                            Knowledge Hub
                        </span>
                    </div>
                    <h2 id="recent-blogs-heading" className="text-4xl font-bold tracking-tight text-[hsl(var(--foreground))] md:text-5xl">
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
                            className="group flex flex-col items-start justify-between rounded-2xl border border-[hsl(var(--border))] bg-[hsl(var(--card))] p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-indigo-500/50 hover:shadow-lg"
                        >
                            <div className="relative w-full">
                                <div className="aspect-[16/9] w-full rounded-2xl bg-[hsl(var(--muted))] sm:aspect-[2/1] lg:aspect-[3/2] overflow-hidden relative">
                                    {/* eslint-disable-next-line @next/next/no-img-element */}
                                    {post.coverImage ? (
                                        <>
                                            <Image
                                                src={post.coverImage}
                                                alt={post.title}
                                                fill
                                                className="absolute inset-0 h-full w-full object-cover transition-transform duration-200 group-hover:scale-[1.02]"
                                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                            />
                                            {/* AI-Generated Image Disclosure */}
                                            <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 backdrop-blur-sm text-white/80 text-[9px] px-1.5 py-0.5 rounded">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="h-2.5 w-2.5" aria-hidden="true">
                                                    <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                                                </svg>
                                                <span>By Statement Extract</span>
                                            </div>
                                        </>
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
                                        <div className="relative z-10 rounded-full bg-indigo-500/10 px-3 py-1.5 font-medium text-indigo-500">
                                            {post.tags[0]}
                                        </div>
                                    )}
                                </div>
                                <div className="group relative">
                                    <h3 className="mt-3 text-lg font-semibold leading-6 text-[hsl(var(--foreground))] group-hover:text-indigo-500 transition-colors">
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
                        className="text-sm font-semibold leading-6 text-indigo-500 hover:text-indigo-600 transition-colors"
                    >
                        View all posts <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </section>
    );
}
