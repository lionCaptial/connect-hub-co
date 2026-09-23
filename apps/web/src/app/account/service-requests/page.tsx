import Link from 'next/link';
import { ROUTES } from '@/config/navigation';
import styles from '@/features/public-account/PublicAccountShell.module.css';

export default function AccountServiceRequestsPage() {
  return (
    <section>
      <h2 className={styles.sectionTitle}>My Service Requests</h2>
      <p className={styles.sectionLead}>
        Track your sacred service requests, review pre-fulfilment milestones, and revisit booking confirmations with
        one Service Request ID.
      </p>

      <div className={styles.ctaGroup}>
        <Link href={ROUTES.TRACKING} className={styles.ctaLink}>
          Track Service Request
        </Link>
        <Link href={ROUTES.SERVICE_JOURNEY_FULFILMENT} className={styles.ctaLink}>
          Pre- &amp; Post Fulfilment
        </Link>
      </div>
    </section>
  );
}
