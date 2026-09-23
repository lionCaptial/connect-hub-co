'use client';

import Link from 'next/link';
import { useAuth } from '@/components/auth/AuthProvider';
import { ROUTES } from '@/config/navigation';
import styles from '@/features/public-account/PublicAccountShell.module.css';

export default function AccountProfilePage() {
  const { user } = useAuth();

  return (
    <section>
      <h2 className={styles.sectionTitle}>My Profile</h2>
      <p className={styles.sectionLead}>Public account details used to coordinate your service journey.</p>

      <div className={styles.profileGrid}>
        <article className={styles.profileRow}>
          <span className={styles.profileLabel}>Full Name</span>
          <span className={styles.profileValue}>{user?.name ?? 'Not on file'}</span>
        </article>
        <article className={styles.profileRow}>
          <span className={styles.profileLabel}>Email</span>
          <span className={styles.profileValue}>{user?.email ?? 'Not on file'}</span>
        </article>
        <article className={styles.profileRow}>
          <span className={styles.profileLabel}>Mobile</span>
          <span className={styles.profileValue}>{user?.mobile || 'Not on file'}</span>
        </article>
      </div>

      <p className={styles.note}>
        Password updates continue through existing account access flows. If reset options are unavailable, please{' '}
        <Link href={ROUTES.INQUIRY}>contact support</Link>.
      </p>
    </section>
  );
}
