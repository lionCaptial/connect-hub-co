# About Page Accordion Redesign — Holy Yatra

**Date:** 2026-09-22  
**Status:** Approved for implementation planning  
**Scope:** Full rewrite of `/about` (`BusinessAbout`) with new Holy Yatra company story: always-visible hero, 11 accordion sections, always-visible closing  
**Approach:** Rewrite `BusinessAbout` in place; typed content module + small client accordion island  

## 1. Goal

Replace the current short Holy Yatra About page (vision / Why Gaya / founder principles / Service Assurance / human-first / LeadershipGovernance) with the approved Connect Hub Co. narrative, rebranded to **Holy Yatra**, presented as scannable dropdown sections.

## 2. Decisions locked

| Topic | Decision |
| --- | --- |
| Scope | Full `/about` rewrite (Approach 1: rewrite `BusinessAbout` in place) |
| Brand | User-facing copy uses **Holy Yatra**; draft “Connect Hub Co.” is outdated naming only |
| Product names | Keep PitruMoksha Gaya, Ritual Services, Personal Travel Assistance, Vahi Records |
| Interaction | Accordion / dropdown headings; one open at a time; all closed by default |
| Hero | Always visible; not a dropdown |
| Closing | Always visible; full Why Choose block including training note |
| Four businesses | One accordion row; four stacked text blocks inside; no card chrome; no outbound links this pass |
| Vision & Mission | One accordion row containing both |
| Master Card Commitments | Separate accordion row (after Founder Principles, before Evolving Together) |
| Core Team / Advisory | Names, roles, locations only; no photos or personal statements |
| Existing About extras | Remove Service Assurance links and `LeadershipGovernanceSection` |
| Visual tone | Existing public `--ch-*` tokens and About hero gradient pattern; no new theme |
| Out of scope | Photos, advisor domains/statements, service deep-links, homepage changes, shared accordion extraction library |

## 3. Information architecture

### 3.1 Page order

1. **Hero** (always visible)  
2. **Accordion** (11 rows, all closed by default, exclusive open)  
3. **Closing / Why Choose** (always visible)

### 3.2 Accordion rows (in order)

1. Genesis  
2. Vision & Mission  
3. Our Four Premium Businesses  
4. Our Specialty  
5. Our Philosophy: Timeless & True  
6. Founder Principles  
7. Our Master Card Commitments  
8. Evolving Together  
9. Staying True to Our Purpose  
10. The Core Team  
11. Advisory Board  

### 3.3 Removed from About composition

- Current “Our vision” / “Why Gaya” two-column block  
- Current founder-principles list (replaced by draft principles)  
- Service Assurance link band  
- Human-first, AI-assisted grid  
- `LeadershipGovernanceSection` import/usage  

## 4. Copy mapping

Brand rule: wherever the source draft says “Connect Hub Co.”, render **Holy Yatra**. Do not invent additional brand renames.

### 4.1 Hero

- **Eyebrow:** About Holy Yatra  
- **Headline:** We Look for What More a Service Can Become.  
- **Body:** Holy Yatra creates premium operational services for customers who value tradition, lawful processes, authenticity, privacy, personal attention and professional execution.  
- **Supporting paragraph:** We look beyond the conventional service to discover additional customer value, test what is practical, and build the expertise, people and capability required to deliver it.  
- **Business line:** PitruMoksha Gaya · Ritual Services · Personal Travel Assistance · Vahi Records  
- **Closing hero paragraph:** Within these boundaries, we develop the additional service layer around the customer's actual requirement—understanding what is needed, identifying what more can meaningfully be delivered, testing its practical feasibility, coordinating the appropriate people and resources, supporting the customer personally, and carrying the accepted scope through preparation, execution and completion.

### 4.2 Genesis

- **Title:** Genesis  
- **Headline:** What More Is Possible?  
- **Body:** Real customer requirements showed us that existing services could often deliver much more through deeper knowledge, personalization, better access and human assistance.  
- **Foundation line:** That became our foundation:  
- **Flow:** Discover Value → Test Feasibility → Build Capability → Deliver  

### 4.3 Vision & Mission

- **Our Vision:** To build a modern service company that brings tradition, lawful processes, specialist human expertise and technology together to create deeper, more accessible and professionally delivered services.  
- **Our Mission:** To discover meaningful possibilities within existing services and turn them into practical, professionally deliverable customer value. Preserve what must remain authentic, improve what can be improved, and make every added value practically deliverable.

### 4.4 Our Four Premium Businesses

- **Section intro (premium value):** Our premium value reflects the expertise, preparation, professional screening and verification, personalized assistance, specialized execution, coordination and responsibility required for each selected service, with applicable verification and due diligence conducted subject to lawful access, consent and relevant requirements.

**PitruMoksha Gaya**  
- **Tagline:** Tradition Supported by Lineage Intelligence.  
- **Body:** Family-specific ancestral services built around applicable Gotra, lineage, family tradition, Gayawal records and prescribed rites—with Virtual, Hybrid and Gaya-based participation where applicable. Sensitive family circumstances can receive Confidentiality-First coordination, Private Ancestral Rites, purpose-based information handling and controlled professional access. Know the lineage. Understand the requirement. Perform the prescribed duty with dignity.

**Ritual Services**  
- **Tagline:** Tradition Where It Matters. Modern Access Where It Helps.  
- **Body:** Beyond booking a priest, services are developed around the applicable Vedic/Shastric method, Gotra and Sankalp, family or customary tradition, prescribed mantra, samagri, offerings, preparation and appropriate priestly expertise. From customized and remotely accessible rituals to Legal e-Marriage, modern participation and lawful-process support are added where applicable without replacing the tradition or authority on which the service depends.

**Personal Travel Assistance**  
- **Tagline:** When a Travel Plan Is Not Enough, Put a Human Beside the Journey.  
- **Body:** Our Travel Companion / Shadow Assistance model adds real human support while allowing the traveller to remain independent. From mobility needs and difficult local situations to unexpected disruption or emergencies, assistance can extend to practical response, family communication and coordination with appropriate local, hospital or emergency services when required. Travel independently. Have someone there when it matters.

**Vahi Records**  
- **Tagline:** Discover the Journey, beyond finding one ancestral entry.  
- **Body:** Available traditional records can be cross-referenced across locations and generations to investigate lineage connections, differences, missing links and wider family history. The larger vision is to progressively collect, organize, preserve, interpret, translate and support permitted traditional genealogical and custodian-held information across locations such as Gaya Ji, Haridwar, Badrinath, Kashi and other relevant heritage centres. Subject to lawful access, record availability and applicable custodian permissions, this information can contribute to lineage mapping and ancestral heritage preservation.  
- **Extra line:** Last Visit — Auspicious Occasion | Mourning Occasion. Trace available records associated with marriages, births, pilgrimages, family ceremonies, ancestral rites, bereavement-related visits or occasions.

### 4.5 Our Specialty

- **Headline:** We Look for What More a Service Can Become.  
- **Body:** We examine an existing service, identify additional meaningful customer value, test its feasibility and build the capability required to deliver it.  
- **Flow:** Discover → Validate → Design → Build → Deliver  
- **Premium note:** Premium is not a label. It must be visible in the service delivered.  
- **Premium value paragraph:** Same wording as section 4.4 intro.

### 4.6 Our Philosophy: Timeless & True

- **Headline:** Preserve What Matters. Improve What Can Be Improved.  
- **Body:** We preserve the tradition, knowledge and lawful authority that must remain intact while improving access, participation, coordination and customer experience through human expertise and technology.  
- **Closing line:** Timeless in principle. Modern in delivery.

### 4.7 Founder Principles

- Dharma before profit  
- Trust before revenue  
- Transparency before marketing  
- Service before technology  
- Long-term value before short-term gain  

Do **not** carry forward the old About bullet “AI assists humans; it does not replace ritual authority” or “Long-term brand before short-term income”.

### 4.8 Our Master Card Commitments

Authenticity · Sanctity · Privacy · Confidentiality · Transparency · Professional Execution · Human Assistance · Traceable Service Journey  

Render as a clear list (not only a single run-on line), preserving the same terms.

### 4.9 Evolving Together

- **Headline:** Built to Learn. Designed to Improve.  
- **Body:** Customer needs, professional practices and technology continue to evolve. So do our services. We learn from real service experiences, customer feedback and professional insight to identify what can be improved, simplified or newly made possible—without compromising authenticity, lawful requirements or the purpose of the service.  
- **Flow:** Listen → Learn → Improve → Evolve  

### 4.10 Staying True to Our Purpose

- As we grow, we intend to expand our capabilities without compromising authenticity, lawful practice, privacy, personal attention or professional responsibility.  
- **Closing line:** Expand the capability. Preserve the purpose.

### 4.11 The Core Team

- **Headline:** People Behind the Service  
- **Intro:** Our Core Team brings together the people responsible for service design, customer assistance, professional coordination, operations and technology. Each role carries clear responsibility—from understanding customer requirements and preparing the service to coordinating its execution and supporting it through completion.  
- **People (name / location / role):**  
  - Kumar Dev, Pune — Co-Founder & CEO  
  - Shyam Kumar Saraogi, Bagaha — Legal Advisor  
  - Priyam (Gurugram), Ritu (Surat) — Head of Product  
  - Aman Kumar, Hyderabad — Head of Web-Engineering  
  - Navita Aggarwal (Nepal), Shishir Kumar (Bangalore), Mittali (Surat) — Head of Data & Marketing  

Shared roles: one role label with multiple people listed underneath or beside it. No photos.

### 4.12 Advisory Board

Names and locations only:

- Dr. K. K. Agarwal (Nepal)  
- Basant Goenka (Madras)  
- Dr. Muskan Saraogi (Pune)  
- Sangita Jhunjunwala (Kashi)  
- Gauri Singh (Gaya Ji)  

No photo, advisory domain, or personal statement in this pass.

### 4.13 Closing / Why Choose

- **Headline:** Four Businesses. One Growing Purpose.  
- **Body:** Today, we operate through four online businesses—PitruMoksha Gaya, Ritual Services, Personal Travel Assistance and Vahi Records. As we grow, we also plan to create free training opportunities for selected transgender individuals to build professional opportunities in Travel Assistance.  
- **Tagline:** Building Services | Creating Opportunities. | Staying True to Purpose.

### 4.14 Metadata

- **Title:** `About Us | Holy Yatra`  
- **Description:** `Holy Yatra creates premium operational services that bring tradition, lawful processes, specialist expertise and professional execution together for families who value authenticity, privacy and personal attention.`

## 5. Interaction design

- Exclusive accordion: at most one panel open.  
- Initial state: all panels closed.  
- Clicking the open panel’s header closes it.  
- Clicking another header opens that panel and closes the previous.  
- Accessibility: header is a `<button>`; `aria-expanded`; associated panel region; Enter/Space activate via native button behavior.  
- No auto-open of Genesis or any other row.

## 6. Visual design

- Reuse existing About public tokens (`--ch-bg`, `--ch-ink`, `--ch-accent`, hairlines, display font, section spacing).  
- Hero keeps the existing dark accent gradient band pattern; copy only changes.  
- Accordion: full-width rows with hairline separators and a chevron/indicator; expanded body uses page background (no nested card shells).  
- Four businesses inside their panel: stacked blocks separated by spacing/hairlines only.  
- Closing: simple text band consistent with elevated/hairline page language.  
- Do not introduce a new color theme, card grid for businesses, or photo tiles.

## 7. Technical design

### 7.1 Files

| File | Change |
| --- | --- |
| `apps/web/src/app/about/page.tsx` | Metadata description refresh; still wraps `BusinessAbout` in `PublicHeroShell` |
| `apps/web/src/components/common/BusinessAbout.tsx` | Full rewrite: hero + accordion + closing |
| `apps/web/src/components/common/aboutContent.ts` | Typed static content for hero, sections, people, closing |
| `apps/web/src/components/common/AboutAccordion.tsx` | Client island: local open-id state for exclusive accordion |

### 7.2 Component boundaries

- Server-friendly page shell remains.  
- Only accordion interaction needs `"use client"`.  
- Content strings live in the content module, not hard-coded deep inside nested JSX where avoidable.  
- No dependency on `LeadershipGovernanceSection` after rewrite.

### 7.3 Error handling / empty states

Static marketing page; no async data. If a content array is empty in code, render nothing for that list (should not happen with locked copy).

## 8. Testing / success criteria

- `/about` renders hero → 11 accordion headers → closing.  
- All accordion panels start closed; only one can be open.  
- No “Connect Hub Co.” string appears in About UI copy.  
- Service Assurance band and LeadershipGovernance are gone from About.  
- Core Team and Advisory show names/locations/roles only (no photo/statement UI).  
- Mobile and desktop: accordion headers remain usable; hero/closing remain readable.  
- Existing public shell (nav/footer via `PublicHeroShell`) unchanged by this pass.

## 9. Non-goals

- Replacing brand config in `publicBrand.ts` beyond About page copy usage  
- Building a shared design-system accordion package for other pages  
- Linking each business block to a service route  
- Advisor photo/domain/statement CMS  
- Homepage accordion work  
