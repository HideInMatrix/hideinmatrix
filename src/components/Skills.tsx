import { ArrowRight, Code2, Layers, RadioTower } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { siteLinks, skillGroups } from "../content/site";

const icons = [Code2, Layers, RadioTower] as const;

export function Skills() {
  const ref = useRef<HTMLElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <section id="stack" ref={ref} className="bg-black px-4 pb-24 sm:px-6 md:pb-32">
      <div className="mx-auto grid max-w-7xl gap-3 lg:grid-cols-12">
        <motion.div
          className="rounded-[1.5rem] bg-primary p-6 text-black md:p-8 lg:col-span-5"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-xs uppercase tracking-[0.36em] text-black/60">
            开发者侧写
          </p>
          <h2 className="mt-8 text-4xl leading-[0.9] tracking-[-0.04em] md:text-6xl">
            一套适合小产品和锋利实验的实践型技术栈。
          </h2>
          <p className="mt-6 max-w-md text-sm leading-6 text-black/70">
            技术栈围绕真实项目自然生长：用 TypeScript 做产品界面，用 Go 写工具和服务，用 Vue/Nuxt/React 组织前端体验，也用 Python 做自动化与脚本。
          </p>
          <a
            href={siteLinks.blog}
            aria-label="访问 Bender 的博客 blog.micromatrix.org"
            title="访问 Bender 的博客"
            target="_blank"
            rel="noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-black px-5 py-3 text-sm font-bold text-white transition-all hover:gap-3"
          >
            访问 Bender 的博客
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </a>
        </motion.div>

        <div className="grid gap-3 md:grid-cols-3 lg:col-span-7">
          {skillGroups.map((group, index) => {
            const Icon = icons[index];

            return (
              <motion.div
                key={group.title}
                className="rounded-[1.5rem] bg-[#101010] p-6 md:p-7"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: 0.7,
                  delay: index * 0.12,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <div className="mb-8 flex h-11 w-11 items-center justify-center rounded-full bg-[#212121] text-primary">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-2xl text-cream">{group.title}</h3>
                <div className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-primary/10 px-3 py-1.5 text-xs text-primary/70"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
