export const githubConfig = {
  username: "HideInMatrix",
  // Hide profile/test repositories here without maintaining the project list.
  excludedRepos: ["hideinmatrix", "hideinmatrix.github.io"],
  limit: 5,
} as const;

export const siteLinks = {
  blog: "https://blog.micromatrix.org",
  github: `https://github.com/${githubConfig.username}?tab=repositories`,
} as const;

export const navigationItems = [
  { label: "项目", href: "#projects" },
  { label: "关于", href: "#story" },
  { label: "博客", href: siteLinks.blog },
  { label: "GitHub", href: siteLinks.github },
] as const;

export const skillGroups = [
  { title: "开发语言", items: ["TypeScript", "Go", "Python", "JavaScript"] },
  { title: "前端工程", items: ["Vue / Nuxt", "React", "Vite", "CSS"] },
  { title: "服务与工具", items: ["NestJS", "Docker", "Cloudflare", "自动化"] },
] as const;
