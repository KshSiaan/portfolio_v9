import type { NextRequest } from "next/server";

type GitHubRepo = {
  id: number;
  name: string;
  html_url: string;
  private: boolean;
  stargazers_count: number;
  updated_at: string;
};

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const token = process.env.GITHUB_TOKEN;
  const username =
    request.nextUrl.searchParams.get("username") || process.env.GITHUB_USERNAME;

  if (!username) {
    return Response.json(
      { error: "Missing GitHub username. Add ?username=... or set GITHUB_USERNAME." },
      { status: 400 },
    );
  }

  if (!token) {
    return Response.json(
      {
        error:
          "Missing GITHUB_TOKEN in environment variables. Add it to .env.local and restart dev server.",
      },
      { status: 500 },
    );
  }

  const response = await fetch(
    `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=100`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28",
      },
      cache: "no-store",
    },
  );

  if (!response.ok) {
    const message = await response.text();
    return Response.json(
      {
        error: `GitHub API error (${response.status}): ${message || "Unknown error"}`,
      },
      { status: response.status },
    );
  }

  const repos = (await response.json()) as GitHubRepo[];

  return Response.json({
    repos: repos.map((repo) => ({
      id: repo.id,
      name: repo.name,
      htmlUrl: repo.html_url,
      private: repo.private,
      stars: repo.stargazers_count,
      updatedAt: repo.updated_at,
    })),
  });
}
