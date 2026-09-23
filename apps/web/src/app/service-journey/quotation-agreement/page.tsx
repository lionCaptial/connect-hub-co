import type { Metadata } from 'next';
import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';
import { ROUTES } from '@/config/navigation';
import Content from '@content/legal/client-service-agreement.mdx';
import legalStyles from '@/components/legal/LegalDocument.module.css';
import journeyStyles from '@/features/service-journey/ServiceJourneyPage.module.css';

export const metadata: Metadata = {
  title: 'Quotation & Agreement | Holy Yatra',
  description:
    'Review and accept the Client Service Agreement template for your Holy Yatra service journey.',
};

export default function QuotationAgreementPage() {
  return (
    <PublicHeroShell>
      <main className={journeyStyles.main}>
        <div className={journeyStyles.container}>
          <p className={journeyStyles.eyebrow}>Service Journey</p>
          <article className={legalStyles.document} aria-labelledby="csa-title">
            <h1 id="csa-title">Client Service Agreement</h1>
            <p>Clear Scope. Clear Commitment.</p>
            <div data-legal-body>
              <Content />
            </div>
          </article>
          <nav className={journeyStyles.journeyNav} aria-label="Service journey navigation">
            <span />
            <Link href={ROUTES.SERVICE_JOURNEY_PAYMENT} className={journeyStyles.journeyLink}>
              Payment & Booking Confirmation -&gt;
            </Link>
          </nav>
        </div>
      </main>
    </PublicHeroShell>
  );
}
