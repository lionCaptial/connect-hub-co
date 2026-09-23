import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';
import { TravelCompanionRegisterForm } from '@/components/travel-assistance/TravelCompanionRegisterForm';
import { ROUTES } from '@/config/navigation';

export const metadata: Metadata = {
  title: 'Travel Companion Registration | Holy Yatra',
  description:
    'Join Holy Yatra as a Travel Companion — register interest for verified local and pilgrim travel support roles.',
};

export default function TravelCompanionRegisterPage() {
  return (
    <PublicHeroShell>
      <main className="min-h-[70vh] bg-[var(--ch-bg)] px-6 py-10 text-[var(--ch-ink)]">
        <div className="mx-auto max-w-4xl space-y-6">
          <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] px-6 py-6">
            <p className="text-sm font-semibold uppercase tracking-widest text-[var(--ch-accent)]">Work With Us</p>
            <h1 className="mt-2 font-serif text-4xl font-bold text-[var(--ch-ink)]">
              Travel Companion Registration
            </h1>
            <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ch-ink-muted)]">
              Join as a Travel Companion to support pilgrims and travelers with discreet, reliable ground assistance.
              Submit your interest below. Our team reviews applications and follows up using your Reference ID — no
              payment is required to apply.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href={ROUTES.TRAVEL_ASSISTANCE}
                className="inline-flex rounded-full border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-5 py-2.5 text-sm font-semibold text-[var(--ch-ink)] hover:border-[var(--ch-accent)]"
              >
                Back to Travel Assistance
              </Link>
              <Link
                href={ROUTES.TRACK_TRAVEL_COMPANION_REGISTRATION}
                className="inline-flex rounded-full bg-[var(--ch-accent-soft)] px-5 py-2.5 text-sm font-semibold text-[var(--ch-ink)] ring-1 ring-[color:var(--ch-hairline)]"
              >
                Track Registration
              </Link>
            </div>
          </section>

          <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6 shadow-[var(--ch-shadow-soft)] sm:p-8">
            <h2 className="font-serif text-2xl font-bold text-[var(--ch-ink)]">Application form</h2>
            <p className="mt-2 text-sm text-[var(--ch-ink-muted)]">
              Fields marked * are required. After submission you will receive a Reference ID for tracking.
            </p>
            <div className="mt-6">
              <TravelCompanionRegisterForm />
            </div>
          </section>
        </div>
      </main>
    </PublicHeroShell>
  );
}
