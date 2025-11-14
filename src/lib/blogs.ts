import { Octokit } from "@octokit/rest";

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

let octokit: Octokit | null = null;

const getOctokit = () => {
  if (!octokit) {
    const auth = process.env.GH_TOKEN;
    octokit = new Octokit(auth ? { auth } : {});
  }
  return octokit;
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
  if (!isGitHubConfigured()) {
    return [];
  }

  let files: string[] = [];
  try {
    const client = getOctokit();
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
    console.error("Failed to list blog posts from GitHub", error);
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
  if (!isGitHubConfigured()) {
    return [];
  }

  const posts = await getAllPosts();
  return posts.map((post) => post.slug);
}

async function readPostFile(slug: string) {
  if (!isGitHubConfigured()) {
    return null;
  }

  try {
    const client = getOctokit();
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
    console.error(`Failed to fetch blog post ${slug} from GitHub`, error);
    return null;
  }
}
