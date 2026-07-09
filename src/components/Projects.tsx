import { ArrowRight, Check, ExternalLink, GitBranch } from "lucide-react";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { featuredProjects } from "../content/site";
import { WordsPullUpMultiStyle } from "./motion/WordsPullUpMultiStyle";

const cardVideoUrl =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4";

export function Projects() {
  return (
    <section
      id="projects"
      className="relative min-h-screen bg-black px-4 py-20 sm:px-6 md:py-28"
    >
      <div className="bg-noise pointer-events-none absolute inset-0 opacity-[0.15]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-10 flex flex-col gap-5 md:mb-14 md:flex-row md:items-end md:justify-between">
          <WordsPullUpMultiStyle
            segments={[
              {
                text: "一些已经公开的项目。",
                className: "text-cream",
              },
              {
                text: "偏工具、产品、接口和实验，覆盖前端到后端。",
                className: "text-gray-500",
              },
            ]}
            className="max-w-4xl justify-start text-xl font-normal leading-tight sm:text-2xl md:text-3xl lg:text-4xl"
          />
          <a
            href="https://github.com/HideInMatrix?tab=repositories"
            className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 px-5 py-2.5 text-sm font-bold text-primary transition-colors hover:border-primary/60"
          >
            <GitBranch className="h-4 w-4" />
            全部仓库
          </a>
        </div>

        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <VideoProjectCard />
          {featuredProjects.slice(0, 3).map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index + 1} />
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {featuredProjects.slice(3).map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index + 4} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoProjectCard() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="relative min-h-[380px] overflow-hidden rounded-[1.25rem] bg-panel lg:min-h-[480px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : undefined}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <video
        className="absolute inset-0 h-full w-full object-cover"
        src={cardVideoUrl}
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/10 to-black/70" />
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <p className="text-2xl leading-none text-cream md:text-3xl">
          让想法成为可运行的软件。
        </p>
      </div>
    </motion.div>
  );
}

type Project = (typeof featuredProjects)[number];

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      className="flex min-h-[380px] flex-col rounded-[1.25rem] bg-[#212121] p-5 lg:min-h-[480px]"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : undefined}
      transition={{
        duration: 0.75,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <div className="mb-7 flex items-start justify-between gap-4">
        <span className="rounded-full border border-primary/15 px-3 py-1 text-xs text-primary/70">
          {project.number}
        </span>
        <div className="flex flex-wrap justify-end gap-1.5">
          {project.languages.map((language) => (
            <span
              key={language}
              className="rounded-full bg-black/35 px-2 py-1 text-[10px] text-primary/65"
            >
              {language}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-2xl leading-none text-cream md:text-3xl">
          {project.name}
        </h3>
        <p className="mt-4 text-sm leading-5 text-gray-400">
          {project.description}
        </p>
      </div>

      <div className="mt-7 space-y-3">
        {project.notes.map((note) => (
          <div key={note} className="flex gap-2 text-sm text-gray-400">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
            <span>{note}</span>
          </div>
        ))}
      </div>

      <div className="mt-auto flex flex-wrap gap-2 pt-8">
        <a
          href={project.href}
          className="group inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-bold text-black transition-all hover:gap-3"
        >
          源代码
          <ArrowRight className="h-4 w-4 -rotate-45 transition-transform group-hover:translate-x-0.5" />
        </a>
        {project.liveUrl ? (
          <a
            href={project.liveUrl}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 px-4 py-2 text-sm font-bold text-primary transition-colors hover:border-primary/60"
          >
            在线预览
            <ExternalLink className="h-4 w-4" />
          </a>
        ) : null}
      </div>
    </motion.div>
  );
}
