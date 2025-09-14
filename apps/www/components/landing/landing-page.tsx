'use client';

import { motion, useReducedMotion } from 'motion/react';

import HeroLanding from '@/components/landing/hero-landing';
import { ToolExplorer } from '@/components/landing/tool-explorer';
import WorkshopValue from '@/components/landing/workshop-value';
import SandboxTeaser from '@/components/landing/sandbox-teaser';
import ProfessionalPathways from '@/components/landing/professional-pathways';
import PricingTiers from '@/components/landing/pricing-tiers';
import { ResourceCards } from '@/components/landing/resource-cards/resource-cards';
import ClosingCta from '@/components/landing/closing-cta';
import { useParticlePositions } from '@/hooks/use-particle-positions';
import './landing.css';

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
      {/* Background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background/0 via-background/40 to-background" />
      </div>

      <div className="relative z-10">
        {/* Main Flow (layout provides <main>) */}
        <div className="pt-10 md:pt-12">
          {/* HERO */}
          <HeroLanding />

          {/* TOOL EXPLORER */}
          <div id="tool-explorer-wrapper" className="opacity-100 translate-y-0">
            <ToolExplorer />
          </div>

          {/* WORKSHOP VALUE */}
          <div className="opacity-100 translate-y-0">
            <WorkshopValue />
          </div>

          {/* SANDBOX TEASER */}
          <div className="opacity-100 translate-y-0">
            <SandboxTeaser />
          </div>

          {/* PROFESSIONAL PATHWAYS */}
          <div className="opacity-100 translate-y-0">
            <ProfessionalPathways />
          </div>

          {/* PRICING */}
          <div className="opacity-100 translate-y-0">
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
          <div className="opacity-100 translate-y-0">
            <ClosingCta />
          </div>
        </div>
      </div>

      {/* Ambient accent shapes */}
      {!reduce && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
        >
          <motion.div
            className="absolute left-[10%] top-[25%] h-40 w-40 rounded-full bg-primary/10 blur-3xl"
            initial={{ opacity: 0.15, scale: 0.8 }}
            animate={{ opacity: [0.15, 0.35, 0.15], scale: [0.8, 1.05, 0.8] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute right-[8%] bottom-[20%] h-56 w-56 rounded-full bg-secondary/10 blur-3xl"
            initial={{ opacity: 0.12, scale: 0.85 }}
            animate={{
              opacity: [0.12, 0.3, 0.12],
              scale: [0.85, 1.07, 0.85],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      )}

      {/* Decorative floating particles */}
      {!reduce && (
        <div
          className="absolute inset-0 z-0 pointer-events-none"
          aria-hidden="true"
        >
          {positions.map(
            (position: { left: string; top: string }, i: number) => (
              <div
                key={`${position.left}-${position.top}-${i}`}
                className="absolute w-1 h-1 bg-primary/20 rounded-full"
                style={{
                  left: position.left,
                  top: position.top,
                  transform: 'scale(0)',
                }}
              />
            ),
          )}
        </div>
      )}
    </div>
  );
}

export default function LandingPage() {
  return <LandingPageContent />;
}
