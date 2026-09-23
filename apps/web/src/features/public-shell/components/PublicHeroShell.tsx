import type { ReactNode } from 'react';
import styles from '../PublicHeroShell.module.css';

// =======================================
// SITARAM HERO MASTER v1.1
// FIXED SHELL — sidebar removed; Our Services (header) is sole public nav
// =======================================
export function PublicHeroShell({
  children,
  fullWidth = true,
}: {
  children: ReactNode;
  fullWidth?: boolean;
  /** @deprecated Sidebar removed — Our Services header drawer is the sole public nav. */
  showSidebar?: boolean;
}) {
  return (
    <div className={styles.shell}>
      <div
        className={`${styles.layout} ${styles.withoutSidebar} ${fullWidth ? styles.fullWidthLayout : ''}`}
      >
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}
