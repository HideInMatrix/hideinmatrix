import { About } from "./components/About";
import { Hero } from "./components/Hero";
import { Projects } from "./components/Projects";
import { Skills } from "./components/Skills";
import { siteLinks } from "./content/site";
import { Reveal, StudioMotion } from "./components/motion/StudioMotion";

export function App() {
  return (
    <StudioMotion><div className="site-shell">
      <a className="skip-link" href="#projects">
        跳到开源项目
      </a>
      <main>
        <Hero />
        <Reveal><Projects /></Reveal>
        <div className="profile-grid">
          <Reveal><About /></Reveal>
          <Reveal><Skills /></Reveal>
        </div>
      </main>
      <footer className="site-footer">
        <a className="footer-brand" href="#top">
          MicroMatrix<span aria-hidden="true"> ↗</span>
        </a>
        <div>
          <span>保持好奇，持续构建。</span>
          <a href={siteLinks.github} target="_blank" rel="noreferrer">
            GitHub ↗
          </a>
          <a href={siteLinks.blog} target="_blank" rel="noreferrer">
            博客 ↗
          </a>
        </div>
      </footer>
    </div></StudioMotion>
  );
}
