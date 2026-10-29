export interface Repository {
  id: number;
  name: string;
  description: string | null;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  updated_at: string;
  fork: boolean;
  archived: boolean;
  disabled: boolean;
  private: boolean;
  owner: { login: string };
}

export type ProjectSort = "stars" | "updated";
export const CACHE_TTL = 60 * 60 * 1000;
const CACHE_VERSION = 1;

export interface ProjectCache {
  savedAt: number;
  repositories: Repository[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

export function isRepository(value: unknown): value is Repository {
  return (
    isRecord(value) &&
    typeof value.id === "number" &&
    typeof value.name === "string" &&
    (value.description === null || typeof value.description === "string") &&
    (value.homepage === null || typeof value.homepage === "string") &&
    (value.language === null || typeof value.language === "string") &&
    typeof value.stargazers_count === "number" &&
    Number.isFinite(value.stargazers_count) &&
    typeof value.forks_count === "number" &&
    Number.isFinite(value.forks_count) &&
    typeof value.updated_at === "string" &&
    Number.isFinite(Date.parse(value.updated_at)) &&
    typeof value.fork === "boolean" &&
    typeof value.archived === "boolean" &&
    typeof value.disabled === "boolean" &&
    typeof value.private === "boolean" &&
    isRecord(value.owner) &&
    typeof value.owner.login === "string"
  );
}

export function safeHomepage(value: string | null): string | null {
  if (!value?.trim()) return null;
  if (
    /^[a-z][a-z\d+.-]*:/i.test(value.trim()) &&
    !/^https?:\/\//i.test(value.trim())
  )
    return null;
  try {
    const url = new URL(
      /^https?:\/\//i.test(value.trim())
        ? value.trim()
        : `https://${value.trim()}`,
    );
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.href
      : null;
  } catch {
    return null;
  }
}

export function selectProjects(
  repositories: Repository[],
  username: string,
  excluded: readonly string[],
  sort: ProjectSort,
  limit = 5,
): Repository[] {
  const hidden = new Set(excluded.map((name) => name.toLowerCase()));
  return repositories
    .filter(
      (repo) =>
        repo.owner.login.toLowerCase() === username.toLowerCase() &&
        !repo.private &&
        !repo.fork &&
        !repo.archived &&
        !repo.disabled &&
        !hidden.has(repo.name.toLowerCase()),
    )
    .sort((a, b) => {
      const stars = b.stargazers_count - a.stargazers_count;
      const updated = Date.parse(b.updated_at) - Date.parse(a.updated_at);
      return (
        (sort === "stars" ? stars || updated : updated || stars) ||
        a.name.localeCompare(b.name)
      );
    })
    .slice(0, limit);
}

export function readCache(
  username: string,
  storage: Pick<Storage, "getItem">,
): ProjectCache | null {
  try {
    const value: unknown = JSON.parse(
      storage.getItem(
        `github-projects:${username.toLowerCase()}:v${CACHE_VERSION}`,
      ) ?? "null",
    );
    if (
      !isRecord(value) ||
      typeof value.savedAt !== "number" ||
      !Number.isFinite(value.savedAt) ||
      value.savedAt > Date.now() ||
      value.savedAt <= 0 ||
      !Array.isArray(value.repositories) ||
      !value.repositories.every(isRepository)
    )
      return null;
    return { savedAt: value.savedAt, repositories: value.repositories };
  } catch {
    // Private browsing, denied storage, or a damaged cache must not block the API.
    return null;
  }
}

export function writeCache(
  username: string,
  cache: ProjectCache,
  storage: Pick<Storage, "setItem">,
): void {
  try {
    storage.setItem(
      `github-projects:${username.toLowerCase()}:v${CACHE_VERSION}`,
      JSON.stringify(cache),
    );
  } catch {
    // A full/disabled localStorage affects caching only; live projects still render.
    console.info("Project cache unavailable; using live GitHub data.");
  }
}

export async function fetchRepositories(
  username: string,
  fetcher: typeof fetch = fetch,
): Promise<Repository[]> {
  const repositories = new Map<number, Repository>();
  for (let page = 1; ; page++) {
    const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&direction=desc&per_page=100&page=${page}`;
    const response = await fetcher(url, {
      headers: { Accept: "application/vnd.github+json" },
      signal: AbortSignal.timeout(15_000),
    });
    if (!response.ok) {
      if (response.status === 403 || response.status === 429)
        throw new Error("GitHub 请求暂时受限，请稍后再试。");
      throw new Error("暂时无法获取 GitHub 项目，请稍后重试。");
    }
    const data: unknown = await response.json();
    if (!Array.isArray(data) || !data.every(isRepository))
      throw new Error("GitHub 返回的数据格式异常，请稍后重试。");
    for (const repo of data) repositories.set(repo.id, repo);
    if (data.length < 100) return [...repositories.values()];
  }
}

// Share StrictMode's initial requests and concurrent mounts, without persisting failures.
const requests = new Map<string, Promise<Repository[]>>();
export function getRepositories(username: string): Promise<Repository[]> {
  const existing = requests.get(username);
  if (existing) return existing;
  const request = fetchRepositories(username).finally(() =>
    requests.delete(username),
  );
  requests.set(username, request);
  return request;
}
