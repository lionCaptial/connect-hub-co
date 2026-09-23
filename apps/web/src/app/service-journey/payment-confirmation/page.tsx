import type { Metadata } from 'next';
import { ServiceJourneyPage } from '@/features/service-journey/ServiceJourneyPage';
import { SERVICE_JOURNEY_PAGES } from '@/features/service-journey/content';

export const metadata: Metadata = {
  title: 'Payment & Booking Confirmation | Holy Yatra',
  description:
    'Payment is completed outside the website using official bank instructions issued for your Service Request ID. The site never collects card or UPI credentials.',
};

export default function PaymentConfirmationPage() {
  return <ServiceJourneyPage content={SERVICE_JOURNEY_PAGES.payment} />;
}
