import { useEffect, useState } from "react";
import { githubConfig } from "../content/site";
import {
  CACHE_TTL,
  getRepositories,
  readCache,
  writeCache,
  type Repository,
} from "../lib/github";

function getLocalCache() {
  try {
    return readCache(githubConfig.username, window.localStorage);
  } catch {
    return null;
  }
}

export function useGithubProjects() {
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState(() => {
    const cache = getLocalCache();
    return {
      repositories: cache?.repositories ?? ([] as Repository[]),
      loading: !cache || Date.now() - cache.savedAt >= CACHE_TTL,
      error: "",
      savedAt: cache?.savedAt ?? (null as number | null),
    };
  });

  useEffect(() => {
    let active = true;
    const cache = getLocalCache();
    if (attempt === 0 && cache && Date.now() - cache.savedAt < CACHE_TTL) {
      setState({
        repositories: cache.repositories,
        loading: false,
        error: "",
        savedAt: cache.savedAt,
      });
      return;
    }
    setState((current) => ({ ...current, loading: true, error: "" }));
    getRepositories(githubConfig.username)
      .then((repositories) => {
        if (!active) return;
        const savedAt = Date.now();
        try {
          writeCache(
            githubConfig.username,
            { repositories, savedAt },
            window.localStorage,
          );
        } catch {
          /* Storage access itself may be disabled by the browser. */
        }
        setState({ repositories, loading: false, error: "", savedAt });
      })
      .catch((error: unknown) => {
        if (!active) return;
        setState((current) => ({
          ...current,
          loading: false,
          error:
            error instanceof Error && error.name !== "TimeoutError"
              ? error.message
              : "连接 GitHub 超时，请稍后重试。",
        }));
      });
    return () => {
      active = false;
    };
  }, [attempt]);

  return { ...state, retry: () => setAttempt((current) => current + 1) };
}
