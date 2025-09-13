# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Critical Debug Rules (Non-Obvious Only)

- **Screenshot Mode**: Uncomment `screenshot-mode` class in `apps/www/app/layout.tsx` for cleaner video recordings
- **Hydration Warnings**: html element has `suppressHydrationWarning` - expected for theme switching
- **Registry Build Formatting**: `pnpm registry:build` requires formatting before/after - check formatted output
- **Animation Debugging**: Motion/react components use specific spring values (stiffness: 150, damping: 22) for consistent behavior
- **Import Resolution**: `@workspace/ui/` imports are resolved to `@/` during build - check transformed paths
- **Query State Debugging**: Use NuqsAdapter - avoid direct URL manipulation that could break state
- **Auto-generated Registry**: `__registry__/index.tsx` regenerates during build - debug changes there if needed
