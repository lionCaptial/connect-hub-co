import Link from 'next/link';

export function UnavailableAuthFlow({ title, message }: { title: string; message: string }) {
  return (
    <main className="grid min-h-screen place-items-center bg-[var(--ch-bg)] p-6">
      <div className="w-full max-w-md rounded-[var(--ch-radius)] border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-8 text-center shadow-[var(--ch-shadow-soft)]">
        <span className="text-xs font-black uppercase tracking-widest text-[var(--ch-accent)]">HOLY YATRA</span>
        <h1 className="mt-1 font-serif text-3xl text-[var(--ch-ink)]">{title}</h1>
        <p className="mt-3 text-sm text-[var(--ch-ink-muted)]">{message}</p>
        <Link
          href="/login"
          className="mt-6 inline-block rounded-full bg-[var(--ch-accent-soft)] px-5 py-3 text-xs font-bold text-[var(--ch-ink)] shadow hover:brightness-105"
        >
          Return to Sign In
        </Link>
      </div>
    </main>
  );
}
