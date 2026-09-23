'use client';

import { usePathname } from 'next/navigation';
import { HeaderMailIcon } from '@/components/auth/PublicHeader';
import { WhatsAppIcon } from '@/components/common/WhatsAppIcon';
import { supportMailtoHref, supportWhatsAppHref } from '@/config/publicContact';
import { shouldShowPublicChrome } from '@/config/publicShellVisibility';
import styles from './FloatingContactUtilities.module.css';

export function FloatingContactUtilities() {
  const path = usePathname();

  if (!shouldShowPublicChrome(path)) return null;

  return (
    <div className={styles.stack} aria-label="Quick contact">
      <a
        href={supportMailtoHref()}
        className={`${styles.button} ${styles.mail}`}
        aria-label="Email support"
      >
        <HeaderMailIcon className={styles.icon} />
      </a>
      <a
        href={supportWhatsAppHref()}
        className={`${styles.button} ${styles.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp support"
      >
        <WhatsAppIcon className={styles.icon} />
      </a>
    </div>
  );
}
