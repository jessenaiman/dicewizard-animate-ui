# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Critical Documentation Rules (Non-Obvious Only)

- **Fumadocs Integration**: Uses Fumadocs for documentation with dark theme default, custom provider setup
- **Registry System Architecture**: Custom component registry with auto-generated `__registry__/index.tsx` via build script
- **Path Transformations**: Build process transforms `@/registry/` to `@/components/animate-ui/` and `@workspace/ui/` to `@/`
- **Animation Framework**: Motion/react with specific defaults (spring stiffness: 150, damping: 22) for consistency
- **Import Resolution**: Workspace packages use `@workspace/ui/` imports that transform during build
- **Query State Management**: NuqsAdapter handles URL state - not standard query string manipulation
- **Structured Data**: Custom JSON-LD injected via `apps/www/lib/json-ld.ts` in layout head
- **Component Naming**: Animated Radix components with `Collapsible`, `Tabs` etc. in `packages/ui/src/components/animate-ui/`
- **Screenshot Mode**: Hidden CSS class for video recordings exists in layout.tsx
