import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request received | PitruMoksha Gaya",
  robots: { index: false, follow: false },
};

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ request?: string }>;
}) {
  const { request } = await searchParams;
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--ch-bg)] p-6">
      <div className="max-w-lg rounded-[var(--ch-radius)] border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-10 text-center shadow-[var(--ch-shadow-soft)]">
        <div className="text-5xl text-[var(--ch-accent)]">✓</div>
        <h1 className="mt-5 font-serif text-3xl font-bold text-[var(--ch-ink)]">Your request is received</h1>
        <p className="mt-4 text-[var(--ch-ink-muted)]">
          A Holy Yatra coordinator will review the details and contact you to confirm the ritual plan and
          religious partner.
        </p>
        {request ? (
          <Link
            className="mt-7 block rounded-full bg-[var(--ch-accent-soft)] px-5 py-3 font-semibold text-[var(--ch-ink)]"
            href={`/travel-assistance?request=${encodeURIComponent(request)}`}
          >
            Add travel assistance
          </Link>
        ) : null}
        <Link className="mt-5 inline-block text-[var(--ch-accent)] underline" href="/pitru-moksha">
          Return to PitruMoksha Gaya
        </Link>
      </div>
    </main>
  );
}
