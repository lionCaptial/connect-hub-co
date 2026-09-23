'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { useAuth } from './AuthProvider';
import { ROUTES } from '@/config/navigation';
import styles from './PublicHeader.module.css';

type MyAccountMenuProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function AccountChevron({ className = '' }: { className?: string }) {
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

export function MyAccountMenu({ mobile = false, onNavigate }: MyAccountMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();
  const { logout } = useAuth();

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [open]);

  const closeAfterNavigation = () => {
    setOpen(false);
    onNavigate?.();
  };

  const handleSignOut = async () => {
    closeAfterNavigation();
    await logout();
  };

  return (
    <div ref={rootRef} className={mobile ? styles.supportMenuMobile : styles.supportMenu}>
      <button
        ref={triggerRef}
        type="button"
        className={
          mobile ? styles.menuLinkButton : `${styles.pillSoft} ${open ? styles.linkActive : ''}`
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        My Account
        <AccountChevron className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open ? (
        <div
          id={panelId}
          className={mobile ? styles.supportPanelMobile : styles.supportPanel}
          aria-label="My Account"
        >
          <Link
            href={ROUTES.ACCOUNT_SERVICE_REQUESTS}
            className={styles.supportLink}
            onClick={closeAfterNavigation}
          >
            My Service Requests
          </Link>
          <Link
            href={ROUTES.ACCOUNT_REGISTRATIONS}
            className={styles.supportLink}
            onClick={closeAfterNavigation}
          >
            My Registrations
          </Link>
          <Link href={ROUTES.ACCOUNT_PROFILE} className={styles.supportLink} onClick={closeAfterNavigation}>
            My Profile
          </Link>
          <button
            type="button"
            className={`${styles.supportLink} ${styles.supportActionButton}`}
            onClick={handleSignOut}
          >
            Sign Out
          </button>
        </div>
      ) : null}
    </div>
  );
}
