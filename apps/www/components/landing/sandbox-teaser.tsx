"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

interface SandboxTeaserProps {
  className?: string;
  id?: string;
}

export const SandboxTeaser: React.FC<SandboxTeaserProps> = ({ className, id = "sandbox" }) => {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby="sandbox-teaser-heading"
      className={cn(
        "relative py-28 md:py-36 overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-[radial-gradient(circle_at_30%_25%,rgba(var(--primary-rgb),0.08),transparent_70%)]",
        className
      )}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
          {/* Animated Preview Panel */}
            <motion.div
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.7, ease: [0.16, 0.8, 0.24, 1] }}
              className={cn(
                "relative group rounded-3xl border border-border/50",
                "bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm",
                "p-6 md:p-8 overflow-hidden min-h-[420px] flex flex-col"
              )}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100 bg-gradient-to-br from-primary/15 via-transparent to-secondary/20"
                style={{ maskImage: "radial-gradient(circle at 35% 30%, black 0%, transparent 65%)" }}
              />
              <h3 className="text-sm font-semibold tracking-wide text-primary/80 mb-4">
                Live Variant Cycler
              </h3>

              {/* Variant Cards */}
              <div className="relative flex-1 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-5 w-full max-w-md">
                  {["Button", "Card", "Panel", "Chip"].map((label, i) => (
                    <motion.div
                      key={label}
                      initial={{ opacity: 0, y: 18, scale: 0.9 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.55, ease: [0.16, 0.8, 0.24, 1] }}
                      className={cn(
                        "relative rounded-xl border border-border/40",
                        "bg-gradient-to-br from-background/80 to-background/40",
                        "h-28 flex items-center justify-center text-xs font-medium tracking-wide text-muted-foreground",
                        "shadow-sm"
                      )}
                    >
                      <span className="z-10">{label}</span>
                      {!reduce && (
                        <motion.span
                          aria-hidden="true"
                          className="absolute inset-0 rounded-[inherit] opacity-0 group-hover:opacity-100 bg-gradient-to-br from-primary/20 via-transparent to-secondary/30 transition-opacity"
                        />
                      )}
                      {!reduce && (
                        <motion.div
                          aria-hidden="true"
                          className="pointer-events-none absolute -inset-px rounded-[inherit] ring-1 ring-inset ring-white/5"
                          initial={{ opacity: 0.35 }}
                          animate={{
                            opacity: [0.35, 0.65, 0.35],
                            transition: { duration: 6 + i, repeat: Infinity, ease: "easeInOut" },
                          }}
                        />
                      )}
                    </motion.div>
                  ))}
                </div>

                {/* Floating ghost highlight */}
                {!reduce && (
                  <motion.div
                    aria-hidden="true"
                    className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                    initial={{ opacity: 0.25, scale: 0.8 }}
                    animate={{ opacity: [0.25, 0.45, 0.25], scale: [0.8, 1.05, 0.8] }}
                    transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                  />
                )}
              </div>

              <div className="mt-8">
                <code className="block w-full rounded-xl bg-black/40 dark:bg-black/30 px-4 py-3 text-[11px] font-mono leading-relaxed text-foreground/80 ring-1 ring-white/5">
                  {`<MotionButton variant="ghost" radius="lg" glow />`}
                </code>
                <p className="mt-3 text-[11px] text-muted-foreground">
                  Every visual nudge is serialised to clean component props.
                </p>
              </div>
            </motion.div>

          {/* Explanation / Links */}
          <motion.div
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.7, ease: [0.16, 0.8, 0.24, 1] }}
            className="relative"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-secondary/25 bg-secondary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-secondary/90 backdrop-blur-sm">
              Sandbox Portal
            </div>
            <h2
              id="sandbox-teaser-heading"
              className="mt-6 text-3xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent"
            >
              Experiment First. Decide Faster.
            </h2>
            <p className="mt-6 text-base md:text-lg text-muted-foreground">
              The sandbox is where layout feel, timing curves, responsive shifts & spacing scales
              become tangible. Try a variant, commit or discard—zero cost. Save only what works.
            </p>

            <ul className="mt-8 space-y-4 text-sm">
              {[
                "Cycle visual + motion variants in a single viewport.",
                "Adjust spacing tokens & radii and watch every nested piece adapt.",
                "Hand-off states devs can reproduce exactly—no pixel guesswork.",
              ].map((line, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -14 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.6 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.45 }}
                  className="relative pl-5 text-muted-foreground"
                >
                  <span className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary/70" />
                  <span dangerouslySetInnerHTML={{ __html: line }} />
                </motion.li>
              ))}
            </ul>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="/design/backgrounds"
                className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-lg shadow-primary/25 transition hover:shadow-primary/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              >
                Background Systems
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="/design/responsive-design"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Responsive Recipes
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
              <a
                href="/design/text"
                className="group inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background/60 px-6 py-3 text-sm font-medium text-foreground backdrop-blur-sm transition hover:border-border focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
              >
                Typography Motion
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </a>
            </div>

            <p className="mt-6 text-xs text-muted-foreground">
              Prefer minimalist? Motion trims itself for reduced-motion users automagically.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Ambient arcs */}
      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[5%] top-[12%] h-40 w-40 rounded-full bg-secondary/10 blur-3xl"
            initial={{ opacity: 0.15, scale: 0.8 }}
            animate={{ opacity: [0.15, 0.3, 0.15], scale: [0.8, 1.05, 0.8] }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[10%] bottom-[8%] h-56 w-56 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0.12, scale: 0.85 }}
            animate={{ opacity: [0.12, 0.28, 0.12], scale: [0.85, 1.07, 0.85] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
};

export default SandboxTeaser;
