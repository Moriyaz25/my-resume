"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Custom clay cursor: a small lead dot that tracks the mouse exactly,
 * plus a larger soft blob that trails behind it with spring physics —
 * like a piece of clay being dragged across the canvas.
 *
 * Disabled on touch devices and when the OS prefers reduced motion.
 */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Trailing blob uses springs so it lags behind the lead dot
  const blobX = useSpring(mouseX, { damping: 22, stiffness: 180, mass: 0.6 });
  const blobY = useSpring(mouseY, { damping: 22, stiffness: 180, mass: 0.6 });

  const hoverDepth = useRef(0);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reducedMotion) return;

    setEnabled(true);

    function handleMove(e) {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!visible) setVisible(true);
    }

    function handleOver(e) {
      const target = e.target.closest(
        "a, button, .clay-interactive, [data-cursor-hover]"
      );
      if (target) {
        hoverDepth.current += 1;
        setHovering(true);
      }
    }

    function handleOut(e) {
      const target = e.target.closest(
        "a, button, .clay-interactive, [data-cursor-hover]"
      );
      if (target) {
        hoverDepth.current = Math.max(0, hoverDepth.current - 1);
        if (hoverDepth.current === 0) setHovering(false);
      }
    }

    function handleLeaveWindow() {
      setVisible(false);
    }

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseover", handleOver);
    window.addEventListener("mouseout", handleOut);
    window.addEventListener("mouseleave", handleLeaveWindow);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      window.removeEventListener("mouseout", handleOut);
      window.removeEventListener("mouseleave", handleLeaveWindow);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ opacity: visible ? 1 : 0, transition: "opacity 0.2s ease" }}
    >
      {/* Trailing clay blob — soft, blurred, lags behind */}
      <motion.div
        style={{ x: blobX, y: blobY }}
        animate={{
          scale: hovering ? 1.6 : 1,
          opacity: hovering ? 0.35 : 0.22,
        }}
        transition={{ duration: 0.35, ease: "easeOut" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-kiln blur-md"
      />

      {/* Lead dot — tracks mouse exactly, glows + scales on hover */}
      <motion.div
        style={{ x: mouseX, y: mouseY }}
        animate={{
          scale: hovering ? 2.2 : 1,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="absolute -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-kiln"
      >
        <motion.span
          animate={{
            opacity: hovering ? 0.55 : 0,
            scale: hovering ? 1 : 0.6,
          }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 rounded-full bg-kiln blur-[6px] -z-10"
        />
      </motion.div>
    </div>
  );
}
