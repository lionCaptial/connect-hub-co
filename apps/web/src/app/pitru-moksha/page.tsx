import type { Metadata } from "next";
import Link from "next/link";
import { EnquiryForm } from "@/components/pitru-moksha/EnquiryForm";

export const metadata: Metadata = {
  title: "Pitru Moksha & Pind Daan in Gaya | Holy Yatra",
  description:
    "Plan a respectful Pind Daan and Pitru Moksha seva in Gaya with verified religious partners, NRI coordination, and travel support.",
  keywords: ["Pind Daan Gaya", "Pitru Moksha Gaya", "Gaya pilgrimage", "NRI Pind Daan"],
};

const packages = [
  { name: "Essential Pind Daan", text: "Guided essential rites with a qualified religious partner." },
  { name: "Complete Pitru Moksha Seva", text: "End-to-end ritual coordination based on family requirements." },
  { name: "Family & NRI Assisted", text: "Extra planning for overseas families, travel and accommodation." },
];

export default function PitruMokshaPage() {
  return (
    <main className="bg-[var(--ch-bg)] text-[var(--ch-ink)]">
      <section
        className="px-6 py-20 text-[#f4f8fb]"
        style={{
          background:
            "var(--ch-band-wash), linear-gradient(165deg, #0b2430 0%, var(--ch-accent) 72%, #123a4f 100%)",
        }}
      >
        <div className="mx-auto max-w-6xl">
          <p className="font-semibold tracking-widest text-[var(--ch-accent-soft)]">PITRUMOKSHA GAYA</p>
          <h1 className="mt-4 max-w-4xl font-serif text-4xl font-bold leading-tight sm:text-6xl">
            Honour your ancestors with a thoughtfully coordinated seva in Gaya
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-white/85">
            Clear guidance, verified religious partners and personal support for families in India and abroad.
          </p>
          <Link
            href="#enquiry"
            className="mt-8 inline-block rounded-full bg-[var(--ch-accent-soft)] px-7 py-3 font-semibold text-[var(--ch-ink)]"
          >
            Plan your seva
          </Link>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center font-serif text-3xl font-bold">A respectful, supported pilgrimage</h2>
        <div className="mt-9 grid gap-0 border-l border-t border-[color:var(--ch-hairline)] md:grid-cols-3">
          {["Verified partner coordination", "Private family information", "NRI and travel assistance"].map(
            (item) => (
              <div
                key={item}
                className="border-b border-r border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-6"
              >
                <h3 className="font-semibold text-[var(--ch-ink)]">{item}</h3>
                <p className="mt-2 text-sm text-[var(--ch-ink-muted)]">
                  Our team confirms requirements personally before the ritual plan is finalized.
                </p>
              </div>
            ),
          )}
        </div>
      </section>

      <section className="border-t border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-6 py-16">
        <div className="mx-auto max-w-6xl">
          <h2 className="font-serif text-3xl font-bold">Choose the support you need</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {packages.map((item) => (
              <article
                key={item.name}
                className="border-t-2 border-[var(--ch-accent)] pt-6"
              >
                <h3 className="font-serif text-xl font-bold text-[var(--ch-ink)]">{item.name}</h3>
                <p className="mt-3 text-[var(--ch-ink-muted)]">{item.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-6 py-16">
        <EnquiryForm />
      </section>

      <footer className="border-t border-[color:var(--ch-hairline)] bg-[var(--ch-ink)] px-6 py-10 text-center text-sm text-[var(--ch-accent-soft)]">
        Holy Yatra · Personal coordination for sacred services in Gaya
      </footer>
    </main>
  );
}
