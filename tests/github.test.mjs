import test from "node:test";
import assert from "node:assert/strict";
import {
  fetchRepositories,
  readCache,
  writeCache,
  safeHomepage,
  selectProjects,
} from "../src/lib/github.ts";

const repo = (id, overrides = {}) => ({
  id,
  name: `project-${id}`,
  description: null,
  homepage: null,
  language: "TypeScript",
  stargazers_count: id,
  forks_count: 0,
  updated_at: "2026-01-01T00:00:00Z",
  fork: false,
  archived: false,
  disabled: false,
  private: false,
  owner: { login: "HideInMatrix" },
  ...overrides,
});
const pick = (repos, sort = "stars") =>
  selectProjects(repos, "hideinmatrix", ["hidden"], sort);

test("sorts by stars, then update date, limits to five without mutating input", () => {
  const repos = Array.from({ length: 8 }, (_, i) => repo(i));
  repos.push(
    repo(20, { stargazers_count: 7, updated_at: "2026-02-01T00:00:00Z" }),
  );
  assert.deepEqual(
    pick(repos).map((r) => r.id),
    [20, 7, 6, 5, 4],
  );
  assert.equal(repos[0].id, 0);
});

test("recent mode uses update date first and stars for ties", () => {
  assert.deepEqual(
    pick(
      [
        repo(100),
        repo(1, { updated_at: "2026-02-01T00:00:00Z" }),
        repo(2, { updated_at: "2026-02-01T00:00:00Z" }),
      ],
      "updated",
    ).map((r) => r.id),
    [2, 1, 100],
  );
});

test("filters forks, archived, disabled, private, excluded and other owners", () => {
  const repos = [
    repo(1),
    repo(2, { fork: true }),
    repo(3, { archived: true }),
    repo(4, { disabled: true }),
    repo(5, { private: true }),
    repo(6, { name: "HIDDEN" }),
    repo(7, { owner: { login: "someone-else" } }),
  ];
  assert.deepEqual(
    pick(repos).map((r) => r.id),
    [1],
  );
  assert.deepEqual(pick([]), []);
});

test("loads all pages before ranking, deduplicates overlapping results", async () => {
  const calls = [];
  const repos = await fetchRepositories("HideInMatrix", async (url) => {
    calls.push(url);
    const data =
      calls.length === 1
        ? Array.from({ length: 100 }, (_, i) => repo(i))
        : [repo(99), repo(999)];
    return new Response(JSON.stringify(data));
  });
  assert.equal(calls.length, 2);
  assert.match(calls[1], /page=2/);
  assert.equal(repos.length, 101);
  assert.equal(pick(repos)[0].id, 999);
});

test("rate limits, network failures and malformed data reject instead of caching partial data", async () => {
  await assert.rejects(
    fetchRepositories("test", async () => new Response("", { status: 403 })),
    /受限/,
  );
  await assert.rejects(
    fetchRepositories("test", async () => {
      throw new Error("offline");
    }),
    /offline/,
  );
  await assert.rejects(
    fetchRepositories("test", async () => new Response('[{"id":1}]')),
    /格式异常/,
  );
  await assert.rejects(
    fetchRepositories("test", async () => new Response('{"message":"error"}')),
    /格式异常/,
  );
});

test("cache round-trips and safely handles corrupted, future and inaccessible storage", () => {
  const values = new Map();
  const storage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => values.set(key, value),
  };
  const data = { savedAt: Date.now() - 1000, repositories: [repo(1)] };
  writeCache("HideInMatrix", data, storage);
  assert.deepEqual(readCache("hideinmatrix", storage), data);
  storage.setItem("github-projects:hideinmatrix:v1", "broken-json");
  assert.equal(readCache("HideInMatrix", storage), null);
  writeCache(
    "HideInMatrix",
    { ...data, savedAt: Date.now() + 60_000 },
    storage,
  );
  assert.equal(readCache("HideInMatrix", storage), null);
  assert.equal(
    readCache("test", {
      getItem() {
        throw new Error("denied");
      },
    }),
    null,
  );
});

test("homepage permits only web URLs and normalizes domain-only homepages", () => {
  assert.equal(safeHomepage("example.org/demo"), "https://example.org/demo");
  assert.equal(safeHomepage("https://example.org"), "https://example.org/");
  assert.equal(safeHomepage("javascript:alert(1)"), null);
  assert.equal(safeHomepage("data:text/html,hi"), null);
  assert.equal(safeHomepage("ftp://example.org"), null);
  assert.equal(safeHomepage(null), null);
});
