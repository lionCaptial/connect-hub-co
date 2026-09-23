'use client';

import { usePathname, useRouter } from 'next/navigation';
import { ROUTES } from '@/config/navigation';
import styles from './SiteBackButton.module.css';

function BackChevron() {
  return (
    <svg className={styles.icon} viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path
        d="M10 3L5 8l5 5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function goBack(router: ReturnType<typeof useRouter>) {
  if (typeof window !== 'undefined' && window.history.length > 1) {
    router.back();
    return;
  }
  router.push(ROUTES.HOME);
}

type SiteBackButtonProps = {
  className?: string;
};

/** Transparent back control for left overlay on hero-image banners. Hidden on `/`. */
export function SiteBackButton({ className = '' }: SiteBackButtonProps) {
  const pathname = usePathname();
  const router = useRouter();

  if (!pathname || pathname === ROUTES.HOME) return null;

  return (
    <button
      type="button"
      className={`${styles.hero} ${className}`.trim()}
      onClick={() => goBack(router)}
      aria-label="Go back"
    >
      <BackChevron />
      <span>Back</span>
    </button>
  );
}
