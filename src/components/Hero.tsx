import { ArrowDown, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { navigationItems, siteLinks } from "../content/site";
import { TypingBanner } from "./TypingBanner";
import { GeometricPoster } from "./GeometricPoster";
import { LoopStroke, MotionToggle, useLoopMotion } from "./motion/StudioMotion";

export function Hero() {
  const { ref, active, playing } = useLoopMotion();
  return (
    <>
      <header className="site-header" id="top">
        <a className="wordmark" href="#top" aria-label="MicroMatrix 首页">
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span>micro<span className="wordmark-light">matrix</span><span className="brand-period">.</span></span>
        </a>
        <nav aria-label="主导航">
          {navigationItems.map((item, index) => (
            <a key={item.label} href={item.href} {...(item.href.startsWith("https") ? { target: "_blank", rel: "noreferrer" } : {})}>
              <span className="nav-index" aria-hidden="true">0{index + 1}</span>{item.label}{item.href.startsWith("https") ? <ArrowUpRight size={12} aria-hidden="true" /> : null}
            </a>
          ))}
        </nav>
        <MotionToggle />
      </header>
      <section className="hero" aria-labelledby="intro-title">
        <motion.div ref={ref} className="hero-copy" initial={active ? { opacity: 0, y: 22 } : false} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.65, type: "tween" }}>
          <p className="eyebrow"><span className="status-dot" /> BENDER / DEVELOPER & MAKER</p>
          <p className="hero-greeting">你好，我是 Bender。<span className="handwritten hello-note">hello, world!</span></p>
          <h1 id="intro-title">保持好奇，<br /><span className="scribble-word">动手试试。
            <svg viewBox="0 0 320 28" fill="none" aria-hidden="true"><LoopStroke playing={playing} delay={0.6} d="M5 17C81 2 208 6 312 9M30 26C129 14 220 18 286 15" stroke="currentColor" strokeWidth="5" strokeLinecap="round" /></svg>
          </span></h1>
          <p className="hero-description">写代码，做工具，记录折腾的过程。<br />这里是 MicroMatrix，我的数字实验室。</p>
          <div className="hero-links">
            <motion.a className="button button-solid" href="#projects" whileHover={active ? { x: -3, y: -3 } : undefined} whileTap={active ? { x: 2, y: 2 } : undefined}>探索我的项目 <ArrowDown size={18} aria-hidden="true" /></motion.a>
            <a className="text-link" href={siteLinks.blog} target="_blank" rel="noreferrer">阅读博客 <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <TypingBanner />
        </motion.div>
        <GeometricPoster />
      </section>
      <div className="manifesto-strip" aria-label="写代码、保持好奇、构建与分享">
        <span>CODE & CREATE</span><span aria-hidden="true">✳</span><span>保持好奇</span><span aria-hidden="true">↗</span><span>BUILD. BREAK. REPEAT.</span><span aria-hidden="true">●</span><span>持续构建</span>
      </div>
    </>
  );
}
