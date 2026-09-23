import type { Metadata } from 'next';
import { GrievanceForm } from '@/components/support/GrievanceForm';
import { PublicHeroShell } from '@/features/public-shell';

export const metadata: Metadata = { title: 'Grievance Form | Holy Yatra', description: 'Escalate an existing complaint or service matter to Holy Yatra' };

export default function GrievancePage() {
  return <PublicHeroShell><main className="min-h-[70vh] bg-[var(--ch-bg)] px-6 py-10 text-[var(--ch-ink)]">
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] px-6 py-5 shadow-[var(--ch-shadow-soft)]">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--ch-accent)]">Grievance Form</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-[var(--ch-ink)]">Grievance Redressal</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ch-ink-muted)]">
          Use this form to formally escalate an unresolved complaint or service issue that has already been raised through the normal support process. Provide the existing complaint/service reference, relevant dates, grievance category, and supporting details so the matter can be reviewed through the grievance process.
        </p>
        <p className="mt-3 text-sm font-semibold text-[var(--ch-accent)]">PLEASE MAKE SURE - Fields marked * are mandatory.</p>
      </section>

      <div className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6 shadow-[var(--ch-shadow-soft)] sm:p-8">
        <GrievanceForm />
      </div>
    </div>
  </main></PublicHeroShell>;
}
