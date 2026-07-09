import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { WordsPullUpMultiStyle } from "./motion/WordsPullUpMultiStyle";

const bodyText =
  "从个人网盘、富文本编辑器、音乐服务，到 Cloudflare 优选、AI 后端和网页小工具，我更喜欢把想法做成可访问、可维护、可复用的项目。";

export function About() {
  const containerRef = useRef<HTMLElement | null>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-120px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.8", "end 0.2"],
  });

  return (
    <section
      id="story"
      ref={containerRef}
      className="bg-black px-4 py-20 sm:px-6 md:py-28"
    >
      <motion.div
        className="mx-auto max-w-6xl rounded-[1.5rem] bg-[#101010] px-5 py-16 text-center sm:px-8 md:px-12 md:py-24"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={isInView ? { opacity: 1, scale: 1 } : undefined}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="mb-8 text-[10px] tracking-[0.42em] text-primary sm:text-xs">
          系统 / 产品 / 写作
        </p>

        <WordsPullUpMultiStyle
          segments={[
            { text: "我是 Bender，", className: "font-normal" },
            {
              text: "关注实用工具、前端工程和系统接口。",
              className: "font-serif",
            },
            {
              text: "主要使用 TypeScript、Go、Vue、Python 构建产品和系统。",
              className: "font-normal",
            },
          ]}
          className="mx-auto max-w-4xl justify-center text-3xl leading-[0.95] text-cream sm:text-4xl sm:leading-[0.9] md:text-5xl lg:text-6xl xl:text-7xl"
        />

        <p className="mx-auto mt-10 max-w-3xl text-xs leading-7 text-[#DEDBC8] sm:text-sm md:text-base">
          {Array.from(bodyText).map((letter, index) => (
            <AnimatedLetter
              key={`${letter}-${index}`}
              index={index}
              total={bodyText.length}
              progress={scrollYProgress}
            >
              {letter}
            </AnimatedLetter>
          ))}
        </p>
      </motion.div>
    </section>
  );
}

type AnimatedLetterProps = {
  children: string;
  index: number;
  total: number;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
};

function AnimatedLetter({
  children,
  index,
  total,
  progress,
}: AnimatedLetterProps) {
  const charProgress = index / total;
  const opacity = useTransform(
    progress,
    [Math.max(0, charProgress - 0.1), Math.min(1, charProgress + 0.05)],
    [0.2, 1],
  );

  return (
    <motion.span style={{ opacity }}>
      {children === " " ? "\u00A0" : children}
    </motion.span>
  );
}
