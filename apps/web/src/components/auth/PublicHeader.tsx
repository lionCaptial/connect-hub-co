'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { useAuth } from './AuthProvider';
import { useServicesDrawer } from '@/components/auth/ServicesDrawerContext';
import { PUBLIC_BRAND } from '@/config/publicBrand';
import { ROUTES } from '@/config/navigation';
import { shouldShowPublicChrome } from '@/config/publicShellVisibility';
import { MyAccountMenu } from './MyAccountMenu';
import { OurSupportMenu } from './OurSupportMenu';
import styles from './PublicHeader.module.css';

export function HeaderMailIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function ServicesChevron({ className = '' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M4 6l4 4 4-4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function PublicHeader() {
  const path = usePathname();
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const { open: servicesOpen, toggleDrawer } = useServicesDrawer();

  if (!shouldShowPublicChrome(path)) return null;

  return (
    <header className={styles.header}>
      <nav className={styles.bar} aria-label="Primary navigation">
        <Link
          className={styles.brand}
          href={ROUTES.HOME}
          onClick={() => setOpen(false)}
          aria-label={`${PUBLIC_BRAND.name} home`}
        >
          <span className={styles.brandMarkWrap} aria-hidden="true">
            <span className={styles.brandMarkGlow} />
            <Image
              src="/images/brand/golden-lotus-mark.svg"
              alt=""
              width={34}
              height={28}
              priority
              className={styles.brandMark}
            />
          </span>
          <span className={styles.brandText}>
            <span className={styles.brandName}>{PUBLIC_BRAND.name}</span>
            <span className={styles.brandTagline}>{PUBLIC_BRAND.tagline}</span>
            <span className={styles.brandSubLine}>{PUBLIC_BRAND.subLine}</span>
          </span>
        </Link>

        <div className={styles.navCluster}>
          <button
            type="button"
            className={`${styles.link} ${servicesOpen ? styles.linkActive : ''}`}
            aria-expanded={servicesOpen}
            aria-controls="public-services-drawer"
            aria-label={servicesOpen ? 'Close services menu' : 'Open services menu'}
            onClick={toggleDrawer}
          >
            Our Services
            <ServicesChevron className={styles.chevron} />
          </button>

          <Link
            href="/about"
            className={`${styles.link} ${path === '/about' || path.startsWith('/about/') ? styles.linkActive : ''}`}
          >
            About Us
          </Link>
          <OurSupportMenu />
        </div>

        <div className={styles.actions}>
          {user ? <MyAccountMenu /> : <Link href={ROUTES.LOGIN} className={styles.pillSoft}>Login</Link>}
          <Link href={ROUTES.BOOKING} className={styles.pillPrimary}>
            Book Now
          </Link>
        </div>

        <div className={styles.mobileActions}>
          <button
            type="button"
            className={styles.pillSoft}
            aria-expanded={open}
            aria-controls="public-mobile-menu"
            aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </nav>

      {open ? (
        <div id="public-mobile-menu" className={styles.menuPanel}>
          <button
            type="button"
            className={`${styles.menuLinkButton} ${servicesOpen ? styles.menuLinkActive : ''}`}
            aria-expanded={servicesOpen}
            aria-controls="public-services-drawer"
            onClick={() => {
              toggleDrawer();
              setOpen(false);
            }}
          >
            Our Services
            <ServicesChevron className={styles.chevron} />
          </button>
          <Link href="/about" className={styles.menuLink} onClick={() => setOpen(false)}>
            About Us
          </Link>
          <OurSupportMenu mobile onNavigate={() => setOpen(false)} />
          {user ? <MyAccountMenu mobile onNavigate={() => setOpen(false)} /> : null}
          <div className={styles.menuCtas}>
            {!user ? (
              <Link href={ROUTES.LOGIN} className={styles.pillSoft} onClick={() => setOpen(false)}>
                Login
              </Link>
            ) : null}
            <Link
              href={ROUTES.BOOKING}
              className={styles.pillPrimary}
              onClick={() => setOpen(false)}
            >
              Book Now
            </Link>
          </div>
        </div>
      ) : null}
    </header>
  );
}
