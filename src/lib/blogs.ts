import { Octokit } from "@octokit/rest";
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

const GH_OWNER = process.env.GH_OWNER;
const GH_REPO = process.env.GH_REPO;
const GH_BRANCH = process.env.GH_BRANCH || "main";
const POSTS_DIR = "content/posts";

// In local development we want to read directly from the filesystem
// instead of going through GitHub. In production (Cloudflare) we
// continue to use GitHub as the single source of truth.
const USE_LOCAL_FILES = process.env.NODE_ENV !== "production";

const createOctokit = () => {
  const auth = process.env.GH_TOKEN;
  return new Octokit(auth ? { auth } : {});
};

const decodeBase64 = (input: string) => {
  if (typeof Buffer !== "undefined") {
    return Buffer.from(input, "base64").toString("utf8");
  }

  if (typeof atob === "function") {
    const binary = atob(input);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  throw new Error("No base64 decoder available in this environment");
};

const isGitHubConfigured = () => {
  if (!GH_OWNER || !GH_REPO) {
    console.warn("GitHub repository details are not configured. Set GH_OWNER and GH_REPO env vars.");
    return false;
  }
  return true;
};

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
  // Try reading from local filesystem first (works for build if content is present)
  const postsDir = path.join(process.cwd(), POSTS_DIR);
  let localFiles: string[] = [];
  try {
    const entries = await fs.readdir(postsDir, { withFileTypes: true });
    localFiles = entries
      .filter((entry) => entry.isFile() && entry.name.endsWith(".mdx"))
      .map((entry) => entry.name);
  } catch (e) {
    // Local dir might not exist in some envs, ignore
  }

  if (localFiles.length > 0) {
    console.log(`Found ${localFiles.length} local posts, using filesystem.`);
    const posts = await Promise.all(
      localFiles.map(async (file) => {
        const slug = file.replace(/\.mdx$/, "");
        const raw = await readLocalPostFile(slug);
        if (!raw) return null;
        const { frontmatter } = parseFrontmatter(raw);
        return mapToMeta(slug, frontmatter);
      })
    );
    return posts
      .filter((post): post is BlogPostMeta => Boolean(post))
      .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  }

  // Fallback to GitHub if no local files found
  if (!isGitHubConfigured()) {
    return [];
  }

  let files: string[] = [];
  try {
    const client = createOctokit();
    const { data } = await client.repos.getContent({
      owner: GH_OWNER!,
      repo: GH_REPO!,
      path: POSTS_DIR,
      ref: GH_BRANCH,
    });

    if (!Array.isArray(data)) {
      return [];
    }

    files = data
      .filter((item) => item.type === "file" && item.name.endsWith(".mdx"))
      .map((item) => item.name);
  } catch (error) {
    console.warn(
      "Failed to list blog posts from GitHub (returning empty list to allow build)",
      error instanceof Error ? error.message : String(error)
    );
    return [];
  }

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = await readPostFile(slug);
      if (!raw) {
        return null;
      }
      const { frontmatter } = parseFrontmatter(raw);
      return mapToMeta(slug, frontmatter);
    }),
  );

  return posts
    .filter((post): post is BlogPostMeta => Boolean(post))
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""));
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  // Try local first
  let raw = await readLocalPostFile(slug);

  // If not found locally and GitHub is configured, try GitHub
  if (!raw && isGitHubConfigured()) {
    raw = await readPostFile(slug);
  }

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

async function readPostFile(slug: string) {
  // GitHub-backed read; only used in production.
  if (!isGitHubConfigured()) {
    return null;
  }

  try {
    const client = createOctokit();
    const { data } = await client.repos.getContent({
      owner: GH_OWNER!,
      repo: GH_REPO!,
      path: `${POSTS_DIR}/${slug}.mdx`,
      ref: GH_BRANCH,
    });

    if (Array.isArray(data) || !("content" in data)) {
      return null;
    }

    if (data.encoding !== "base64" || typeof data.content !== "string") {
      return null;
    }

    return decodeBase64(data.content);
  } catch (error: any) {
    if (error.status === 404) {
      return null;
    }
    console.error(
      `Failed to fetch blog post ${slug} from GitHub`,
      JSON.stringify(
        {
          owner: GH_OWNER,
          repo: GH_REPO,
          branch: GH_BRANCH,
          slug,
          message: error instanceof Error ? error.message : String(error),
          status: error?.status,
          response: error?.response?.data,
        },
        null,
        2,
      ),
    );
    return null;
  }
}

async function readLocalPostFile(slug: string) {
  const filePath = path.join(process.cwd(), POSTS_DIR, `${slug}.mdx`);

  try {
    const content = await fs.readFile(filePath, "utf8");
    return content;
  } catch (error: any) {
    if (error?.code === "ENOENT") {
      return null;
    }

    console.error(
      `Failed to read local blog post ${slug}`,
      JSON.stringify(
        {
          filePath,
          message: error instanceof Error ? error.message : String(error),
        },
        null,
        2,
      ),
    );
    return null;
  }
}
