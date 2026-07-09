import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type WordsPullUpProps = {
  text: string;
  className?: string;
  showAsterisk?: boolean;
};

export function WordsPullUp({
  text,
  className = "",
  showAsterisk = false,
}: WordsPullUpProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div ref={ref} className={`flex flex-wrap ${className}`}>
      {words.map((word, index) => (
        <span key={`${word}-${index}`} className="mr-[0.15em] overflow-hidden">
          <motion.span
            className="relative inline-block"
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
            {showAsterisk && index === words.length - 1 ? (
              <sup className="absolute -right-[0.3em] top-[0.65em] text-[0.31em] leading-none">
                *
              </sup>
            ) : null}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
