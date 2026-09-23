'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import { ROUTES } from '@/config/navigation';
import styles from './PublicHeader.module.css';

type OurSupportMenuProps = {
  mobile?: boolean;
  onNavigate?: () => void;
};

function SupportChevron({ className = '' }: { className?: string }) {
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

export function OurSupportMenu({ mobile = false, onNavigate }: OurSupportMenuProps) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

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

  return (
    <div ref={rootRef} className={mobile ? styles.supportMenuMobile : styles.supportMenu}>
      <button
        ref={triggerRef}
        type="button"
        className={
          mobile ? styles.menuLinkButton : `${styles.link} ${open ? styles.linkActive : ''}`
        }
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((value) => !value)}
      >
        Our Support
        <SupportChevron className={`${styles.chevron} ${open ? styles.chevronOpen : ''}`} />
      </button>

      {open ? (
        <div
          id={panelId}
          className={mobile ? styles.supportPanelMobile : styles.supportPanel}
          aria-label="Our Support"
        >
          <Link
            href={ROUTES.TRACKING}
            className={styles.supportLink}
            onClick={closeAfterNavigation}
          >
            Track Service Request
          </Link>
          <Link
            href={ROUTES.TRACK_REGISTRATION}
            className={styles.supportLink}
            onClick={closeAfterNavigation}
          >
            Track Registration
          </Link>
          <Link
            href={ROUTES.COMPLAINT}
            className={styles.supportLink}
            onClick={closeAfterNavigation}
          >
            Raise Complaint
          </Link>
          <div className={styles.supportGroup}>
            <span className={styles.supportGroupLabel}>Grievance &amp; Founder Support</span>
            <div className={styles.supportGroupLinks}>
              <Link href={ROUTES.GRIEVANCE} onClick={closeAfterNavigation}>
                Grievance
              </Link>
              <Link href={ROUTES.FOUNDER_SUPPORT} onClick={closeAfterNavigation}>
                Founder Support
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
