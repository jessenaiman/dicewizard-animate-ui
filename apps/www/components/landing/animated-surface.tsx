"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

type MotionDivProps = React.ComponentPropsWithoutRef<typeof motion.div>;

export interface AnimatedSurfaceProps extends Omit<MotionDivProps, "className"> {
  className?: string;
  interactive?: boolean;
  pulse?: boolean;
  glow?: boolean;
  gradient?: string; // tailwind gradient classes (without bg- prefix)
  border?: boolean;
  hoverLift?: boolean;
  focusRing?: boolean;
  muted?: boolean;
  disabledMotionFallback?: boolean;
  children: React.ReactNode;
}

/**
 * AnimatedSurface
 * Reusable motion-enabled container to unify hover, focus, gradient & glow patterns
 * used across landing cards.
 */
export const AnimatedSurface: React.FC<AnimatedSurfaceProps> = ({
  className,
  interactive = true,
  pulse = false,
  glow = false,
  gradient,
  border = true,
  hoverLift = true,
  focusRing = true,
  muted = false,
  disabledMotionFallback = false,
  children,
  ...rest
}) => {
  const reduceMotion = useReducedMotion();

  const base = cn(
    "relative rounded-2xl overflow-hidden",
    "bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm",
    border && "border border-border/50",
    focusRing && "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
    interactive && "transition-shadow",
    hoverLift && interactive && "will-change-transform",
    muted && "opacity-90",
    className
  );

  const variants = !disabledMotionFallback && !reduceMotion && interactive
    ? {
        whileHover: hoverLift ? { y: -6 } : undefined,
        whileTap: hoverLift ? { y: -2 } : undefined
      }
    : {};

  return (
    <motion.div
      className={base}
      {...(variants as any)}
      {...rest}
    >
      {/* Gradient accent mask */}
      {gradient && (
        <div
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500",
            "bg-gradient-to-br",
            gradient,
            interactive && "group-hover:opacity-100"
          )}
          style={{ maskImage: "radial-gradient(circle at 30% 25%, black, transparent 70%)" }}
        />
      )}

      {/* Soft glow overlay */}
      {glow && (
        <span
          aria-hidden="true"
          className={cn(
            "pointer-events-none absolute inset-0 rounded-[inherit] ring-1 ring-inset ring-white/5",
            "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b",
            "before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity",
            interactive && "group-hover:before:opacity-100"
          )}
        />
      )}

      {/* Pulse aura */}
      {pulse && !reduceMotion && (
        <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-[inherit] bg-primary/10 blur-xl"
            initial={{ opacity: 0.15 }}
            animate={{ opacity: [0.15, 0.35, 0.15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {/* Content layer */}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
};

export default AnimatedSurface;
