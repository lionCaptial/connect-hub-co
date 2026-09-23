'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ReactNode, useMemo, useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { ROUTES } from '@/config/navigation';
import styles from './PublicAccountShell.module.css';

type PublicAccountShellProps = {
  children: ReactNode;
};

export function PublicAccountShell({ children }: PublicAccountShellProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);

  const navItems = useMemo(
    () => [
      { href: ROUTES.ACCOUNT_SERVICE_REQUESTS, label: 'Service Requests' },
      { href: ROUTES.ACCOUNT_REGISTRATIONS, label: 'Registrations' },
      { href: ROUTES.ACCOUNT_PROFILE, label: 'Profile' },
    ],
    [],
  );

  const statusLine = user ? `${user.email} · Account active` : '';

  async function handleSignOut() {
    setIsSigningOut(true);
    try {
      await logout();
    } finally {
      setIsSigningOut(false);
    }
  }

  return (
    <section className={styles.shell}>
      <header className={styles.introBand}>
        <div className={styles.introTop}>
          <div>
            <h1 className={styles.welcome}>Namaste, {user?.name ?? 'Customer'}</h1>
            <p className={styles.meta}>{statusLine}</p>
          </div>

          <div className={styles.actions}>
            <Link href={ROUTES.HOME} className={styles.ghostLink}>
              Public Website
            </Link>
            <button type="button" className={styles.signOutButton} onClick={handleSignOut} disabled={isSigningOut}>
              {isSigningOut ? 'Signing out...' : 'Sign Out'}
            </button>
          </div>
        </div>

        <nav className={styles.nav} aria-label="Account sections">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`.trim()}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className={styles.contentCard}>{children}</div>
    </section>
  );
}
