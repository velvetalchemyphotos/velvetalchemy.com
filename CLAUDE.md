# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Velvet Alchemy Photography — a fine art wedding photography portfolio. Static site built with Astro 6 and Tailwind CSS v4. Requires Node.js >=22.12.0.

## Commands

```bash
npm run dev       # Dev server at localhost:4321
npm run build     # Production build to ./dist/
npm run preview   # Preview production build locally
```

## Architecture

Single-page site (`src/pages/index.astro`) composed from modular Astro components. `BaseLayout.astro` wraps all pages with metadata, Google Fonts, and an IntersectionObserver for scroll animations.

**Scroll animations:** Add `data-animate="slide-left|slide-right|fade"` to elements. The observer in BaseLayout adds `.visible` on intersection.

**Image handling:** Uses Astro's `Image` component from `astro:assets`. Source images live in `src/assets/images/`.

**Custom fonts:** Mergian and Slight served from `public/fonts/`. Google Fonts (Fjalla One, Montserrat, Oswald, Lato) loaded in BaseLayout.

## Styling

Tailwind v4 with `@theme` block in `src/styles/global.css` defining:
- Custom colors: cream, dark-brown, coral, slate-blue, red variants
- Custom font families and animations (slide-left, slide-right, fade-in)

Mobile-first responsive design using `md:` breakpoint. Dark-themed sections (Process, Pricing, Credentials) use black backgrounds with light text.

## Design Language

Film-strip aesthetic throughout — dark borders, mono-spaced overlays referencing "Kodak Portra 400BW" and frame numbers. Warm accent palette (coral, cream, deep red) against dark backgrounds.
