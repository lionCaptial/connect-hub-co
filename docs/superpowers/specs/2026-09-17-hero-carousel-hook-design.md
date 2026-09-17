# Hero Carousel Hook + Sacred Cinema — Holy Yatra

**Date:** 2026-09-17  
**Status:** Approved for implementation planning  
**Scope:** Rewrite home hero carousel copy (headline, support, CTA labels) and elevate hero visuals/motion for engagement and retention  
**Primary files:** `apps/web/src/features/home-landing/content.ts`, `HomeHero.tsx`, `HomeLanding.module.css`

## 1. Goal

Replace descriptive, low-hook hero copy with devotion + trust storytelling, and make the carousel feel like “sacred cinema” — full-bleed art, clearer hierarchy, intentional motion — so visitors pause, feel the duty, trust the path, and click through.

## 2. Decisions locked

| Topic | Decision |
| --- | --- |
| Emotional mix | Devotion & duty (A) + certainty & trust (B) |
| Audience | Both diaspora and in-India families (distance first, then verified local certainty) |
| Copy depth | Full rewrite: headline, support, CTA labels |
| Visual approach | Sacred cinema (full-bleed retained; directional overlay; copy motion; CTA polish; progress dots) |
| Brand line | Keep `Holy Yatra` as the dominant hero brand signal |
| Routes / images | Keep existing `cta.href`, slide order, image `src` / `alt` (alts may be lightly tuned if needed for accuracy) |
| Out of scope | New hero photography; redesign of Service Assurance / Final Enquire; floating badges/chips/cards in the hero; changes to `homepageHeroSlides.ts` (legacy/alternate hero data) |

## 3. Copy pattern

Per slide:

1. **Headline** — felt devotion hook (stops the scroll).
2. **Support** — one sentence ending in a trust closer (privacy, verified, clear path, honest limits).
3. **CTA** — calm next-step language (not hard-sell).

Brand line above the headline remains `PUBLIC_BRAND.name` / `Holy Yatra`.

## 4. Approved slide copy

### 4.1 PitruMoksha Gaya

- **Headline:** When you can’t reach Gaya, devotion still can.
- **Support:** Coordinate ancestral rites online or in person — with privacy, sanctity, and a path you can follow.
- **CTA:** Find your PitruMoksha path

### 4.2 Ritual Services

- **Headline:** Every rite deserves a priest you can trust.
- **Support:** From sankalp to completion — verified priests, clear coordination, whether you’re here or far away.
- **CTA:** See ritual pathways

### 4.3 Travel Assistance

- **Headline:** The journey to the tirtha shouldn’t feel uncertain.
- **Support:** Pilgrimage support across India and Nepal — practical help, respectful guidance, fewer unknowns.
- **CTA:** Plan sacred travel

### 4.4 Vahi Records

- **Headline:** Your lineage is waiting to be found.
- **Support:** Guided Gotra and Vahi (Panji) assistance with authorised custodians — careful, honest, never overpromised.
- **CTA:** Begin lineage search

### 4.5 Verified Priest

- **Headline:** Faith needs partners who honour it.
- **Support:** Join a network built on authenticity and accountability — so families find you with confidence.
- **CTA:** Join as Verified Priest

## 5. Visual & motion (Sacred cinema)

### 5.1 Layout & hierarchy

- Keep full-bleed carousel and existing art aspect-ratio behavior (desktop ratio; mobile `aspect-ratio: auto` / contain rules).
- Soft **directional overlay** (darker on the copy side / bottom, clearer over ritual imagery) replacing a flat uniform dim where needed.
- **Brand** stays the largest type; **headline** secondary but larger/more readable than current support-led hierarchy; **support** ~max 40ch for scanability.
- Single CTA pill — stronger accent contrast; subtle hover lift; optional trailing arrow with nudge on hover/focus.

### 5.2 Motion (respect `prefers-reduced-motion`)

1. Keep image crossfade; add **fade-up of copy** on slide change (~400ms).
2. CTA **arrow nudge** on hover/focus.
3. Autoplay **progress fill** on the active indicator over `AUTOPLAY_MS` (6000ms); reset on manual nav / pause.

### 5.3 Controls

- Quieter arrow chrome, larger hit targets.
- Active indicator: elongated pill with progress fill instead of only a static fat white dot.

### 5.4 Explicit non-goals

- No cards in the hero.
- No floating badges, promo chips, or overlay stickers on media.
- No split text/image layout that breaks full-bleed.

## 6. Implementation surface

| File | Change |
| --- | --- |
| `features/home-landing/content.ts` | Update `slides[].headline`, `support`, `cta.label` to approved copy |
| `features/home-landing/components/HomeHero.tsx` | Copy enter animation on index change; progress timing wired to autoplay; CTA arrow markup if needed |
| `features/home-landing/HomeLanding.module.css` | Directional overlay, type hierarchy, CTA, controls, progress indicator, reduced-motion overrides |
| `features/home-landing` / home-landing tests | Update string assertions for new copy and any new a11y labels |

Do **not** require changes to `homepageHeroSlides.ts` for this homepage carousel (live path is `homeLandingContent` → `HomeHero`).

## 7. Accessibility

- Preserve carousel roles, arrow keys, pause on hover/focus, and `aria-live` for slide text.
- Progress indicator must not rely on color alone; active state remains distinguishable when motion is reduced (static elongated pill OK).
- Focus-visible styles remain on CTA, arrows, and dots.
- Contrast: text on overlay must remain readable on all five hero images.

## 8. Success criteria

- Each slide opens with a hook, not a service brochure line.
- Brand remains the strongest first-viewport word after removing nav.
- Visitors get a clear calm CTA per slide; hrefs unchanged.
- Motion adds presence without noise; reduced-motion users get instant, non-animated transitions.
- Desktop and mobile remain usable; no new hero assets required.
