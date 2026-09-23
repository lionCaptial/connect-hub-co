import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { MulticolourAiBrainIcon } from "@/features/public-shell/components/PublicHeroSidebar";
import { HeaderMailIcon } from '@/components/auth/PublicHeader';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { GeneralInquiryForm } from '@/components/inquiry/GeneralInquiryForm';

export const metadata: Metadata = {
  title: 'Inquiry & Support | Holy Yatra',
  description: 'General inquiries, support requests, service questions, and mail assistance for Holy Yatra',
};

export default function InquiryPage() {
  return (
    <PublicHeroShell>
      <main className="business-inner-page bg-[var(--ch-bg)] px-4 py-6 sm:px-6 sm:py-10 text-[var(--ch-ink)] rounded-2xl">
        <div className="mx-auto max-w-4xl">
          <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] px-6 py-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="font-semibold tracking-widest text-[var(--ch-accent)] uppercase text-lg sm:text-2xl">
                General Support & Inquiries
              </p>

              <a
                href="/zen-g"
                className="inline-flex w-fit items-center gap-2 rounded-full bg-[var(--ch-accent)] px-4 py-2.5 font-semibold text-white"
              >
                <span className="flex h-8 w-8 items-center justify-center [&>svg]:h-8 [&>svg]:w-8">
                  <MulticolourAiBrainIcon />
                </span>
                <span>May I Assist?</span>
              </a>
            </div>

            <p className="mt-4 max-w-2xl text-lg text-[var(--ch-ink-muted)] leading-relaxed">
              Have a question about our services, tradition protocols, or pilgrim support? Use the approved email channel or review the inquiry form below.
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-5 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent)] text-[var(--ch-accent-soft)]">
                  <HeaderMailIcon className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-[var(--ch-ink-muted)]">Official Company Email</strong>
                  <a className="text-sm font-semibold text-[var(--ch-ink)] hover:text-[var(--ch-accent)]" href="mailto:support@holyyatra.com">
                    support@holyyatra.com
                  </a>
                </div>
              </div>

              <div className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-5 flex items-center gap-4">
                <div className="grid h-12 w-12 place-items-center rounded-xl border border-[#25D366] bg-[var(--ch-accent)] text-[#5BE58B]">
                  <WhatsAppIcon className="h-6 w-6" />
                </div>
                <div>
                  <strong className="block text-xs uppercase tracking-wider text-[var(--ch-ink-muted)]">WhatsApp Contact</strong>
                  <span className="text-sm font-semibold text-[var(--ch-ink-muted)]">+91-9334455665</span>
                </div>
              </div>
            </div>
          </section>
          {/* General Inquiry Form */}
          <div className="mt-10 rounded-2xl bg-[var(--ch-bg-elevated)] p-8 border border-[color:var(--ch-hairline)] shadow-[var(--ch-shadow-soft)]">
            <h2 className="text-2xl font-serif font-bold text-[var(--ch-ink)] mb-2">General Inquiry Form</h2>
            <p className="text-xs text-[var(--ch-ink-muted)] mb-6">For service bookings, please use our dedicated Booking Page.</p>
            <GeneralInquiryForm />
          </div>
        </div>
      </main>
    </PublicHeroShell>
  );
}
