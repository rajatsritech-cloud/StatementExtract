import { promises as fs } from "fs";
import path from "path";

export interface BlogPostMeta {
  slug: string;
  title: string;
  summary: string;
  date: string;
  coverImage?: string;
  tags: string[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function parseFrontmatter(raw: string) {
  const match = raw.match(/^---\s*\n([\s\S]*?)\n---\s*/);
  if (!match) {
    return { frontmatter: {}, body: raw } as {
      frontmatter: Record<string, string>;
      body: string;
    };
  }

  const [block, frontmatterContent] = [match[0], match[1]];
  const lines = frontmatterContent.split(/\r?\n/);
  const frontmatter: Record<string, string> = {};

  for (const line of lines) {
    const [key, ...rest] = line.split(":");
    if (!key || !rest.length) {
      continue;
    }
    const value = rest.join(":").trim().replace(/^"|"$/g, "");
    frontmatter[key.trim()] = value;
  }

  const body = raw.slice(block.length);
  return { frontmatter, body };
}

async function readPostFile(slug: string) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return null;
    }
    throw error;
  }
}

function mapToMeta(slug: string, frontmatter: Record<string, string>): BlogPostMeta {
  const tags = frontmatter.tags
    ? frontmatter.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
    : [];

  return {
    slug,
    title: frontmatter.title || slug,
    summary: frontmatter.summary || "",
    date: frontmatter.date || "",
    coverImage: frontmatter.coverImage,
    tags,
  };
}

export async function getAllPosts(): Promise<BlogPostMeta[]> {
  let files: string[] = [];
  try {
    files = await fs.readdir(POSTS_DIR);
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const posts = await Promise.all(
    files
      .filter((file) => file.endsWith(".mdx"))
      .map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await readPostFile(slug);
        if (!raw) {
          return null;
        }
        const { frontmatter } = parseFrontmatter(raw);
        return mapToMeta(slug, frontmatter);
      })
  );

  return posts
    .filter((post): post is BlogPostMeta => Boolean(post))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  const raw = await readPostFile(slug);
  if (!raw) {
    return null;
  }

  const { frontmatter, body } = parseFrontmatter(raw);
  const meta = mapToMeta(slug, frontmatter);

  return {
    ...meta,
    content: body.trim(),
  };
}

export async function getAllPostSlugs(): Promise<string[]> {
  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}
