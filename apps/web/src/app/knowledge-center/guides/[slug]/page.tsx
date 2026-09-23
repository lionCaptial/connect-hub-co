import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { PublicHeroShell } from '@/features/public-shell';
import {
  getKnowledgeGuide,
  KNOWLEDGE_GUIDE_SLUGS,
} from '@/features/knowledge-center/knowledge-guides';

type GuidePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return KNOWLEDGE_GUIDE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const guide = getKnowledgeGuide((await params).slug);
  return guide
    ? { title: `${guide.title} | Holy Yatra`, description: guide.description }
    : { title: 'Knowledge Guide | Holy Yatra' };
}

export default async function KnowledgeGuidePage({ params }: GuidePageProps) {
  const guide = getKnowledgeGuide((await params).slug);
  if (!guide) notFound();

  return (
    <PublicHeroShell>
      <main className="min-h-[70vh] bg-[var(--ch-bg)] px-4 py-8 text-[var(--ch-ink)] sm:px-6 sm:py-14">
        <article className="mx-auto max-w-4xl">
          <Link href="/knowledge-center" className="text-sm font-semibold text-[var(--ch-accent)] hover:underline">← Knowledge Center</Link>
          <header className="mt-6 border-b border-[color:var(--ch-hairline)] pb-6 sm:pb-8">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[var(--ch-accent)]">Approved Knowledge Guide</p>
            <h1 className="mt-2 font-serif text-3xl font-bold text-[var(--ch-ink)] sm:text-5xl">{guide.title}</h1>
            <p className="mt-4 max-w-3xl text-base leading-7 text-[var(--ch-ink-muted)] sm:text-lg sm:leading-8">{guide.description}</p>
          </header>

          <div className="mt-6 space-y-5 sm:mt-8 sm:space-y-6">
            {guide.articles.map((article) => (
              <section key={article.id} className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-4 shadow-[var(--ch-shadow-soft)] sm:p-6">
                <h2 className="font-serif text-xl font-bold text-[var(--ch-accent)] sm:text-2xl">{article.title}</h2>
                <p className="mt-3 font-medium leading-7 text-[var(--ch-ink-muted)]">{article.summary}</p>
                <p className="mt-3 leading-7 text-[var(--ch-ink-muted)]">{article.content}</p>
              </section>
            ))}

            {guide.approvedQuestions.length > 0 ? (
              <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6 shadow-[var(--ch-shadow-soft)]">
                <h2 className="font-serif text-2xl font-bold text-[var(--ch-accent)]">Approved Questions and Guidance</h2>
                <div className="mt-4 divide-y divide-stone-200">
                  {guide.approvedQuestions.map((item) => (
                    <div key={item.id} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-semibold text-[var(--ch-ink)]">{item.label}</h3>
                      <p className="mt-2 leading-7 text-[var(--ch-ink-muted)]">{item.response}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}

            {guide.faqs.length > 0 ? (
              <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6 shadow-[var(--ch-shadow-soft)]">
                <h2 className="font-serif text-2xl font-bold text-[var(--ch-accent)]">Approved FAQs</h2>
                <div className="mt-4 divide-y divide-stone-200">
                  {guide.faqs.map((faq) => (
                    <div key={faq.id} className="py-4 first:pt-0 last:pb-0">
                      <h3 className="font-semibold text-[var(--ch-ink)]">{faq.question}</h3>
                      <p className="mt-2 leading-7 text-[var(--ch-ink-muted)]">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="mt-8 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] p-5">
            <div>
              <h2 className="font-serif text-xl font-bold text-[var(--ch-accent)]">Ready for the next step?</h2>
              <p className="mt-1 text-sm text-[var(--ch-ink-muted)]">Continue to the relevant official service or application page.</p>
            </div>
            <Link href={guide.action.href} className="rounded-full bg-[var(--ch-bg-elevated)] px-5 py-2.5 text-sm font-bold text-[var(--ch-ink)] ring-1 ring-[color:var(--ch-hairline)] hover:brightness-[0.98]">{guide.action.label}</Link>
          </aside>

        </article>
      </main>
    </PublicHeroShell>
  );
}
