"use client";

import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";

interface PricingTiersProps {
  className?: string;
  id?: string;
}

interface Tier {
  id: string;
  name: string;
  tagline: string;
  price: string;
  period?: string;
  highlight?: boolean;
  features: string[];
  cta: string;
  note?: string;
}

const tiers: Tier[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "Experiment Mode",
    price: "$0",
    period: "",
    features: [
      "Public sandbox access",
      "Component variant previews",
      "Limited exports (5 / day)",
      "Community tips feed",
      "Basic motion presets",
    ],
    cta: "Start Free",
    note: "Great for casual exploration",
  },
  {
    id: "builder",
    name: "Builder",
    tagline: "Focused Output",
    price: "$—",
    period: "/month",
    highlight: true,
    features: [
      "Private sessions",
      "Unlimited clean exports",
      "Custom component extraction",
      "Performance + a11y pass",
      "Variant diff snapshots",
      "Priority feature voting",
    ],
    cta: "Request Access",
    note: "Most popular for product teams",
  },
  {
    id: "partner",
    name: "Partner",
    tagline: "Embedded Velocity",
    price: "$—",
    period: "/engagement",
    features: [
      "Strategic design-engineering advisory",
      "Bespoke tooling scripts",
      "Design → code pipeline audits",
      "Custom token system alignment",
      "Async iteration reports",
      "Retained rapid prototype sprints",
    ],
    cta: "Open Conversation",
    note: "Tailored collaboration",
  },
];

export const PricingTiers: React.FC<PricingTiersProps> = ({ className, id = "pricing" }) => {
  const reduce = useReducedMotion();

  return (
    <section
      id={id}
      aria-labelledby="pricing-heading"
      className={cn(
        "relative py-28 md:py-36 overflow-hidden",
        "after:pointer-events-none after:absolute after:inset-0 after:bg-gradient-to-b after:from-primary/5 after:via-transparent after:to-secondary/5",
        className
      )}
    >
      <div className="container mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.45 }}
          transition={{ duration: 0.65, ease: [0.16, 0.8, 0.24, 1] }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-primary/10 px-4 py-1 text-[11px] font-medium uppercase tracking-wide text-primary/90 backdrop-blur-sm">
            Service Levels
          </div>
          <h2
            id="pricing-heading"
            className="mt-6 bg-gradient-to-b from-foreground via-foreground/90 to-foreground/60 bg-clip-text text-transparent text-3xl md:text-5xl font-extrabold tracking-tight"
          >
            Choose Acceleration Intensity
          </h2>
          <p className="mt-6 text-base md:text-lg text-muted-foreground">
            Start playful. Scale into focused output. Embed sustained momentum when you need a
            design-engineering multiplier. Reference{" "}
            <a
              href="/design"
              className="underline decoration-dotted underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              design systems
            </a>{" "}
            and audit implementation patterns in{" "}
            <a
              href="/styleguides"
              className="underline decoration-dotted underline-offset-4 hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 rounded-sm"
            >
              style guides
            </a>{" "}
            as you scale.
          </p>
        </motion.div>

        <div
          className={cn(
            "grid gap-6 md:gap-8",
            "grid-cols-1 md:grid-cols-3",
            "items-stretch"
          )}
          role="list"
          aria-label="Pricing tiers"
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.id}
              role="listitem"
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.55, ease: [0.16, 0.8, 0.24, 1] }}
              className={cn(
                "relative flex flex-col rounded-3xl border border-border/50 p-6 md:p-8",
                "bg-gradient-to-br from-background/60 to-background/30 backdrop-blur-sm",
                tier.highlight
                  ? "ring-2 ring-primary/30 shadow-lg shadow-primary/10"
                  : "hover:shadow-md hover:shadow-primary/5 transition-shadow",
                "overflow-hidden"
              )}
            >
              {/* Glow */}
              <div
                aria-hidden="true"
                className={cn(
                  "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-600",
                  "bg-gradient-to-br from-primary/15 via-transparent to-secondary/20",
                  tier.highlight ? "opacity-100" : "group-hover:opacity-100"
                )}
                style={{ maskImage: "radial-gradient(circle at 30% 25%, black, transparent 70%)" }}
              />
              {tier.highlight && (
                <span className="absolute right-4 top-4 inline-flex items-center rounded-full bg-primary/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-wide text-primary/90 ring-1 ring-primary/30">
                  Popular
                </span>
              )}

              <div className="relative z-10">
                <h3 className="text-sm font-semibold tracking-wide text-primary/80">
                  {tier.tagline}
                </h3>
                <p className="mt-2 text-xl font-semibold text-foreground">{tier.name}</p>

                <div className="mt-5 flex items-end gap-1">
                  <span className="text-3xl font-extrabold tracking-tight text-foreground">
                    {tier.price}
                  </span>
                  {tier.period && (
                    <span className="pb-1 text-xs font-medium text-muted-foreground">
                      {tier.period}
                    </span>
                  )}
                </div>

                {tier.note && (
                  <p className="mt-3 text-[11px] font-medium text-muted-foreground">
                    {tier.note}
                  </p>
                )}

                <ul className="mt-6 space-y-3 text-xs">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-muted-foreground">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/70" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-8">
                  <a
                    href="/contact"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50",
                      tier.highlight
                        ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40"
                        : "border border-border/60 bg-background/60 text-foreground backdrop-blur-sm hover:border-border"
                    )}
                  >
                    {tier.cta}
                    <span className="inline-block translate-y-px transition-transform group-hover:translate-x-0.5">
                      →
                    </span>
                  </a>
                </div>
              </div>

              {!reduce && (
                <motion.span
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/10 blur-2xl"
                  initial={{ opacity: tier.highlight ? 0.4 : 0.15, scale: 0.85 }}
                  animate={{
                    opacity: tier.highlight
                      ? [0.4, 0.6, 0.4]
                      : [0.15, 0.3, 0.15],
                    scale: [0.85, 1.05, 0.85],
                  }}
                  transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
                />
              )}
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto mt-14 max-w-xl text-center text-xs text-muted-foreground"
        >
          Pricing values shown as placeholders while packaging final access tiers. Custom / hybrid models
          available for teams with unique pipeline constraints.
        </motion.p>
      </div>

      {!reduce && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute left-[8%] top-[18%] h-48 w-48 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0.18, scale: 0.85 }}
            animate={{ opacity: [0.18, 0.34, 0.18], scale: [0.85, 1.05, 0.85] }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute right-[10%] bottom-[12%] h-60 w-60 rounded-full bg-secondary/10 blur-3xl"
            initial={{ opacity: 0.16, scale: 0.9 }}
            animate={{ opacity: [0.16, 0.3, 0.16], scale: [0.9, 1.08, 0.9] }}
            transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      )}
    </section>
  );
};

export default PricingTiers;
