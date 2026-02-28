# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Development (from project root /Volumes/Work/velvetalchemy.com)
npm run dev       # Start dev server with Turbopack at localhost:3000
npm run build     # Production build with Turbopack
npm start         # Start production server
npx tsc --noEmit  # Type check without emitting
```

Note: The project root is `/Volumes/Work/velvetalchemy.com` — there is **no** `src/` subdirectory.

## Tech Stack

- **Next.js 15** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v3** — do NOT upgrade to v4; `postcss.config.mjs` must use `{ tailwindcss: {}, autoprefixer: {} }` (not `@tailwindcss/postcss`)
- **Framer Motion v11** — section entrance animations via `AnimatedSection` wrapper in `app/page.tsx`
- **Embla Carousel v8** — used in hero (`ImageCarousel`) and available for other carousels
- **React 19 / Node 18** — `create-next-app@latest` requires Node 20+, use `create-next-app@15` if rebuilding

## Architecture

All content lives on a single homepage (`app/page.tsx`) with 9 sections rendered sequentially. There are no other page routes implemented yet — links to `/blog`, `/galleries`, `/about`, `/contact`, etc. are stubs.

**Data flow**: All site content (images, testimonials, blog posts) is hardcoded in `lib/data.ts`. All images are Unsplash URLs — `next.config.ts` only whitelists `images.unsplash.com`.

**Animations**: `lib/animations.ts` exports reusable Framer Motion variants (`fadeIn`, `slideInUp`, etc.). Sections are wrapped in `<AnimatedSection>` which uses `useInView` to trigger on scroll. CSS `@keyframes` in `globals.css` power the marquee and gallery scroll animations.

**Responsive breakpoint**: `md` is defined as `max-width: 768px` in `tailwind.config.ts` — it's an inverted (mobile-only) breakpoint, not the standard Tailwind min-width pattern.

## Branding & Typography

| Token | Value | Usage |
|-------|-------|-------|
| `font-mattone` | Local woff2, CSS var `--font-mattone` | Hero text, section headings, navbar logo |
| `font-cormorant` | Google, 300/400/600 + italic | Subtitles, testimonial quotes |
| `font-poppins` | Google, 300/400/500 | Body, nav, buttons |
| `font-instrument` | Google, italic | "Inquire" nav link |
| `pink` | `#FFCCF1` | Accent, hovers, marquee row 1 |
| `charcoal` | `#25261F` | Dark body text |
| `mist` | `#F0F2F4` | Testimonials section BG |
| `lavender` | `#E2E0E6` | Accent |

Mattone is loaded via `@font-face` in `globals.css` and set as a CSS variable on `<html>` in `app/layout.tsx`. Google fonts (Cormorant, Poppins, Instrument Serif) are loaded via `next/font/google` in layout.

**Button classes** (defined in `globals.css`): `.btn-primary` (black bg → pink hover), `.btn-outline` (white border), `.btn-outline-black` (black border). All are pill-shaped (`rounded-[40px]`), Poppins uppercase, `tracking-[0.2em]`.

**Section padding**: `.section-padding` = `px-[122px] md:px-6`.

## Key Component Notes

**`app/page.tsx`** — Contains three locally-defined functions: `HeroCarousel` (Embla + autoplay, portrait card 503×683px), `GalleryStrip` (CSS infinite scroll, duplicates `galleryImages` array for seamless loop), and `AnimatedSection` (Framer Motion scroll trigger wrapper). The hero marquee text sits at `zIndex: 2` above the carousel card (`zIndex: 1`).

**`components/layout/Header.tsx`** — Fixed, always white (no scroll transparency). Desktop splits nav left/center/right. Mobile uses full-screen overlay with `AnimatePresence`.

**`components/ui/ImageCarousel.tsx`** — Supports a `filmstrip` prop that renders a large center image with smaller thumbnails on each side (used in the hero).

**`globals.css` animation speeds**:
- `.animate-marquee-left`: 120s (hero "VELVET ALCHEMY" text)
- `.animate-marquee-right`: 30s (Marquee component bottom row)
- `.animate-gallery-scroll`: 80s (gallery strip)
