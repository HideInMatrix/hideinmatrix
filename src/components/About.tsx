import { ArrowUpRight } from "lucide-react";
import { siteLinks } from "../content/site";

export function About() {
  return (
    <section id="story" className="about" aria-labelledby="about-title">
      <p className="eyebrow">02 / ABOUT</p>
      <h2 id="about-title">保持好奇，持续构建。</h2>
      <p>
        我是
        Bender，一名喜欢动手做东西的开发者。从个人网盘、编辑器到音乐服务和网络工具，我喜欢把具体的问题，变成可以访问、维护和复用的软件。
      </p>
      <p>
        这里放项目，博客记录过程。关于开发、工具和折腾出来的经验，都慢慢写下来。
      </p>
      <a
        className="text-link"
        href={siteLinks.blog}
        target="_blank"
        rel="noreferrer"
      >
        去博客坐坐 <ArrowUpRight size={17} aria-hidden="true" />
      </a>
    </section>
  );
}
