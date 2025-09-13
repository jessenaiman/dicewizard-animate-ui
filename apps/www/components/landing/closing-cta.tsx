"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ClosingCtaProps {
  className?: string;
  id?: string;
}

export const ClosingCta: React.FC<ClosingCtaProps> = ({ className, id = "wrap-up" }) => {
  const reduce = useReducedMotion();
  return (
    <section
      id={id}
      aria-labelledby="closing-cta-heading"
      className={cn(
        "relative py-32 md:py-40 overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_50%_40%,rgba(var(--primary-rgb),0.08),transparent_70%)]",
        className
      )}
    >
      <div className="container mx-auto max-w-5xl px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.75, ease: [0.16, 0.8, 0.24, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-primary/90 backdrop-blur-sm">
            Final Nudge
          </div>
          <h2
            id="closing-cta-heading"
            className="mt-8 text-balance bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Stop Wrestling Interfaces. Start Sculpting Them.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base md:text-lg text-muted-foreground">
            Open a surface, poke the pixels, feel the motion, export clean code. Exploration-first
            workflow that preserves velocity while keeping handoff faithful.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.15, duration: 0.6, ease: [0.16, 0.8, 0.24, 1] }}
          className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="#tool-explorer"
            className="group inline-flex items-center gap-2 rounded-full bg-primary px-7 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            Begin in the Sandbox
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center gap-2 rounded-full border border-border/60 bg-background/60 px-7 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Request Collaboration
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/5 transition group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ delay: 0.25, duration: 0.55 }}
          className="mx-auto mt-8 max-w-md text-xs text-muted-foreground"
        >
          Prefer async review? Send context & goals—receive variants + annotated diffs.
        </motion.p>
      </div>

      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[12%] bottom-[18%] h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0.18, scale: 0.85 }}
            animate={{ opacity: [0.18, 0.35, 0.18], scale: [0.85, 1.05, 0.85] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[10%] top-[22%] h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
            initial={{ opacity: 0.15, scale: 0.8 }}
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.8, 1.08, 0.8] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
};

export default ClosingCta;
