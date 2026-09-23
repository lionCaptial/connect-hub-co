'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { UnavailableAuthFlow } from '@/components/auth/UnavailableAuthFlow';

export default function ResetPasswordPage() {
  return <UnavailableAuthFlow title="Password Reset Unavailable" message="Password reset is not available during the current pre-trial phase." />;
}

export function LegacyResetPasswordPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || 'demo_reset_token';
  const { resetPassword } = useAuth();

  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match. Please re-enter.');
      return;
    }
    setError(null);
    setMessage(null);
    setSubmitting(true);

    try {
      const res = await resetPassword({ token, newPassword });
      setMessage(res.message);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to reset password. Please try again.');
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
          <h1 className="mt-1 font-serif text-3xl text-[var(--ch-ink)]">Reset Password</h1>
          <p className="mt-2 text-sm text-[var(--ch-ink-muted)]">
            Choose a new strong password for your account
          </p>
        </div>

        {message && (
          <div className="mt-5 rounded-lg border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] p-4 text-xs text-[var(--ch-ink)] text-center">
            <strong>Success:</strong> {message}
            <div className="mt-3">
              <Link href="/login" className="inline-block rounded-full bg-[var(--ch-accent-soft)] px-4 py-2 text-xs font-bold text-[var(--ch-ink)]">
                Proceed to Login
              </Link>
            </div>
          </div>
        )}

        {error && (
          <div className="mt-5 rounded-lg border border-red-200 bg-red-50 p-3 text-xs text-red-700" role="alert">
            {error}
          </div>
        )}

        {!message && (
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ch-ink)]">
                New Password (Min. 8 Characters) *
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-3 text-sm text-[var(--ch-ink)] outline-none focus:border-[var(--ch-accent)] focus:ring-2 focus:ring-[var(--ch-accent-soft)]"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                minLength={8}
                placeholder=""
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[var(--ch-ink)]">
                Confirm New Password *
              </label>
              <input
                className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-3 text-sm text-[var(--ch-ink)] outline-none focus:border-[var(--ch-accent)] focus:ring-2 focus:ring-[var(--ch-accent-soft)]"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                minLength={8}
                placeholder=""
                required
              />
            </div>

            <button
              className="mt-2 w-full rounded-full bg-[var(--ch-accent-soft)] py-3.5 text-sm font-bold text-[var(--ch-ink)] shadow-md transition-colors hover:brightness-105 disabled:opacity-50"
              disabled={submitting}
              type="submit"
            >
              {submitting ? 'Updating Password…' : 'Reset Password'}
            </button>
          </form>
        )}

        <div className="mt-6 border-t border-[color:var(--ch-hairline)] pt-5 text-center text-xs text-[var(--ch-ink-muted)]">
          <Link href="/login" className="font-bold text-[var(--ch-ink)] hover:underline">
            Back to Sign In
          </Link>
        </div>
      </div>
    </main>
  );
}
