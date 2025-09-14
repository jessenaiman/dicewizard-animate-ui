# Portfolio Workbench

This subtree is isolated from the main site. It avoids changes to `app/(home)/page.tsx`, `app/layout.tsx`, global styles, and the registry.

## Structure

- `/portfolio` – landing
- `/portfolio/resume` – resume (MDX)
- `/portfolio/examples` – demo pages converted from Astro → MDX
- `/portfolio/nebulix` – fantasy‑themed blog import (Homebrewery‑like)
- `/portfolio/essays` – philosophy/life essays with a space theme
- `/portfolio/icons` – integrated icons from UI package + animated registry
- `/portfolio/assets` – local images/assets for this section only

## Content

- Put `.mdx` pages directly under each route. Keep images in `assets`.
- For blogs, you can create subfolders per year (`/essays/2025/...`) and add `.mdx` pages.

## Dev

- Local: `pnpm --filter animate-ui dev` and open `/portfolio`.
- Vercel Preview: set `NEXT_PUBLIC_PORTFOLIO=1` to redirect `/` → `/portfolio` for the branch.

## Notes

- Do not edit `/registry` or `/__registry__` here; it is auto‑generated.
- Keep imports from `@workspace/ui` and `@/registry/icons/*` for icons.

