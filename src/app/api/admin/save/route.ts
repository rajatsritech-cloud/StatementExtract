import { promises as fs } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { Octokit } from "@octokit/rest";
import { verifyAdminFromToken } from "@/lib/auth";

const GITHUB_OWNER = process.env.GH_OWNER;
const GITHUB_REPO = process.env.GH_REPO;
const GITHUB_TOKEN = process.env.GH_TOKEN;
const DEFAULT_BRANCH = process.env.GH_BRANCH || "main";
const MOCK_GITHUB = process.env.MOCK_GITHUB === "true";
const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function POST(req: Request) {
  const authHeader = req.headers.get("authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  const user = await verifyAdminFromToken(token);
  if (!user || !user.isAdmin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { slug, frontmatter, content, commitMessage, createPR } = await req.json();

  if (!slug || !content) {
    return NextResponse.json({ error: "missing fields" }, { status: 400 });
  }

  const shouldMock = MOCK_GITHUB || process.env.NODE_ENV !== "production" || !GITHUB_TOKEN;
  const postFileName = `${slug}.mdx`;
  const repoFilePath = `content/posts/${postFileName}`;
  const frontmatterString = Object.entries(frontmatter || {})
    .map(([k, v]) => `${k}: "${String(v).replace(/"/g, '\\"')}"`)
    .join("\n");
  const fileContent = `---\n${frontmatterString}\n---\n\n${content}`;

  if (shouldMock) {
    console.log("[admin/save] Mock mode active - writing to local filesystem", {
      slug,
      createPR,
    });

    const absolutePath = path.join(POSTS_DIR, postFileName);
    await fs.mkdir(POSTS_DIR, { recursive: true });
    await fs.writeFile(absolutePath, fileContent, "utf8");

    return NextResponse.json({
      ok: true,
      mock: true,
      path: path.relative(process.cwd(), absolutePath),
    });
  }

  if (!GITHUB_OWNER || !GITHUB_REPO) {
    return NextResponse.json({ error: "server_not_configured" }, { status: 500 });
  }

  const octokit = new Octokit({ auth: GITHUB_TOKEN });
  const encoded = Buffer.from(fileContent, "utf8").toString("base64");

  try {
    let sha: string | undefined;
    try {
      const { data: existing } = await octokit.repos.getContent({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: repoFilePath,
        ref: DEFAULT_BRANCH,
      });

      if (!Array.isArray(existing) && "sha" in existing) {
        sha = existing.sha;
      }
    } catch (err: any) {
      if (err.status !== 404) {
        throw err;
      }
    }

    if (createPR) {
      const branchName = `blog/${slug}-${Date.now()}`;
      const { data: refData } = await octokit.git.getRef({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: `heads/${DEFAULT_BRANCH}`,
      });
      const baseSha = refData.object.sha;

      await octokit.git.createRef({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        ref: `refs/heads/${branchName}`,
        sha: baseSha,
      });

      await octokit.repos.createOrUpdateFileContents({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        path: repoFilePath,
        message: commitMessage || `Add/Update blog: ${slug}`,
        content: encoded,
        branch: branchName,
      });

      const { data: pr } = await octokit.pulls.create({
        owner: GITHUB_OWNER,
        repo: GITHUB_REPO,
        head: branchName,
        base: DEFAULT_BRANCH,
        title: `Add blog: ${frontmatter?.title || slug}`,
        body: `Automated PR to add/update blog: ${slug}`,
      });

      return NextResponse.json({ ok: true, prUrl: pr.html_url });
    }

    const res = await octokit.repos.createOrUpdateFileContents({
      owner: GITHUB_OWNER,
      repo: GITHUB_REPO,
      path: repoFilePath,
      message: commitMessage || `Add/Update blog: ${slug}`,
      content: encoded,
      branch: DEFAULT_BRANCH,
      sha,
    });

    return NextResponse.json({ ok: true, commit: res.data.commit.html_url });
  } catch (err) {
    console.error("GitHub commit error", err);
    return NextResponse.json({ error: "commit_failed", details: String(err) }, { status: 500 });
  }
}
