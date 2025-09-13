"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/cn";

export interface ExternalTool {
  id: string;
  title: string;
  url: string;
  description: string;
  tag?: string;
  accent?: string; // tailwind gradient classes
}

const externalTools: ExternalTool[] = [
  {
    id: "characters",
    title: "Dice Wizard Character Builder",
    url: "https://characters.dicewizard.win/",
    description: "Spin up narrative-ready characters & archetypes in seconds.",
    tag: "Story",
    accent: "from-fuchsia-500 via-purple-500 to-indigo-500",
  },
  {
    id: "lazydm",
    title: "Lazy DM Toolkit",
    url: "https://lazy.dicewizard.win/",
    description: "Slice session prep time. Focus on table fun, not spreadsheets.",
    tag: "Prep",
    accent: "from-amber-400 via-orange-500 to-rose-500",
  },
  {
    id: "omega-design",
    title: "Omega Spiral Design Tools",
    url: "https://tools.omega-spiral.com/",
    description: "Prototype layout & motion. Tweak visually. Export clean code.",
    tag: "Design",
    accent: "from-cyan-400 via-sky-500 to-blue-600",
  },
  {
    id: "imagination",
    title: "AI Imagination Playground",
    url: "https://imagine.omega-spiral.com/",
    description: "Generate wild interface & interaction ideas on tap.",
    tag: "AI",
    accent: "from-pink-400 via-rose-500 to-red-500",
  },
  {
    id: "games",
    title: "Game Development Portal",
    url: "https://games.omega-spiral.com/",
    description: "Mechanics hub, iteration logs, assets & playtest notes.",
    tag: "Build",
    accent: "from-emerald-400 via-green-500 to-teal-600",
  },
];

interface ToolExplorerProps {
  className?: string;
  id?: string;
}

const sectionVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
};

export const ToolExplorer: React.FC<ToolExplorerProps> = ({ className, id = "tool-explorer" }) => {
  const prefersReduced = useReducedMotion();

  return (
    <section
      id={id}
      className={cn(
        "relative py-28 md:py-36 overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-radial after:from-primary/5 after:via-transparent after:to-transparent",
        className
      )}
      aria-labelledby="tool-explorer-heading"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, ease: [0.16, 0.8, 0.24, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-xs font-medium tracking-wide text-primary/90 backdrop-blur-sm">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-primary shadow-[0_0_0_3px_rgba(var(--primary-rgb),0.25)]"></span>
            Live Tool Surface
          </div>
          <h2
            id="tool-explorer-heading"
            className={cn(
              "mt-6 text-3xl md:text-5xl font-extrabold tracking-tight",
              "bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent"
            )}
          >
            Launch a Tool. Start Touching the Interface.
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            Skip the blank screen. Open a sandboxed surface and push shapes, tokens, motion and
            narrative systems immediately. Peek into the{" "}
            <a
              href="/design"
              className="underline decoration-dotted underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              design recipes
            </a>{" "}
            or the{" "}
            <a
              href="/styleguides"
              className="underline decoration-dotted underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              style guides
            </a>{" "}
            while you iterate—every tweak teaches the engine what you want next.
          </p>
        </motion.div>

        <div
          className={cn(
            "grid gap-6 md:gap-8",
            "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          )}
          role="list"
          aria-label="External interactive tools"
        >
          {externalTools.map((tool, i) => {
            const gradient = tool.accent ?? "from-primary/30 to-secondary/50";
            return (
              <motion.a
                key={tool.id}
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                role="listitem"
                aria-label={tool.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={sectionVariants}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: [0.16, 0.8, 0.24, 1] }}
                whileHover={!prefersReduced ? { y: -8 } : undefined}
                className={cn(
                  "group relative flex flex-col rounded-2xl border border-border/50",
                  "bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm",
                  "p-5 md:p-6 transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                  "hover:shadow-lg hover:shadow-primary/10"
                )}
              >
                <div
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100",
                    "bg-gradient-to-br",
                    gradient
                  )}
                  style={{ maskImage: "radial-gradient(circle at 30% 20%, black, transparent 70%)" }}
                />

                <div className="relative z-10 flex items-center justify-between">
                  <span
                    className={cn(
                      "inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide",
                      "bg-black/10 text-foreground/70 dark:bg-white/10"
                    )}
                  >
                    {tool.tag ?? "Tool"}
                  </span>
                  <span
                    className={cn(
                      "inline-flex h-6 w-6 items-center justify-center rounded-full border border-border/40",
                      "text-xs text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary"
                    )}
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                  </span>
                </div>

                <h3
                  className={cn(
                    "relative z-10 mt-4 text-sm font-semibold leading-tight text-foreground",
                    "group-hover:text-primary transition-colors"
                  )}
                >
                  {tool.title}
                </h3>

                <p className="relative z-10 mt-3 text-xs leading-relaxed text-muted-foreground">
                  {tool.description}
                </p>

                <div className="relative z-10 mt-auto pt-4">
                  <div
                    className={cn(
                      "flex items-center gap-1 text-[11px] font-medium",
                      "text-primary/80 group-hover:text-primary"
                    )}
                  >
                    Open sandbox
                    <motion.span
                      aria-hidden="true"
                      initial={{ x: 0 }}
                      animate={!prefersReduced ? { x: [0, 4, 0] } : undefined}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="inline-block translate-y-px"
                    >
                      →
                    </motion.span>
                  </div>
                </div>

                {/* Soft overlay + edge lighting */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5",
                    "before:absolute before:inset-0 before:rounded-[inherit] before:bg-gradient-to-b",
                    "before:from-white/5 before:to-transparent before:opacity-0 before:transition-opacity",
                    "group-hover:before:opacity-100"
                  )}
                />
              </motion.a>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.6 }}
          className="mx-auto mt-16 max-w-xl text-center"
        >
          <p className="text-sm text-muted-foreground">
            These mini-surfaces form your rapid experimentation belt. Open, poke, observe, repeat.
            Every second not fighting boilerplate is a second spent shaping feel and flow. Reference{" "}
            <a
              href="/design/backgrounds"
              className="underline decoration-dotted underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              background systems
            </a>{" "}
            and audit consistency in{" "}
            <a
              href="/styleguides"
              className="underline decoration-dotted underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              style guides
            </a>{" "}
            as you refine.
          </p>
        </motion.div>
      </div>

      {/* Ambient animated blobs (decorative) */}
      {!prefersReduced && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute -left-10 top-1/3 h-60 w-60 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0.15, scale: 0.8 }}
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.8, 1.05, 0.8] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -right-4 bottom-1/4 h-72 w-72 rounded-full bg-secondary/10 blur-3xl"
            initial={{ opacity: 0.1, scale: 0.9 }}
            animate={{ opacity: [0.1, 0.3, 0.1], scale: [0.9, 1.1, 0.9] }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
};

export default ToolExplorer;
