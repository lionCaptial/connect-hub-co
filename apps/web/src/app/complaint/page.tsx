import type { Metadata } from 'next';
import { ComplaintForm } from '@/components/support/ComplaintForm';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = { title: 'Complaint Form | Holy Yatra', description: 'File a customer or service complaint with Holy Yatra' };

export default function ComplaintPage() {
  return <PublicHeroShell><main className="min-h-[70vh] bg-[var(--ch-bg)] px-6 py-10 text-[var(--ch-ink)]">
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] px-6 py-5 shadow-[var(--ch-shadow-soft)]">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--ch-accent)]">Complaint Form</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-[var(--ch-ink)]">Complaint &amp; Resolution Support</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ch-ink-muted)]">
          Use this form to report or raise a concern requiring formal review. Please provide accurate details and any existing Reference / Service ID so our team can investigate and respond appropriately.
        </p>
        <p className="mt-3 text-sm text-[var(--ch-ink-muted)]">
          <span className="font-semibold text-[var(--ch-accent)]">PLEASE MAKE SURE -</span> To use constant identity, use the same name, email ID and Reference ID for every purpose.
        </p>
        <p className="mt-2 text-sm font-semibold text-[var(--ch-accent)]">Fields marked * are mandatory.</p>
      </section>

      <div className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6 shadow-[var(--ch-shadow-soft)] sm:p-8">
        <ComplaintForm />
      </div>
    </div>
  </main></PublicHeroShell>;
}
