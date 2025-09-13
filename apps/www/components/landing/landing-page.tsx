'use client';

import { useReducedMotion } from 'motion/react';

import HeroLanding from "@/components/landing/hero-landing";
import { ToolExplorer } from "@/components/landing/tool-explorer";
import WorkshopValue from "@/components/landing/workshop-value";
import SandboxTeaser from "@/components/landing/sandbox-teaser";
import ProfessionalPathways from "@/components/landing/professional-pathways";
import PricingTiers from "@/components/landing/pricing-tiers";
import { ResourceCards } from "@/components/landing/resource-cards/resource-cards";
import ClosingCta from "@/components/landing/closing-cta";
import { useParticlePositions } from "@/hooks/use-particle-positions";

// Animation helpers (kept simple for type safety)
const sectionFade = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 }
};

function LandingPageContent() {
  const reduce = useReducedMotion();
  const positions = useParticlePositions();
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
          {/* Skip link for keyboard users */}
          <a
            href="#main-hero-heading"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-sm focus:text-primary-foreground"
          >
            Skip to main content
          </a>
      {/* Background handled by root layout */}

      <div className="relative z-10">
        {/* Main Flow (layout provides <main>) */}
        <div className="pt-10 md:pt-12">
          {/* HERO */}
          <HeroLanding />

          {/* TOOL EXPLORER */}
          <div
            id="tool-explorer-wrapper"
            className="opacity-100 translate-y-0"
          >
            <ToolExplorer />
          </div>

          {/* WORKSHOP VALUE */}
          <div
            className="opacity-100 translate-y-0"
          >
            <WorkshopValue />
          </div>

            {/* SANDBOX TEASER */}
          <div
            className="opacity-100 translate-y-0"
          >
            <SandboxTeaser />
          </div>

          {/* PROFESSIONAL PATHWAYS */}
          <div
            className="opacity-100 translate-y-0"
          >
            <ProfessionalPathways />
          </div>

          {/* PRICING */}
          <div
            className="opacity-100 translate-y-0"
          >
            <PricingTiers />
          </div>

          {/* EXTENDED RESOURCES */}
          <section
            className="opacity-100 translate-y-0 py-10 md:py-20"
            aria-labelledby="extended-resources-heading"
          >
            <ResourceCards />
          </section>

          {/* CLOSING CTA */}
          <div
            className="opacity-100 translate-y-0"
          >
            <ClosingCta />
          </div>
        </div>
      </div>

      {/* Decorative floating particles (disabled when user prefers reduced motion) */}
      {!reduce && (
        <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
          {positions.map((position: { left: string; top: string }, i: number) => (
            <div
              key={`${position.left}-${position.top}-${i}`}
              className="absolute w-1 h-1 bg-primary/20 rounded-full"
              style={{
                left: position.left,
                top: position.top,
                transform: 'scale(0)'
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return <LandingPageContent />;
}
