# Legal Policies & Client Service Agreement — Design

**Date:** 2026-09-16  
**Status:** Approved in brainstorming; pending user review of this written spec  
**Approach:** MDX pages + thin React shells (Approach 1)

## Goal

Replace the current combined / generated legal surfaces with three standalone locked policy pages and a Client Service Agreement template in the service journey, using the Founder-provided legal copy as source content.

## Decisions locked in brainstorming

| Topic | Decision |
|-------|----------|
| Scope | Full overhaul (standalone Privacy, Booking Terms, Cancellation & Refund) + CSA template in service journey |
| Dates | Effective Date omitted until go-live; **Last Updated: 2026** (year only) on all three policies |
| Routing | Clean cut: named routes are canonical; old mega/refund/terms URLs permanently redirect |
| CSA depth this pass | Template only — placeholders; Accept is UI-only / not persisted |
| Privacy checkboxes | Interactive on the Privacy page; local state only; not submitted |
| CSA location | `/service-journey/quotation-agreement` only (no separate public CSA legal page) |
| Authoring | MDX content files rendered by App Router pages |
| Old general website Terms | Dropped from the public site for this pass |

## Routes & redirects

### Canonical locked pages

| Page | Route |
|------|-------|
| Privacy Policy | `/privacy-policy` |
| Booking Terms & Conditions | `/booking-terms` |
| Cancellation & Refund Policy | `/cancellation-policy` |

### CSA template (not a locked legal page)

| Page | Route |
|------|-------|
| Client Service Agreement template | `/service-journey/quotation-agreement` |

### Permanent redirects

| From | To |
|------|----|
| `/refund-policy` | `/cancellation-policy` |
| `/policies-and-legal-terms` | `/privacy-policy` |
| `/policies-legal-terms` | `/privacy-policy` |
| `/terms` | `/booking-terms` |

### In-copy and site links

| Label | Target |
|-------|--------|
| Contact Us | `/contact` |
| Track Service Request | `/tracking` |
| Raise Complaint | `/complaint` |
| Grievance Redressal | `/grievance` |
| Founder Support | `/founder-support` |
| Our Privacy Policy | `/privacy-policy` |
| Booking Terms & Conditions | `/booking-terms` |
| Cancellation & Refund Policy | `/cancellation-policy` |

### Policy footer meta

- **Effective Date:** omitted on all three locked policies  
- **Last Updated:** `2026`

## Content & rendering architecture

### Source of truth

Legal copy lives as MDX under `apps/web/content/legal/`:

- `privacy-policy.mdx`
- `booking-terms.mdx`
- `cancellation-refund-policy.mdx`
- `client-service-agreement.mdx` (consumed by the service-journey step)

Content is the Founder-provided draft from the implementation request, with Section 1 link targets and date rules applied.

### Rendering shell

- Shared legal MDX page shell wrapping `PublicHeroShell` and existing legal document styles (title, heading-derived TOC where useful, document footer).
- Each Next.js App Router page for the three policies imports its MDX and renders it through that shell.
- Live path no longer depends on Word-generated `policiesDocument.ts` / `refundDocument.ts` or `scripts/generate-legal-documents.py` for these pages. Implementation should remove or stop shipping those live dependencies as part of the clean cut (redirects remain for old URLs).

### Tooling

- Add MDX support to `apps/web` (not present today) so `content/legal/*.mdx` can be imported by App Router pages.

### Interactive client islands

**Privacy Policy**

- Two checkboxes (general consent; parent/lawful-guardian consent) are interactive.
- State is local only; no form submit, no API, no persistence.

**Client Service Agreement**

- Checkbox required before Accept is enabled.
- Accept records a local-only “Accepted On” datetime and a static draft agreement version in the browser UI.
- No API / database write.
- Agreement Details / Agreed Service / Price / Acceptance identity fields render as visible placeholders (e.g. `[AUTO-FILLED]`, `[SERVICE]`, `[AMOUNT]`), not live Service Request data.

## Service journey CSA UI

- `/service-journey/quotation-agreement` is no longer only the generic step-list `ServiceJourneyPage` content.
- It presents journey chrome as needed (eyebrow / prev-next) plus the full Client Service Agreement template from MDX.
- Internal CSA policy links use the canonical routes above.
- Payment and fulfilment journey pages are unchanged except for any link target updates required by the clean cut.

## Site wiring updates

Update references so canonical URLs are consistent:

- `ROUTES` / navigation config
- Footer and Khem nav entries that still point at `/refund-policy` or mega policies
- Complaint and partner registration forms that link to `/terms` and/or `/privacy-policy`
- AI knowledge / knowledge-center policy links (verify against Section 1 routes)

## Testing (lightweight)

- Three locked policy routes render the new MDX content.
- Old URLs permanently redirect as specified.
- Contact / Tracking / Complaint / Grievance / Founder Support / cross-policy links resolve.
- Privacy checkboxes toggle without persistence.
- CSA Accept remains local-only.

## Out of scope

- Persisting CSA acceptance to backend/URMS
- Real auto-fill from Service Request / Quotation / Agreement records
- PDF / printable accepted-agreement export
- Wiring privacy consent checkboxes into real booking or registration forms as the legal basis of processing
- Setting Effective Date go-live values
- Restoring a separate general website Terms & Conditions page
- Payment gateway changes

## Success criteria

1. Visitors can open Privacy, Booking Terms, and Cancellation & Refund as standalone locked pages with the new copy and year-only Last Updated.
2. Legacy legal URLs do not serve conflicting old text; they redirect to the new canonicals.
3. Quotation & Agreement step shows the CSA template with placeholders and non-persisted Accept UI.
4. Legal copy is editable as MDX without regenerating Word masters for the live path.
