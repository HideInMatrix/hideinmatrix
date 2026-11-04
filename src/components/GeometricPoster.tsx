import { motion } from "framer-motion";
import { LoopStroke, loopTransition, useLoopMotion } from "./motion/StudioMotion";

export function GeometricPoster() {
  const { ref, playing } = useLoopMotion();
  return (
    <div ref={ref} className="poster-wrap" aria-hidden="true">
      <span className="poster-caption">FIG. 01 — A WORK IN PROGRESS</span>
      <div className="geometric-poster">
        <div className="poster-grid" />
        <motion.div className="poster-circle" initial={false} animate={playing ? { scale: [1, 0.9, 1], x: [0, -12, 0] } : { scale: 1, x: 0 }} transition={loopTransition(playing, 0.15)} />
        <motion.div className="poster-arch" initial={false} animate={playing ? { y: [0, 16, 0], rotate: [0, -4, 0] } : { y: 0, rotate: 0 }} transition={loopTransition(playing, 0.3)}>
          <div className="arch-cutout" />
        </motion.div>
        <motion.div className="poster-square" initial={false} animate={playing ? { x: [0, 8, 0], rotate: [0, 4, 0] } : { x: 0, rotate: 0 }} transition={loopTransition(playing, 0.45)}>
          <span>make<br />something.</span>
        </motion.div>
        <div className="poster-stripes" />
        <svg className="poster-doodle" viewBox="0 0 400 440" fill="none">
          <LoopStroke playing={playing} delay={0.6} d="M52 119C33 53 193 24 239 70C280 112 170 161 80 142C14 129 29 76 115 61" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" />
          <LoopStroke playing={playing} delay={1.1} d="M283 131C340 126 368 154 348 207M333 192L348 210L366 192" stroke="currentColor" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M65 304L74 329M49 322L88 312M53 306L83 330M268 375L310 365M274 384L318 375" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
        <motion.span className="poster-spark" animate={playing ? { rotate: [0, 12, 0, -8, 0] } : { rotate: 0 }} transition={{ type: "tween", duration: playing ? 7 : 0, repeat: playing ? Infinity : 0, ease: "easeInOut" }}>✳</motion.span>
        <span className="poster-code">&lt;/&gt;</span>
      </div>
      <span className="poster-note">a little order. a little chaos.</span>
    </div>
  );
}
