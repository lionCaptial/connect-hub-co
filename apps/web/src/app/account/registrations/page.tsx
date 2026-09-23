import Link from 'next/link';
import { ROUTES } from '@/config/navigation';
import styles from '@/features/public-account/PublicAccountShell.module.css';

export default function AccountRegistrationsPage() {
  return (
    <section>
      <h2 className={styles.sectionTitle}>My Registrations</h2>
      <p className={styles.sectionLead}>
        Follow every registration update for priest and travel companion programs using the public tracking experience.
      </p>

      <div className={styles.ctaGroup}>
        <Link href={ROUTES.TRACK_REGISTRATION} className={styles.ctaLink}>
          Track Priest Registration
        </Link>
        <Link href={ROUTES.TRACK_TRAVEL_COMPANION_REGISTRATION} className={styles.ctaLink}>
          Track Travel Companion Registration
        </Link>
        <Link href={ROUTES.TRAVEL_COMPANION_REGISTER} className={styles.ctaLink}>
          Travel Companion Registration
        </Link>
      </div>
    </section>
  );
}
