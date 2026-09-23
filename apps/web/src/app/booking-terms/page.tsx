import type { Metadata } from 'next';
import Content from '@content/legal/booking-terms.mdx';
import { LegalMdxShell } from '@/components/legal/LegalMdxShell';

export const metadata: Metadata = {
  title: 'Booking Terms & Conditions | Holy Yatra',
  description:
    'Holy Yatra Booking Terms & Conditions for requesting and booking services.',
  alternates: { canonical: '/booking-terms' },
};

export default function BookingTermsPage() {
  return (
    <LegalMdxShell
      title="Booking Terms & Conditions"
      subtitle="Clear Terms. Clear Commitment."
    >
      <Content />
    </LegalMdxShell>
  );
}
