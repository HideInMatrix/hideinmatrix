import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { MotionConfig, motion, useInView, type Transition, type SVGMotionProps } from "framer-motion";
import { Pause, Play } from "lucide-react";

const MotionContext = createContext({ active: true, toggle: () => {} });

export function StudioMotion({ children }: { children: ReactNode }) {
  const [reduced, setReduced] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);
  const [paused, setPaused] = useState(false);
  const active = !reduced && !paused;
  return (
    <MotionContext.Provider value={{ active, toggle: () => setPaused((value) => !value) }}>
      <MotionConfig reducedMotion={active ? "user" : "always"} transition={{ type: "spring", stiffness: 180, damping: 24 }}>
        <div data-motion={active ? "on" : "off"}>{children}</div>
      </MotionConfig>
    </MotionContext.Provider>
  );
}

export const useStudioMotion = () => useContext(MotionContext);

export function useLoopMotion() {
  const { active } = useStudioMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.1 });
  return { ref, active, playing: active && inView };
}

// A short gesture, followed by four seconds of rest, keeps the page readable.
export function loopTransition(playing: boolean, delay = 0): Transition {
  return {
    type: "tween",
    duration: playing ? 2.4 : 0,
    times: [0, 0.4, 1],
    ease: "easeInOut",
    repeat: playing ? Infinity : 0,
    repeatDelay: 4,
    delay: playing ? delay : 0,
  };
}

type LoopStrokeProps = Omit<SVGMotionProps<SVGPathElement>, "animate" | "initial" | "transition"> & {
  playing: boolean;
  delay?: number;
};

export function LoopStroke({ playing, delay = 0, ...props }: LoopStrokeProps) {
  return (
    <motion.path
      {...props}
      initial={false}
      animate={{ pathLength: playing ? [0, 1, 1] : 1 }}
      transition={loopTransition(playing, delay)}
    />
  );
}

export function MotionToggle() {
  const { active, toggle } = useStudioMotion();
  return (
    <button className="motion-toggle" onClick={toggle} type="button" aria-label={active ? "暂停视觉动效" : "开启视觉动效"} aria-pressed={!active}>
      {active ? <Pause size={13} aria-hidden="true" /> : <Play size={13} aria-hidden="true" />}
      <span>动效 {active ? "ON" : "OFF"}</span>
    </button>
  );
}

export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  const { active } = useStudioMotion();
  return (
    <motion.div className={className} initial={active ? { opacity: 0, y: 24 } : false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.12 }} animate={active ? { opacity: 0, y: 24 } : { opacity: 1, y: 0 }}>
      {children}
    </motion.div>
  );
}
