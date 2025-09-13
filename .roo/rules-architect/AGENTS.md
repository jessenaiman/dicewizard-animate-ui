# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Critical Architecture Rules (Non-Obvious Only)

- **Monorepo Architecture**: Pnpm workspaces with turbo orchestration, apps/ and packages/ structure
- **Registry System Constraints**: Auto-generated `__registry__/index.tsx` from `scripts/build-registry.mts` - design around this
- **Path Transformation Dependencies**: Architecture relies on `@workspace/ui/` → `@/` and `@/registry/` → `@/components/animate-ui/` transformations
- **Animation Architecture**: Motion/react with standardized spring parameters (stiffness: 150, damping: 22) across components
- **State Management**: NuqsAdapter required for URL query state - architectural decision to avoid manual manipulation
- **Documentation Architecture**: Fumadocs integration with dark theme default, custom provider configuration
- **Component Architecture**: Animated Radix primitives with data-slot attributes for consistent styling
- **Build Pipeline**: Registry build requires format before/after - architectural constraint for consistency
- **Theme Architecture**: SuppressHydrationWarning on html for seamless theme switching
- **Font Architecture**: Outfit font loaded globally via Next.js font optimization
