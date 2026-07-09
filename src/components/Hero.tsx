import { ArrowRight, BookOpen, GitBranch } from "lucide-react";
import { motion } from "framer-motion";
import { navigationItems, siteLinks } from "../content/site";
import { WordsPullUp } from "./motion/WordsPullUp";

const heroVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4";

const ease = [0.16, 1, 0.3, 1] as const;

export function Hero() {
  return (
    <section id="top" className="h-screen bg-black p-4 md:p-6">
      <div className="relative h-full overflow-hidden rounded-2xl bg-coal md:rounded-[2rem]">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src={heroVideoUrl}
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.7] mix-blend-overlay" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/75" />

        <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex justify-center px-4">
          <nav className="pointer-events-auto w-fit max-w-full rounded-b-2xl bg-black px-5 py-2 md:rounded-b-3xl md:px-8">
            <div className="flex items-center justify-center gap-4 sm:gap-7 md:gap-12 lg:gap-14">
              {navigationItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap text-[10px] text-primary/80 transition-colors hover:text-cream sm:text-xs md:text-sm"
                >
                  {item.label}
                </a>
              ))}
            </div>
          </nav>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-10 px-5 pb-6 sm:px-8 md:px-10 md:pb-10">
          <div className="grid gap-7 lg:grid-cols-12 lg:items-end">
            <div className="min-w-0 lg:col-span-8">
              <WordsPullUp
                text="MicroMatrix"
                showAsterisk
                className="font-serif text-[18vw] font-black leading-[0.85] tracking-[-0.07em] text-cream sm:text-[16vw] md:text-[13vw] lg:text-[10vw] xl:text-[9vw] 2xl:text-[9vw]"
              />
            </div>

            <div className="min-w-0 space-y-5 lg:col-span-4 lg:pb-8">
              <motion.p
                className="max-w-xl text-xs leading-[1.35] text-primary/70 sm:text-sm md:text-base"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5, ease }}
              >
                我长期做小而实用的软件：前端产品、后端接口、自动化脚本、网络工具和内容系统。
              </motion.p>

              <motion.div
                className="flex flex-wrap gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.7, ease }}
              >
                <a
                  href={siteLinks.blog}
                  className="group inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-bold text-black transition-all hover:gap-3 sm:text-base"
                >
                  <BookOpen className="h-4 w-4" />
                  阅读博客
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-primary transition-transform group-hover:scale-110">
                    <ArrowRight className="h-4 w-4" />
                  </span>
                </a>
                <a
                  href={siteLinks.github}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-black/35 px-5 py-2.5 text-sm font-bold text-primary backdrop-blur transition-colors hover:border-primary/60 sm:text-base"
                >
                  <GitBranch className="h-4 w-4" />
                  代码仓库
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
