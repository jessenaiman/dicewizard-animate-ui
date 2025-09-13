"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/cn";

interface ProfessionalPathwaysProps {
  className?: string;
}

const badges = [
  { k: "components", label: "100+ Creative Components" },
  { k: "devindex", label: "110% Dev Appreciation Index" },
  { k: "iteration", label: "Friction-Less Iteration" },
];

export const ProfessionalPathways: React.FC<ProfessionalPathwaysProps> = ({ className }) => {
  const reduce = useReducedMotion();
  return (
    <section
      aria-labelledby="professional-pathways-heading"
      className={cn(
        "relative py-28 md:py-36 overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-background/40 after:via-transparent after:to-background/60",
        className
      )}
    >
      <div className="container mx-auto max-w-6xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.65, ease: [0.16, 0.8, 0.24, 1] }}
          className="mx-auto mb-14 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary/90 backdrop-blur-sm">
            Professional Pathways
          </div>
          <h2
            id="professional-pathways-heading"
            className="mt-6 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Need Momentum? Plug Me In.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            From rapid prototyping sprints to embedded design-engineering collaboration—pick the level
            of involvement that accelerates your roadmap without slowing experimentation.
          </p>
        </motion.div>

        <ul
          role="list"
          aria-label="Credibility metrics"
          className="mb-12 flex flex-wrap items-center justify-center gap-3"
        >
          {badges.map((b, i) => (
            <motion.li
              role="listitem"
              key={b.k}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ delay: 0.05 + i * 0.08, duration: 0.45 }}
              className="rounded-full border border-border/50 bg-background/60 px-4 py-1.5 text-xs font-medium tracking-wide text-muted-foreground backdrop-blur-sm"
            >
              {b.label}
            </motion.li>
          ))}
        </ul>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/blog/react-portfolio-templates"
            className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/30 transition hover:shadow-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
          >
            View Resume / Portfolio
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Contact
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
          <Link
            href="#pricing"
            className="group inline-flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-medium text-primary backdrop-blur-sm transition hover:bg-primary/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
          >
            Service Levels
            <span className="transition-transform group-hover:translate-x-0.5">→</span>
          </Link>
        </div>

        <div className="mt-10 text-center">
          <p className="text-xs text-muted-foreground">
            Open-source foundations + focused collaboration. Sustainable velocity without reinventing the wheel.
          </p>
        </div>
      </div>

      {/* Ambient soft glow */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-[60%] h-[540px] w-[540px] -translate-x-1/2 rounded-full bg-secondary/10 blur-3xl"
            initial={{ opacity: 0.15, scale: 0.85 }}
            animate={{ opacity: [0.15, 0.32, 0.15], scale: [0.85, 1.05, 0.85] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
};

export default ProfessionalPathways;
