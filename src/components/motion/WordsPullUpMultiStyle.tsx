import { motion, useInView } from "framer-motion";
import { useMemo, useRef } from "react";

type Segment = {
  text: string;
  className?: string;
};

type WordsPullUpMultiStyleProps = {
  segments: readonly Segment[];
  className?: string;
};

export function WordsPullUpMultiStyle({
  segments,
  className = "",
}: WordsPullUpMultiStyleProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true });
  const words = useMemo(
    () =>
      segments.flatMap((segment) =>
        segment.text.split(" ").map((word) => ({
          word,
          className: segment.className ?? "",
        })),
      ),
    [segments],
  );

  return (
    <div ref={ref} className={`inline-flex flex-wrap ${className}`}>
      {words.map(({ word, className }, index) => (
        <span key={`${word}-${index}`} className="mr-[0.18em] overflow-hidden">
          <motion.span
            className={`inline-block ${className}`}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : undefined}
            transition={{
              duration: 0.8,
              delay: index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </div>
  );
}
