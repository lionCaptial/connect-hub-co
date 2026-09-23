import type { Metadata } from 'next';
import { ServiceJourneyPage } from '@/features/service-journey/ServiceJourneyPage';
import { SERVICE_JOURNEY_PAGES } from '@/features/service-journey/content';

export const metadata: Metadata = {
  title: 'Fulfilment & Closure | Holy Yatra',
  description:
    'This stage covers preparation, service execution, documentation or handover, and closure updates for your request.',
};

export default function FulfilmentClosurePage() {
  return <ServiceJourneyPage content={SERVICE_JOURNEY_PAGES.fulfilment} />;
}
