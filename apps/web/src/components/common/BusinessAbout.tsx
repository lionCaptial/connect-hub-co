import { AboutAccordion } from './AboutAccordion';
import { aboutContent, type AboutSectionId } from './aboutContent';

function SectionFlow({ flow }: { flow: string }) {
  return <p className="mt-4 font-semibold text-[var(--ch-ink)]">{flow}</p>;
}

function renderPanelBody(id: AboutSectionId) {
  switch (id) {
    case 'genesis': {
      const s = aboutContent.genesis;
      return (
        <div className="space-y-3 leading-7">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
            {s.headline}
          </h3>
          <p>{s.body}</p>
          <p>{s.foundationLine}</p>
          <SectionFlow flow={s.flow} />
        </div>
      );
    }
    case 'vision-mission': {
      const s = aboutContent.visionMission;
      return (
        <div className="space-y-6 leading-7">
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
              {s.visionTitle}
            </h3>
            <p className="mt-3">{s.vision}</p>
          </div>
          <div>
            <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
              {s.missionTitle}
            </h3>
            <p className="mt-3">{s.mission}</p>
          </div>
        </div>
      );
    }
    case 'four-businesses': {
      const s = aboutContent.fourBusinesses;
      return (
        <div className="space-y-8 leading-7">
          <p>{s.intro}</p>
          {s.businesses.map((biz) => (
            <article key={biz.name} className="border-t border-[var(--ch-hairline)] pt-6">
              <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
                {biz.name}
              </h3>
              <p className="mt-2 font-semibold text-[var(--ch-ink)]">{biz.tagline}</p>
              <p className="mt-3">{biz.body}</p>
              {biz.extra ? <p className="mt-3">{biz.extra}</p> : null}
            </article>
          ))}
        </div>
      );
    }
    case 'specialty': {
      const s = aboutContent.specialty;
      return (
        <div className="space-y-3 leading-7">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
            {s.headline}
          </h3>
          <p>{s.body}</p>
          <SectionFlow flow={s.flow} />
          <p className="font-semibold text-[var(--ch-ink)]">{s.premiumNote}</p>
          <p>{s.premiumValue}</p>
        </div>
      );
    }
    case 'philosophy': {
      const s = aboutContent.philosophy;
      return (
        <div className="space-y-3 leading-7">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
            {s.headline}
          </h3>
          <p>{s.body}</p>
          <p className="font-semibold text-[var(--ch-ink)]">{s.closingLine}</p>
        </div>
      );
    }
    case 'founder-principles':
      return (
        <ul className="grid gap-3">
          {aboutContent.founderPrinciples.map((item) => (
            <li key={item} className="border-b border-[var(--ch-hairline)] py-2 text-[var(--ch-ink)]">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'master-card-commitments':
      return (
        <ul className="grid gap-3 sm:grid-cols-2">
          {aboutContent.masterCardCommitments.map((item) => (
            <li key={item} className="border-b border-[var(--ch-hairline)] py-2 text-[var(--ch-ink)]">
              {item}
            </li>
          ))}
        </ul>
      );
    case 'evolving-together': {
      const s = aboutContent.evolvingTogether;
      return (
        <div className="space-y-3 leading-7">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
            {s.headline}
          </h3>
          <p>{s.body}</p>
          <SectionFlow flow={s.flow} />
        </div>
      );
    }
    case 'staying-true': {
      const s = aboutContent.stayingTrue;
      return (
        <div className="space-y-3 leading-7">
          <p>{s.body}</p>
          <p className="font-semibold text-[var(--ch-ink)]">{s.closingLine}</p>
        </div>
      );
    }
    case 'core-team': {
      const s = aboutContent.coreTeam;
      return (
        <div className="space-y-6 leading-7">
          <h3 className="font-[family-name:var(--font-display)] text-2xl font-bold text-[var(--ch-ink)]">
            {s.headline}
          </h3>
          <p>{s.intro}</p>
          <ul className="grid gap-5">
            {s.groups.map((group) => (
              <li key={group.role} className="border-t border-[var(--ch-hairline)] pt-4">
                <p className="font-semibold text-[var(--ch-ink)]">{group.role}</p>
                <ul className="mt-2 space-y-1">
                  {group.members.map((m) => (
                    <li key={`${m.name}-${m.location}`}>
                      {m.name}, {m.location}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      );
    }
    case 'advisory-board':
      return (
        <ul className="grid gap-3">
          {aboutContent.advisoryBoard.map((a) => (
            <li key={`${a.name}-${a.location}`} className="border-b border-[var(--ch-hairline)] py-2">
              {a.name} ({a.location})
            </li>
          ))}
        </ul>
      );
    default: {
      const _exhaustive: never = id;
      return _exhaustive;
    }
  }
}

export function BusinessAbout() {
  const { hero, sections, closing } = aboutContent;

  return (
    <main className="bg-[var(--ch-bg)] text-[var(--ch-ink)]">
      <section className="bg-[linear-gradient(165deg,#0b2430_0%,var(--ch-accent)_72%,#123a4f_100%)] px-[var(--ch-section-x)] py-[var(--ch-section-y)] text-[#f4f8fb]">
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold uppercase tracking-widest text-[var(--ch-accent-soft)]">
            {hero.eyebrow}
          </p>
          <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-display)] text-4xl font-bold sm:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-[color-mix(in_srgb,#f4f8fb_88%,transparent)]">
            {hero.body}
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-[color-mix(in_srgb,#f4f8fb_88%,transparent)]">
            {hero.support}
          </p>
          <p className="mt-6 max-w-3xl text-sm font-semibold tracking-wide text-[var(--ch-accent-soft)]">
            {hero.businessesLine}
          </p>
          <p className="mt-4 max-w-3xl leading-7 text-[color-mix(in_srgb,#f4f8fb_80%,transparent)]">
            {hero.closing}
          </p>
        </div>
      </section>

      <section className="px-[var(--ch-section-x)] py-[var(--ch-section-y)]">
        <div className="mx-auto max-w-6xl">
          <AboutAccordion
            panels={sections.map((section) => ({
              id: section.id,
              title: section.title,
              children: renderPanelBody(section.id),
            }))}
          />
        </div>
      </section>

      <section className="border-t border-[var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-[var(--ch-section-x)] py-[var(--ch-section-y)] [background-image:var(--ch-band-wash)]">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-[family-name:var(--font-display)] text-3xl font-bold">
            {closing.headline}
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--ch-ink-muted)]">{closing.body}</p>
          <p className="mt-6 font-semibold text-[var(--ch-ink)]">{closing.tagline}</p>
        </div>
      </section>
    </main>
  );
}
