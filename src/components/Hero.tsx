import { ArrowDown, ArrowUpRight } from "lucide-react";
import { navigationItems, siteLinks } from "../content/site";

export function Hero() {
  return (
    <>
      <header className="site-header" id="top">
        <a className="wordmark" href="#top" aria-label="MicroMatrix 首页">
          <span className="wordmark-solid">M</span>
          <span className="wordmark-outline">MATRIX</span>
        </a>
        <nav aria-label="主导航">
          {navigationItems.map((item) => (
            <a key={item.label} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
      </header>
      <section className="hero" aria-labelledby="intro-title">
        <p className="eyebrow">BENDER / DEVELOPER & MAKER</p>
        <h1 id="intro-title">
          你好，我是 Bender。
          <br />
          欢迎来到 <span>MicroMatrix</span>。
        </h1>
        <p className="hero-description">
          写代码，做工具，记录折腾的过程。
          <br className="desktop-break" />
          关注前端产品、系统接口，以及那些小而实用的软件。
        </p>
        <p className="hero-banner">
          让想法成为可运行的软件<span aria-hidden="true">↗</span>
        </p>
        <div className="hero-links">
          <a
            className="button button-solid"
            href={siteLinks.blog}
            target="_blank"
            rel="noreferrer"
          >
            阅读博客 <ArrowUpRight size={18} aria-hidden="true" />
          </a>
          <a className="text-link" href="#projects">
            看看我的项目 <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
      </section>
    </>
  );
}
