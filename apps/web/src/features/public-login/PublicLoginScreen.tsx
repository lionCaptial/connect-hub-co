'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { FormEvent, useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { ROUTES } from '@/config/navigation';
import { PUBLIC_BRAND } from '@/config/publicBrand';
import { LOGIN_QUERY } from '@/config/publicSession';
import styles from './PublicLoginScreen.module.css';

type AuthMode = 'signin' | 'create';

function resolveMode(modeQuery: string | null): AuthMode {
  return modeQuery === LOGIN_QUERY.modeCreate ? 'create' : 'signin';
}

export function PublicLoginScreen() {
  const { login, register } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = resolveMode(searchParams.get('mode'));
  const sessionEnded = searchParams.get('session') === LOGIN_QUERY.sessionEnded;
  const registered = searchParams.get('registered') === '1';

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [createFullName, setCreateFullName] = useState('');
  const [createEmail, setCreateEmail] = useState('');
  const [createMobile, setCreateMobile] = useState('');
  const [createPassword, setCreatePassword] = useState('');
  const [createConfirmPassword, setCreateConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const showCreate = mode === 'create';
  const activeSuccess = registered;

  const currentSearchParams = useMemo(() => searchParams.toString(), [searchParams]);

  function switchMode(nextMode: AuthMode) {
    const params = new URLSearchParams(currentSearchParams);
    if (nextMode === 'create') {
      params.set('mode', LOGIN_QUERY.modeCreate);
      params.delete('registered');
    } else {
      params.delete('mode');
    }
    const query = params.toString();
    router.replace(query ? `${ROUTES.LOGIN}?${query}` : ROUTES.LOGIN);
    setError(null);
  }

  async function handleSignInSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login({ email: loginEmail, password: loginPassword });
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to sign in.');
    } finally {
      setSubmitting(false);
    }
  }

  async function handleCreateSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (createPassword.length < 8 || createConfirmPassword.length < 8) {
      setError('Password must be at least 8 characters.');
      return;
    }
    if (createPassword !== createConfirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setSubmitting(true);
    try {
      await register({
        fullName: createFullName,
        email: createEmail,
        mobile: createMobile || undefined,
        password: createPassword,
      });
      const params = new URLSearchParams(currentSearchParams);
      params.delete('mode');
      params.set('registered', '1');
      const query = params.toString();
      router.replace(query ? `${ROUTES.LOGIN}?${query}` : ROUTES.LOGIN);
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to create account.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className={styles.page}>
      <section className={styles.leftColumn} aria-label="Public trust and support information">
        <header className={styles.leftHeader}>
          <p className={styles.brandName}>{PUBLIC_BRAND.name}</p>
          <h1 className={styles.title}>Trusted support for every service step</h1>
        </header>

        <div className={styles.trustList}>
          <article className={styles.trustItem}>
            <h2>Trusted &amp; Private</h2>
            <p>Your information is handled with care.</p>
          </article>

          <article className={styles.trustItem}>
            <h2>Verified Services</h2>
            <p>Structured services and verified professionals.</p>
          </article>

          <article className={styles.trustItem}>
            <h2>Need Assistance?</h2>
            <p>
              <Link href={ROUTES.INQUIRY}>Raise Inquiry</Link>
            </p>
          </article>

          <article className={styles.trustItem}>
            <h2>Ready to Book?</h2>
            <p>
              <Link href={ROUTES.BOOKING}>Book Now</Link>
            </p>
            <p className={styles.supportText}>formal service request + Service Request ID</p>
          </article>

          <article className={styles.trustItem}>
            <h2>One Service Request ID</h2>
            <p>
              <Link href={ROUTES.TRACKING}>Track Service Request</Link>
            </p>
          </article>

          <article className={styles.trustItem}>
            <h2>Confirm &amp; Proceed</h2>
            <p>quotation, Client Service Agreement, payment as instructed</p>
          </article>

          <article className={styles.trustItem}>
            <h2>Follow Your Service Journey</h2>
            <p>guidelines through completion and closure</p>
            <p className={styles.journeyLinks}>
              <Link href={ROUTES.SERVICE_JOURNEY_QUOTATION}>Quotation Agreement</Link>
              <span aria-hidden="true">·</span>
              <Link href={ROUTES.SERVICE_JOURNEY_PAYMENT}>Payment Confirmation</Link>
              <span aria-hidden="true">·</span>
              <Link href={ROUTES.SERVICE_JOURNEY_FULFILMENT}>Fulfilment Closure</Link>
            </p>
          </article>
        </div>

        <Link href={ROUTES.HOME} className={styles.backHome}>
          &larr; Back to Home
        </Link>
      </section>

      <section className={styles.authColumn} aria-label="Account access panel">
        <div className={styles.authPanel}>
          <div className={styles.brandMarkWrap}>
            <Image src="/images/brand/golden-lotus-mark.svg" alt="" width={56} height={56} priority />
          </div>
          <h2 className={styles.authHeading}>Access your Holy Yatra account</h2>

          {sessionEnded ? (
            <div className={styles.notice} role="status">
              Your session ended for security. Please sign in again.
            </div>
          ) : null}

          {activeSuccess ? (
            <div className={styles.success} role="status">
              Account created. Sign in with your email and password.
            </div>
          ) : null}

          {error ? (
            <div className={styles.error} role="alert">
              {error}
            </div>
          ) : null}

          {showCreate ? (
            <form className={styles.form} onSubmit={handleCreateSubmit}>
              <p className={styles.modeLabel}>CREATE ACCOUNT</p>

              <label className={styles.label}>
                Full Name
                <input
                  className={styles.input}
                  type="text"
                  value={createFullName}
                  onChange={(event) => setCreateFullName(event.target.value)}
                  autoComplete="name"
                  required
                />
              </label>

              <label className={styles.label}>
                Email
                <input
                  className={styles.input}
                  type="email"
                  value={createEmail}
                  onChange={(event) => setCreateEmail(event.target.value)}
                  autoComplete="email"
                  required
                />
              </label>

              <label className={styles.label}>
                Mobile Number
                <input
                  className={styles.input}
                  type="tel"
                  value={createMobile}
                  onChange={(event) => setCreateMobile(event.target.value)}
                  autoComplete="tel"
                />
              </label>

              <label className={styles.label}>
                Password
                <input
                  className={styles.input}
                  type="password"
                  value={createPassword}
                  onChange={(event) => setCreatePassword(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
              </label>

              <label className={styles.label}>
                Confirm Password
                <input
                  className={styles.input}
                  type="password"
                  value={createConfirmPassword}
                  onChange={(event) => setCreateConfirmPassword(event.target.value)}
                  minLength={8}
                  autoComplete="new-password"
                  required
                />
              </label>

              <button className={styles.primaryButton} type="submit" disabled={submitting}>
                {submitting ? 'Creating Account…' : 'Create Account'}
              </button>

              <p className={styles.modeSwitch}>
                Already have an account?{' '}
                <button type="button" className={styles.inlineButton} onClick={() => switchMode('signin')}>
                  Sign In
                </button>
              </p>
            </form>
          ) : (
            <form className={styles.form} onSubmit={handleSignInSubmit}>
              <p className={styles.modeLabel}>SIGN IN</p>

              <label className={styles.label}>
                Email
                <input
                  className={styles.input}
                  type="email"
                  value={loginEmail}
                  onChange={(event) => setLoginEmail(event.target.value)}
                  autoComplete="username"
                  required
                />
              </label>

              <label className={styles.label}>
                Password
                <input
                  className={styles.input}
                  type="password"
                  value={loginPassword}
                  onChange={(event) => setLoginPassword(event.target.value)}
                  minLength={8}
                  autoComplete="current-password"
                  required
                />
              </label>

              <button className={styles.primaryButton} type="submit" disabled={submitting}>
                {submitting ? 'Signing In…' : 'Sign In'}
              </button>

              <p className={styles.modeSwitch}>
                Need an account?{' '}
                <button type="button" className={styles.inlineButton} onClick={() => switchMode('create')}>
                  Create Account
                </button>
              </p>
            </form>
          )}

          <p className={styles.privacyLine}>
            Your privacy matters. Holy Yatra will only request information necessary to provide, verify, and
            support your service.
          </p>
        </div>
      </section>
    </main>
  );
}
