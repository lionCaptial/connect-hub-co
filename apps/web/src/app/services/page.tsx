import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';
import { MulticolourAiBrainIcon } from '@/features/public-shell/components/PublicHeroSidebar';
import { PublicBookingForm } from '@/components/booking/BookingForm';

export const metadata: Metadata = {
  title: 'Service Booking & Request Entry | Holy Yatra',
  description: 'Begin a service request or booking for PitruMoksha Gaya, Vedic Ritual Services, Pilgrim Travel Assistance, and Vahi Lineage Records.',
};

export default function BookingPage() {
  return (
    <PublicHeroShell>
      <main className="business-inner-page bg-[var(--ch-bg)] rounded-2xl overflow-hidden">
        <section className="overflow-hidden rounded-2xl border border-[color:var(--ch-hairline)] shadow-[var(--ch-shadow-soft)] lg:grid lg:grid-cols-[210px_minmax(0,1fr)]">
          <div className="flex flex-col bg-[var(--ch-accent)] text-[#f4f8fb]">
            <div className="flex min-h-[104px] flex-1 flex-col items-center justify-center px-4 py-3 text-center">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--ch-hairline)] bg-[color-mix(in_srgb,var(--ch-accent)_70%,#0b2430)] text-xl shadow-inner" aria-hidden="true">📅</span>
              <p className="mt-2 text-xs font-black uppercase leading-4 tracking-[0.16em] text-white">
                <span className="block">Official</span>
                <span className="block">Booking</span>
                <span className="block">Portal</span>
              </p>
            </div>

            <Link
              href="/zen-g"
              className="flex min-h-[104px] flex-1 flex-col items-center justify-center border-t border-[color:var(--ch-hairline)] px-4 py-3 text-center text-white transition-[transform,background-color,box-shadow] hover:bg-black/10 active:scale-[0.98] active:shadow-inner focus-visible:outline-2 focus-visible:outline-offset-[-4px] focus-visible:outline-[var(--ch-accent-soft)]"
              aria-label="May I Help You?"
            >
              <span aria-hidden="true" className="flex h-10 w-10 items-center justify-center rounded-xl border border-[color:var(--ch-hairline)] bg-[color-mix(in_srgb,var(--ch-accent)_70%,#0b2430)] shadow-inner [&>svg]:h-7 [&>svg]:w-7"><MulticolourAiBrainIcon /></span>
              <span className="mt-2 text-xs font-bold">May I Help You?</span>
            </Link>
          </div>

          <div className="bg-[linear-gradient(165deg,#0b2430_0%,var(--ch-accent)_72%,#123a4f_100%)] px-5 py-4 text-[#f4f8fb] sm:px-7">
            <h1 className="font-serif text-3xl font-bold leading-tight sm:text-[34px]">Begin Your Service Request</h1>
            <p className="mt-1.5 text-sm font-medium leading-5 text-[color-mix(in_srgb,#f4f8fb_88%,transparent)]">
              Tell us what you need. We’ll help you choose the right service, participation format, and next steps.
            </p>

            <div className="mt-2.5 text-sm leading-5 text-white">
              <p>After submission, the system automatically generates your <strong>Service Request ID</strong>.</p>
              <p className="mt-2 font-semibold text-[var(--ch-accent-soft)]">NOTE —</p>
              <ol className="mt-1 list-decimal space-y-0 pl-5 leading-5">
                <li>Please do not create the Service Request ID manually.</li>
                <li><strong>No immediate payment is required.</strong></li>
                <li>Fields marked with * are mandatory.</li>
              </ol>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-5xl px-6 py-12">
          {/* Booking Request Form */}
          <div className="rounded-2xl bg-[var(--ch-bg-elevated)] p-8 text-[var(--ch-ink)] shadow-[var(--ch-shadow-soft)] border border-[color:var(--ch-hairline)]">
            <h2 className="text-2xl font-serif font-bold text-[var(--ch-ink)] mb-2">Service Booking Application</h2>
            <PublicBookingForm />
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
