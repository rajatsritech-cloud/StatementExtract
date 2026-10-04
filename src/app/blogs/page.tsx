import { Metadata } from "next";
import { getAllPosts } from "@/lib/blogs";
import { BlogsPageClient } from "@/components/blogs/BlogsPageClient";

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

  return <BlogsPageClient posts={posts} />;
}

