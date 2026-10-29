import {
  ArrowRight,
  ArrowUpRight,
  GitFork,
  RefreshCw,
  Star,
} from "lucide-react";
import { useState } from "react";
import { githubConfig, siteLinks } from "../content/site";
import { useGithubProjects } from "../hooks/useGithubProjects";
import {
  safeHomepage,
  selectProjects,
  type ProjectSort,
  type Repository,
} from "../lib/github";

const dateFormatter = new Intl.DateTimeFormat("zh-CN", {
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});
const numberFormatter = new Intl.NumberFormat("en", {
  notation: "compact",
  maximumFractionDigits: 1,
});

export function Projects() {
  const [sort, setSort] = useState<ProjectSort>("stars");
  const { repositories, loading, error, savedAt, retry } = useGithubProjects();
  const projects = selectProjects(
    repositories,
    githubConfig.username,
    githubConfig.excludedRepos,
    sort,
    githubConfig.limit,
  );

  return (
    <section
      id="projects"
      className="projects"
      aria-labelledby="projects-title"
    >
      <div className="section-heading">
        <div>
          <p className="eyebrow">01 / OPEN SOURCE</p>
          <h2 id="projects-title">
            一些公开的作品<span className="heading-dot">.</span>
          </h2>
        </div>
        <a
          className="text-link all-repos"
          href={siteLinks.github}
          target="_blank"
          rel="noreferrer"
        >
          全部仓库 <ArrowUpRight size={17} aria-hidden="true" />
        </a>
      </div>
      <div className="project-toolbar">
        <div className="sort-options" role="group" aria-label="项目排序">
          <button
            type="button"
            aria-pressed={sort === "stars"}
            onClick={() => setSort("stars")}
          >
            <Star size={14} aria-hidden="true" />
            最多 Star
          </button>
          <button
            type="button"
            aria-pressed={sort === "updated"}
            onClick={() => setSort("updated")}
          >
            <RefreshCw size={14} aria-hidden="true" />
            最近更新
          </button>
        </div>
        <p className="project-count">
          精选 {projects.length || "—"} 个 / 原创公开仓库
        </p>
      </div>
      <div aria-live="polite" aria-busy={loading}>
        {loading && projects.length === 0 ? (
          <div className="project-loading" role="status">
            <RefreshCw className="spin" size={20} aria-hidden="true" />
            <p>正在从 GitHub 获取项目…</p>
          </div>
        ) : null}
        {error ? (
          <div className="project-notice" role="status">
            <p>
              {error}
              {savedAt !== null ? " 当前展示上次保存的项目。" : ""}
            </p>
            <button
              className="text-link"
              type="button"
              onClick={retry}
              disabled={loading}
            >
              {loading ? "重试中…" : "重新获取"}
              <RefreshCw size={14} aria-hidden="true" />
            </button>
          </div>
        ) : null}
        {projects.length > 0 ? (
          <ol className="project-list">
            {projects.map((repo, index) => (
              <ProjectRow key={repo.id} repo={repo} index={index} />
            ))}
          </ol>
        ) : null}
        {!loading && !error && projects.length === 0 ? (
          <div className="project-empty">
            <p>还没有符合条件的公开项目。</p>
            <a className="text-link" href={siteLinks.github}>
              去 GitHub 看看 <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        ) : null}
      </div>
      <div className="project-footnote">
        <span className="sync-indicator" aria-hidden="true" />
        <p>
          {loading && projects.length > 0
            ? "正在更新项目…"
            : error
              ? "等待下次同步"
              : savedAt !== null
                ? `数据来自 GitHub · ${dateFormatter.format(savedAt)} 同步`
                : "数据来自 GitHub"}
        </p>
        <span className="footnote-rule" />
      </div>
    </section>
  );
}

function ProjectRow({ repo, index }: { repo: Repository; index: number }) {
  const homepage = safeHomepage(repo.homepage);
  const href = `https://github.com/${encodeURIComponent(repo.owner.login)}/${encodeURIComponent(repo.name)}`;
  return (
    <li className="project-row">
      <span className="project-number" aria-hidden="true">
        {String(index + 1).padStart(2, "0")}
      </span>
      <article className="project-content" aria-labelledby={`repo-${repo.id}`}>
        <div className="project-title-row">
          <h3 id={`repo-${repo.id}`}>
            <a href={href} target="_blank" rel="noreferrer">
              {repo.name}
            </a>
          </h3>
          <a
            className="project-arrow"
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={`查看 ${repo.name} 源代码`}
          >
            <ArrowUpRight size={25} aria-hidden="true" />
          </a>
        </div>
        <p className="project-description">
          {repo.description || "一个仍在生长的开源项目，欢迎查看源代码。"}
        </p>
        <div className="project-meta">
          {repo.language ? (
            <span className="language">
              <span aria-hidden="true" />
              {repo.language}
            </span>
          ) : null}
          <span aria-label={`${repo.stargazers_count} Stars`}>
            <Star size={14} aria-hidden="true" />
            {numberFormatter.format(repo.stargazers_count)}
          </span>
          <span aria-label={`${repo.forks_count} Forks`}>
            <GitFork size={14} aria-hidden="true" />
            {numberFormatter.format(repo.forks_count)}
          </span>
          <time dateTime={repo.updated_at}>
            更新于 {dateFormatter.format(new Date(repo.updated_at))}
          </time>
          {homepage ? (
            <a
              className="project-demo"
              href={homepage}
              target="_blank"
              rel="noreferrer"
            >
              访问网站 <ArrowRight size={14} aria-hidden="true" />
            </a>
          ) : null}
        </div>
      </article>
    </li>
  );
}
