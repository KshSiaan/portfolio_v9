import type { NextRequest } from "next/server";

type GitHubRepo = {
  language: string | null;
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

  const startedAt = performance.now();

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

  const endedAt = performance.now();

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

  const languageCount = new Map<string, number>();

  for (const repo of repos) {
    if (!repo.language) {
      continue;
    }

    languageCount.set(repo.language, (languageCount.get(repo.language) ?? 0) + 1);
  }

  const favoriteLanguage =
    [...languageCount.entries()].sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Unknown";

  return Response.json({
    userDataSpeedMs: Math.max(1, endedAt - startedAt),
    totalRepos: repos.length,
    favoriteLanguage,
  });
}