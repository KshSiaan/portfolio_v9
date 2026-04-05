export const dynamic = "force-dynamic";

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return Response.json(
      {
        error:
          "Missing GITHUB_TOKEN in environment variables. Add it to .env.local and restart dev server.",
      },
      { status: 500 },
    );
  }

  const response = await fetch("https://api.github.com/user", {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    const message = await response.text();
    return Response.json(
      {
        error: `GitHub API error (${response.status}): ${message || "Unknown error"}`,
      },
      { status: response.status },
    );
  }

  const user = (await response.json()) as Record<string, unknown>;

  return Response.json({ user });
}
