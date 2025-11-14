import { beforeEach, describe, expect, it, vi } from "vitest";

const getContentMock = vi.fn();
const octokitConstructorMock = vi.fn();

vi.mock("@octokit/rest", () => ({
  Octokit: octokitConstructorMock,
}));

const encode = (input: string) => Buffer.from(input, "utf8").toString("base64");

describe("lib/blogs", () => {
  beforeEach(() => {
    getContentMock.mockReset();
    octokitConstructorMock.mockReset();
    octokitConstructorMock.mockImplementation(() => ({
      repos: {
        getContent: getContentMock,
      },
    }));
  });

  it("returns empty list when GitHub env vars are missing", async () => {
    delete process.env.GH_OWNER;
    delete process.env.GH_REPO;

    const { getAllPosts } = await import("@/lib/blogs");

    const posts = await getAllPosts();

    expect(posts).toEqual([]);
    expect(octokitConstructorMock).not.toHaveBeenCalled();
  });

  it("parses posts returned from GitHub", async () => {
    process.env.GH_OWNER = "owner";
    process.env.GH_REPO = "repo";
    process.env.GH_BRANCH = "main";

    getContentMock.mockResolvedValueOnce({
      data: [
        {
          type: "file",
          name: "hello-world.mdx",
        },
      ],
    });

    const mdx = [
      "---",
      'title: "Hello"',
      'summary: "Summary"',
      'date: "2024-01-01"',
      'tags: "tag1, tag2"',
      "---",
      "",
      "Content here",
    ].join("\n");

    getContentMock.mockResolvedValueOnce({
      data: {
        encoding: "base64",
        content: encode(mdx),
      },
    });

    const { getAllPosts } = await import("@/lib/blogs");

    const posts = await getAllPosts();

    expect(posts).toEqual([
      {
        slug: "hello-world",
        title: "Hello",
        summary: "Summary",
        date: "2024-01-01",
        coverImage: undefined,
        tags: ["tag1", "tag2"],
      },
    ]);
    expect(getContentMock).toHaveBeenCalledTimes(2);
  });

  it("returns post content when available", async () => {
    process.env.GH_OWNER = "owner";
    process.env.GH_REPO = "repo";
    process.env.GH_BRANCH = "main";

    const mdx = [
      "---",
      'title: "Hello"',
      'summary: "Summary"',
      'date: "2024-01-01"',
      'tags: "tag1"',
      "---",
      "",
      "Body",
    ].join("\n");

    getContentMock.mockResolvedValueOnce({
      data: {
        encoding: "base64",
        content: encode(mdx),
      },
    });

    const { getPostBySlug } = await import("@/lib/blogs");

    const post = await getPostBySlug("hello-world");

    expect(post).toMatchObject({
      slug: "hello-world",
      title: "Hello",
      summary: "Summary",
      tags: ["tag1"],
      content: "Body",
    });
  });

  it("returns null for missing post", async () => {
    process.env.GH_OWNER = "owner";
    process.env.GH_REPO = "repo";
    process.env.GH_BRANCH = "main";

    const error = new Error("Not Found") as Error & { status?: number };
    error.status = 404;

    getContentMock.mockRejectedValueOnce(error);

    const { getPostBySlug } = await import("@/lib/blogs");

    const post = await getPostBySlug("missing");

    expect(post).toBeNull();
  });
});
