# Portfolio Sandbox — Spec (KISS)

Goal: Showcase multiple Animate‑UI demos (tiles) on one page with a single control bar that can tweak common props (button text, play/stop, reset animations, clear inputs), with links back to detailed Animate‑UI docs for each demo. Keep changes isolated under `/portfolio` and reuse installed frameworks.

## Scope
- New route: `/portfolio/sandbox` (grid of preview tiles + control bar)
- Reuse components: `@workspace/ui` (buttons/inputs/toggles), motion defaults (spring: 150/22), animated icons (`@/registry/icons/*`)
- Do not modify global layout/nav or docs system. Keep styles local.

## Architecture
- SandboxProvider (context):
  - state: `{ playing: boolean; resetKey: number; buttonText: string; clearInputsToken: number }`
  - actions: `play()`, `stop()`, `toggle()`, `reset()`, `setButtonText(v)`, `clearInputs()`
  - optional URL sync via NuqsAdapter (no manual query string manipulation)
- ControlBar component:
  - UI: Play, Stop, Reset, Clear Inputs, Button Text input, link to Docs Index
  - Implemented with `@workspace/ui/components/ui/button`, `input`, `switch` as needed
- Tile API:
  - Tiles consume context via `useSandbox()` and respond to `playing`, `resetKey`, `clearInputsToken`, `buttonText`
  - Each tile shows: title, preview, “View details” link to Animate‑UI docs (e.g., `/docs/components/...`)
  - Keep each tile small and self‑contained; accept `id`, `title`, `docsHref`
- Layout & Styles:
  - Segment CSS module `sandbox.module.css` under `/portfolio/sandbox/`
  - Responsive grid with 2–3 cols desktop, 1 col mobile
  - Animation defaults preserved; disable heavy motion when `prefers-reduced-motion`

## Proposed Files
- `apps/www/app/portfolio/sandbox/layout.tsx` – wraps page with `SandboxProvider`
- `apps/www/app/portfolio/sandbox/page.tsx` – ControlBar + grid of Tiles
- `apps/www/app/portfolio/sandbox/sandbox-context.tsx` – provider + hook
- `apps/www/app/portfolio/sandbox/tiles/*` – individual tiles (buttons/text/effects)
- `apps/www/app/portfolio/sandbox/sandbox.module.css` – local styles

## Initial Tiles (MVP)
- Buttons Basics — animating on hover/press; respects `buttonText`
- Text Inputs — interactive inputs; respond to `clearInputs()`
- Warp Highlight — effect demo (space/stellar)
- Stellar/Orbit Icon — animated icons with `animateOnHover`

## Controls (MVP)
- Play — `playing = true`
- Stop — `playing = false`
- Reset — increments `resetKey` (tiles can key internal state off this)
- Clear Inputs — increments `clearInputsToken` (inputs reset when token changes)
- Button Text — string input, tiles read live

## Linking Back
- Each tile card includes a small secondary link: “View details →” to the relevant `/docs/...` page.

## Accessibility
- Keyboard navigable controls; focus visible rings
- Tiles use aria labels and avoid motion when `prefers-reduced-motion`

## Performance
- Lazy load heavier tiles via dynamic import if needed
- Avoid global state churn; keep provider minimal and stable

## Rollout Plan
1) Scaffolding: context, ControlBar, page and one Button tile
2) Add Text tile + Clear Inputs wiring
3) Add two effect/ icon tiles + docs links
4) Optional Nuqs URL state sync (`?playing=1&text=...`) via NuqsAdapter
5) Polish: responsive layout, tests for provider behavior (unit only if needed)

## Out of Scope (for now)
- Persisting sandbox state across sessions (can add later)
- Complex layout pickers or template switchers

---

## Open Questions
- Which Animate‑UI doc routes should we prioritize linking? Provide a short list and we’ll wire them first.
- Do you want a “Copy code” button on each tile? (easy to add from docs patterns)

