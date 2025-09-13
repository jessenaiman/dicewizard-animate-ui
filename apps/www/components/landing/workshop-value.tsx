"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { SplittingText } from "@/registry/primitives/texts/splitting";

interface WorkshopValueProps {
  className?: string;
}

const features = [
  {
    k: "visual",
    title: "Tweak Visually",
    desc: "Drag, nudge, restyle components right in the canvas.",
  },
  {
    k: "variants",
    title: "Variant Compare",
    desc: "Snapshot multiple looks & flip through instantly.",
  },
  {
    k: "export",
    title: "Instant Clean Code",
    desc: "Export minimal React + Tailwind primitives—no noise.",
  },
  {
    k: "handoff",
    title: "Design → Dev Sync",
    desc: "Share reproducible design states teams can trust.",
  },
];

export const WorkshopValue: React.FC<WorkshopValueProps> = ({ className }) => {
  const reduce = useReducedMotion();

  return (
    <section
      className={cn(
        "relative py-28 md:py-36 overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary/5 after:via-transparent after:to-secondary/5",
        className
      )}
      aria-labelledby="workshop-heading"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 0.8, 0.24, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-primary/90 backdrop-blur-sm">
            Rapid Iteration Loop
          </div>
          <h2
            id="workshop-heading"
            className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight text-balance leading-tight"
          >
            <span className="bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
              <SplittingText
                text="Visual"
                className="px-0.5 inline-block"
                initial={{ y: 8, opacity: 0, filter: 'blur(6px)' }}
                animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.5, ease: 'easeOut' }}
              />
              {" "}Adjustments
            </span>
            <span className="inline-block mx-2 text-primary/60 align-middle">→</span>
            <span className="inline-block bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent">
              <SplittingText
                text="Immediate Code Output"
                className="inline-block text-primary"
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: 'spring', bounce: 0, duration: 0.9 }}
              />
            </span>
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            Skip static mockups. Touch real components, test motion & spacing, then ship the code you just shaped. Creative velocity without structural debt.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <a
              href="#sandbox"
              className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
            >
              Open Sandbox
            </a>
            <a
              href="/design"
              className="inline-flex items-center justify-center rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              View Behaviors
            </a>
          </div>
        </motion.div>

        <div
          className="grid gap-6 md:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          role="list"
          aria-label="Workshop value features"
        >
          {features.map((f, i) => (
            <motion.div
              key={f.k}
              role="listitem"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.55,
                delay: 0.1 + i * 0.06,
                ease: [0.16, 0.8, 0.24, 1],
              }}
              className={cn(
                "group relative flex flex-col rounded-2xl border border-border/50",
                "bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm",
                "p-6 md:p-7 overflow-hidden"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10"
                style={{ maskImage: "radial-gradient(circle at 30% 25%, black, transparent 70%)" }}
              />
              <h3 className="relative z-10 text-sm font-semibold tracking-tight text-foreground group-hover:text-primary transition-colors">
                {f.title}
              </h3>
              <p className="relative z-10 mt-3 text-xs leading-relaxed text-muted-foreground">{f.desc}</p>
              <span
                aria-hidden="true"
                className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-primary/10 blur-2xl group-hover:scale-125 transition-transform"
              />
              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="absolute bottom-3 right-3 text-[11px] font-medium text-primary/70"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.05 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Ambient accent rings */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-1/2 top-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/10"
            initial={{ scale: 0.8, opacity: 0.25 }}
            animate={{ scale: [0.8, 1, 0.8], opacity: [0.25, 0.4, 0.25] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
};

export default WorkshopValue;
