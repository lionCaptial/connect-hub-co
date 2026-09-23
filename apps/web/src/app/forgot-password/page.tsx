'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { UnavailableAuthFlow } from '@/components/auth/UnavailableAuthFlow';

export default function ForgotPasswordPage() {
  return <UnavailableAuthFlow title="Password Recovery Unavailable" message="Password recovery is not available during the current pre-trial phase." />;
}

export function LegacyForgotPasswordPage() {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setSubmitting(true);
    try {
      const res = await forgotPassword({ email });
      setMessage(res.message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to send reset email. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="grid min-h-screen place-items-center bg-[var(--ch-bg)] p-6">
      <div className="w-full max-w-md rounded-2xl border border-[color:var(--ch-hairline)] bg-white p-8 shadow-lg">
        <div className="text-center">
          <span className="text-xs font-black uppercase tracking-widest text-[var(--ch-accent)]">
            HOLY YATRA
          </span>
          <h1 className="mt-1 font-serif text-3xl text-[var(--ch-ink)]">Forgot Password</h1>
          <p className="mt-2 text-sm text-[var(--ch-ink-muted)]">
            Enter your registered email address to receive password reset instructions
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] p-4 text-xs text-[var(--ch-ink)]">
            <strong>Check your inbox:</strong> {message}
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700" role="alert">
            {error}
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ch-ink)]">
              Registered Email Address *
            </label>
            <input
              className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-3 text-sm text-[var(--ch-ink)] outline-none focus:border-[var(--ch-accent)] focus:ring-2 focus:ring-[var(--ch-accent-soft)]"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@example.com"
              required
            />
          </div>

          <button
            className="mt-2 w-full rounded-full bg-[var(--ch-accent-soft)] py-3.5 text-sm font-bold text-[var(--ch-ink)] shadow-md transition-colors hover:brightness-105 disabled:opacity-50"
            disabled={submitting}
            type="submit"
          >
            {submitting ? 'Sending Request…' : 'Send Reset Link'}
          </button>
        </form>

        <div className="mt-6 border-t border-[color:var(--ch-hairline)] pt-5 text-center text-xs text-[var(--ch-ink-muted)]">
          Remembered your password?{' '}
          <Link href="/login" className="font-bold text-[var(--ch-ink)] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
