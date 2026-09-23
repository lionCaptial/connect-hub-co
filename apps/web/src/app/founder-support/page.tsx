import type { Metadata } from "next";
import { DedicatedSupportForm } from "@/components/support/DedicatedSupportForm";
import { PublicHeroShell } from "@/features/public-shell";

export const metadata: Metadata = { title: "Founder Support | Holy Yatra", description: "Submit a Founder Support escalation request to Holy Yatra" };

export default function FounderSupportPage() {
  return <PublicHeroShell><main className="min-h-[70vh] bg-[var(--ch-bg)] px-6 py-10 text-[var(--ch-ink)]">
    <div className="mx-auto max-w-4xl">
      <section className="mb-6 rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] px-6 py-5 shadow-[var(--ch-shadow-soft)]">
        <p className="text-sm font-semibold uppercase tracking-widest text-[var(--ch-accent)]">Founder Escalation</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-[var(--ch-ink)]">Founder Support</h1>
        <p className="mt-3 max-w-3xl text-base leading-7 text-[var(--ch-ink-muted)]">
          Direct escalation for unresolved or serious service concerns. Use Founder Support when your issue requires direct Founder-level review.
        </p>
        <p className="mt-2 max-w-3xl text-base leading-7 text-[var(--ch-ink-muted)]">
          <span className="font-semibold text-[var(--ch-accent)]">PLEASE MAKE SURE -</span> Please use the same name, email ID and Reference ID for every purpose.
        </p>
      </section>

      <div className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-8 shadow-[var(--ch-shadow-soft)]">
        <DedicatedSupportForm workflow="founder-support" />
      </div>
    </div>
  </main></PublicHeroShell>;
}
