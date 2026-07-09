export const siteLinks = {
  blog: "https://blog.micromatrix.org",
  github: "https://github.com/HideInMatrix?tab=repositories",
} as const;

export const navigationItems = [
  { label: "关于", href: "#story" },
  { label: "项目", href: "#projects" },
  { label: "技能", href: "#stack" },
  { label: "博客", href: siteLinks.blog },
  { label: "代码", href: siteLinks.github },
] as const;

export const featuredProjects = [
  {
    number: "01",
    name: "tg-disk",
    description: "个人网盘项目，提供文件管理与线上访问体验。",
    href: "https://github.com/HideInMatrix/tg-disk",
    liveUrl: "https://pan.micromatrix.org",
    languages: ["TypeScript", "Vue", "Docker"],
    notes: ["个人文件工作流", "线上部署", "前端存储体验"],
  },
  {
    number: "02",
    name: "micromatrix-editor",
    description: "富文本编辑器实验，研究编辑器交互、文档结构和内容编辑体验。",
    href: "https://github.com/HideInMatrix/micromatrix-editor",
    liveUrl: "https://hideinmatrix.github.io/micromatrix-editor/",
    languages: ["TypeScript", "CSS", "编辑器"],
    notes: ["富文本系统", "交互设计", "文档编辑"],
  },
  {
    number: "03",
    name: "free-music",
    description: "音乐站点与接口配套项目，关注搜索、播放与服务整合。",
    href: "https://github.com/HideInMatrix/free-music",
    liveUrl: "https://music.micromatrix.org",
    languages: ["TypeScript", "API", "Docker"],
    notes: ["音乐发现体验", "服务整合", "前端产品打磨"],
  },
  {
    number: "04",
    name: "cf-best-domain",
    description: "Cloudflare IP 优选工具，面向网络测速与可用性筛选。",
    href: "https://github.com/HideInMatrix/cf-best-domain",
    liveUrl: null,
    languages: ["Go", "Docker"],
    notes: ["网络工具", "命令行思维", "性能取向代码"],
  },
  {
    number: "05",
    name: "micromatrix-email-manager",
    description: "邮箱管理工具网站，面向邮件账号和操作流管理。",
    href: "https://github.com/HideInMatrix/micromatrix-email-manager",
    liveUrl: null,
    languages: ["TypeScript", "Vue", "Docker"],
    notes: ["产品仪表盘", "邮箱管理", "实用 Web 工具"],
  },
] as const;

export const skillGroups = [
  {
    title: "开发语言",
    items: ["TypeScript", "Go", "Vue", "Python", "JavaScript", "CSS/SCSS"],
  },
  {
    title: "前端工程",
    items: ["React", "Vite", "Tailwind CSS", "UnoCSS", "Nuxt", "Three.js"],
  },
  {
    title: "后端与工具",
    items: ["NestJS", "LangChain", "Docker", "Cloudflare", "API 设计", "自动化"],
  },
] as const;
