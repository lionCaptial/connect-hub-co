# Service Assurance Hook Redesign — Holy Yatra

**Date:** 2026-09-17  
**Status:** Approved for implementation planning  
**Scope:** Collapse home “Our Service Assurance” from a four-card image grid into one full-bleed, single-image hook band  
**Image:** Only `/images/assurance/special-advantage.jpg`

## 1. Goal

Replace the multi-card Service Assurance grid with a high-hook cinematic section that sells personal fit in one glance — one image, one promise, no card clutter.

## 2. Decisions locked

| Topic | Decision |
| --- | --- |
| Content scope | Special Advantage only; drop the other three cards |
| Image | Only `special-advantage.jpg` |
| Section title pattern | Eyebrow = Our Service Assurance; new personal-fit headline leads |
| Hook theme | Personal fit — family, place, preferred way to participate |
| Layout approach | Full-bleed cinematic band with copy over image |
| CTA | None in this section |
| Out of scope | New photography, hero changes, Final Enquire, new CTAs |

## 3. Layout & visual

- Remove the 2×2 card grid and per-item images/numbers/lotus overlays.
- One full-bleed band: edge-to-edge `special-advantage.jpg`.
- Target height: roughly 70–85vh on desktop; shorter but still dominant on mobile.
- Copy over image, left-aligned: eyebrow → display headline → one supporting sentence.
- Dark gradient wash from left and/or bottom for text contrast.
- No floating badges, chips, numbered callouts, or cards.
- Motion (respect `prefers-reduced-motion`): subtle image scale / ken-burns feel; text fade-up when the section enters view.

## 4. Copy (approved)

- **Eyebrow:** Our Service Assurance  
- **Headline:** Shaped around your family — not a fixed path.  
- **Body:** Pathways adapt to your needs, location, and how you want to take part.  
- **Image alt:** Clear description of the Special Advantage visual (family-centered / personal pathway context).

## 5. Information architecture

### 5.1 Content shape

`homeLandingContent.assurance` becomes a single object:

- `eyebrow`
- `heading` (hook headline)
- `body`
- `image: { src, alt }`

Drop `items[]` and the three unused image paths from content.

### 5.2 Anchors / deep links

Current IDs (`our-assurance`, `hassle-free-journey`, `peace-of-mind`, `special-advantage`) are removed with the cards.

- Section id: `service-assurance`
- Update links in `BusinessAbout.tsx` and `BusinessFooter.tsx` from the four `/#…` anchors to a single entry: label **Service Assurance**, href `/#service-assurance`

## 6. Implementation surface

| File | Change |
| --- | --- |
| `ServiceAssuranceSection.tsx` | Rewrite as single-band section |
| `ServiceAssuranceSection.module.css` | Full-bleed cinematic styles; remove card grid |
| `content.ts` | Slim assurance content to single story + one image |
| `BusinessAbout.tsx` | Point assurance links to `/#service-assurance` |
| `BusinessFooter.tsx` | Same |
| `home-landing` tests | Update assertions for new content/structure |

`HomeLanding.tsx` keeps importing `ServiceAssuranceSection`; no page-order change.

## 7. Success criteria

- Section stops the scroll with one dominant image and a clear personal-fit hook.
- Only Special Advantage artwork appears.
- Text remains readable on the photo on desktop and mobile.
- Reduced-motion users get no ken-burns / scale animation.
- Old four-card anchors no longer 404 as dead hashes; nav reaches the new section.
- Homepage composition otherwise unchanged.
