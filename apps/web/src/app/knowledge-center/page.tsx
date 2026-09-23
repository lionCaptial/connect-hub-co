import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { KNOWLEDGE_GUIDE_CARDS } from '@/features/knowledge-center/knowledge-guides';
import { PublicCatalog } from '@/components/service-catalog/PublicCatalog';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Knowledge Center | Holy Yatra',
  description: 'Authentic guidance, ancestral rites knowledge, Vedic tradition protocols, service explanations, tracking help, and FAQs.',
};

export default function KnowledgeCenterPage() {
  return (
    <PublicHeroShell>
      <main className="bg-[var(--ch-bg)] px-4 py-8 text-[var(--ch-ink)] min-h-[70vh] sm:px-6 sm:py-12">
        <div className="mx-auto max-w-5xl space-y-8 sm:space-y-10">
          <section className="flex items-start gap-3 rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-4 py-4 shadow-[var(--ch-shadow-soft)] sm:items-center sm:gap-4 sm:px-5" aria-labelledby="knowledge-center-identity-title">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent)]" aria-hidden="true">
              <svg width="35" height="35" viewBox="0 0 24 24">
                <path d="M3 5h6c2 0 3 1 3 3v11c-1-1.5-2.5-2-4-2H3V5Z" fill="#2B72B8" stroke="#7DE7F2" />
                <path d="M21 5h-6c-2 0-3 1-3 3v11c1-1.5 2.5-2 4-2h5V5Z" fill="#5b8fa8" stroke="#d7e8f2" />
              </svg>
            </div>
            <div>
              <h1 id="knowledge-center-identity-title" className="font-serif text-lg font-bold text-[var(--ch-accent)] sm:text-2xl">Holy Yatra Knowledge Center</h1>
              <p className="mt-1 text-sm leading-6 text-[var(--ch-ink-muted)]">Founder-approved knowledge, verified guidance, and trusted reference information.</p>
            </div>
          </section>

          <div>
            <p className="font-semibold tracking-widest text-[var(--ch-accent)] uppercase text-xs">Central Knowledge Repository</p>
            <h2 className="mt-2 font-serif text-3xl font-bold text-[var(--ch-ink)] sm:text-5xl">Ancestral Rites & Sacred Guidance</h2>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-[var(--ch-ink-muted)]">
              Welcome to the Holy Yatra Knowledge Center. Explore authentic guidance on Vedic rituals, Gaya Ji Pind Daan, lineage records, and pilgrim assistance.
            </p>
          </div>

            <aside className="flex flex-col gap-4 rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-4 shadow-[var(--ch-shadow-soft)] sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:p-5">
            <div><h2 className="font-serif text-xl font-bold text-[var(--ch-accent)]">Need guided help?</h2><p className="mt-1 text-sm text-[var(--ch-ink-muted)]">Use the interactive assistant separately for guided search, secure tracking, and authorised review routing.</p></div>
            <Link href="/zen-g" className="inline-flex min-h-11 items-center justify-center rounded-full bg-[var(--ch-accent-soft)] px-5 py-2.5 text-center text-sm font-bold text-[var(--ch-ink)] hover:brightness-[0.98]">Need guided help? Ask GenZ AI</Link>
          </aside>

          {/* Knowledge Center Article Grid */}
          <div>
            <h2 className="text-2xl font-serif font-bold text-[var(--ch-ink)] mb-6">Knowledge Domains & Topics</h2>
            <div className="grid gap-6 md:grid-cols-3">
              {KNOWLEDGE_GUIDE_CARDS.map((cat) => (
                <article className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6 shadow-[var(--ch-shadow-soft)] flex flex-col justify-between" key={cat.title}>
                  <div>
                    <h3 className="font-serif font-bold text-[var(--ch-accent)] text-xl">{cat.title}</h3>
                    <p className="mt-3 text-[var(--ch-ink-muted)] text-sm leading-relaxed">{cat.description}</p>
                  </div>
                  <Link className="mt-6 inline-flex items-center text-sm font-semibold text-[var(--ch-accent)] hover:underline" href={cat.href}>
                    Read Knowledge Guide 
                  </Link>
                </article>
              ))}
            </div>
          </div>

          <section aria-labelledby="service-catalog-title">
            <h2 id="service-catalog-title" className="text-2xl font-serif font-bold text-[var(--ch-ink)]">Browse Service Catalog</h2>
            <PublicCatalog />
          </section>
        </div>
      </main>
    </PublicHeroShell>
  );
}

