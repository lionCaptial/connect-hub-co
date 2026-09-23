import { ROUTES } from '@/config/navigation';

export type ServiceJourneyCta = {
  label: string;
  href: string;
  variant: 'primary' | 'secondary';
};

export type ServiceJourneyStep = {
  title: string;
  body: string;
};

export type ServiceJourneyPageContent = {
  slug: 'quotation' | 'payment' | 'fulfilment';
  eyebrow: 'Service Journey';
  title: string;
  intro: string;
  steps: ServiceJourneyStep[];
  notes?: string[];
  ctas: ServiceJourneyCta[];
  nextHref?: string;
  nextLabel?: string;
  prevHref?: string;
  prevLabel?: string;
};

const DEFAULT_CTAS: ServiceJourneyCta[] = [
  { label: 'Book Now', href: ROUTES.BOOKING, variant: 'primary' },
  { label: 'Track Service Request', href: ROUTES.TRACKING, variant: 'secondary' },
  { label: 'Raise Inquiry', href: ROUTES.INQUIRY, variant: 'secondary' },
];

export const SERVICE_JOURNEY_PAGES: Record<
  ServiceJourneyPageContent['slug'],
  ServiceJourneyPageContent
> = {
  quotation: {
    slug: 'quotation',
    eyebrow: 'Service Journey',
    title: 'Quotation & Agreement',
    intro:
      'After you choose Book Now, Holy Yatra clarifies service scope, dates, delivery mode, and inclusions before work begins.',
    steps: [
      {
        title: 'Review proposed scope and schedule',
        body: 'Check what is included, tentative dates, and whether the service is virtual or offline.',
      },
      {
        title: 'Confirm quotation details',
        body: 'Validate the quoted charges, quotation validity period, and listed deliverables.',
      },
      {
        title: 'Accept the Client Service Agreement',
        body: 'Proceed only when the agreement terms and expectations are clear to you.',
      },
      {
        title: 'Move to payment instructions',
        body: 'Payment guidance is shared after quotation and agreement acceptance are complete.',
      },
    ],
    ctas: DEFAULT_CTAS,
    nextHref: ROUTES.SERVICE_JOURNEY_PAYMENT,
    nextLabel: 'Payment & Booking Confirmation',
  },
  payment: {
    slug: 'payment',
    eyebrow: 'Service Journey',
    title: 'Payment & Booking Confirmation',
    intro:
      'Payment is completed outside the website using official bank instructions issued for your Service Request ID. The site never collects card or UPI credentials.',
    steps: [
      {
        title: 'Receive bank payment instructions',
        body: 'Use only the official communication tied to your specific Service Request ID.',
      },
      {
        title: 'Complete transfer through your bank',
        body: 'Transfer via bank channel as instructed, such as NEFT, RTGS, or IMPS.',
      },
      {
        title: 'Share payment details for recording',
        body: 'Submit reference details through tracking or authorized service communications.',
      },
      {
        title: 'Get booking confirmation recorded',
        body: 'Confirmation follows successful quotation, agreement, and internal payment verification.',
      },
    ],
    notes: [
      'This page does not provide a payment gateway.',
      'Do not rely on unofficial account details; use only authorized payment instructions.',
    ],
    ctas: DEFAULT_CTAS,
    prevHref: ROUTES.SERVICE_JOURNEY_QUOTATION,
    prevLabel: 'Quotation & Agreement',
    nextHref: ROUTES.SERVICE_JOURNEY_FULFILMENT,
    nextLabel: 'Fulfilment & Closure',
  },
  fulfilment: {
    slug: 'fulfilment',
    eyebrow: 'Service Journey',
    title: 'Fulfilment & Closure',
    intro:
      'This stage covers preparation, service execution, documentation or handover, and closure updates for your request.',
    steps: [
      {
        title: 'Preparation and coordination updates',
        body: 'Receive timing, readiness, and coordination updates before fulfilment begins.',
      },
      {
        title: 'Service fulfilment',
        body: 'The requested service is delivered with verified professionals as per agreed scope.',
      },
      {
        title: 'Documentation or handover',
        body: 'Applicable records, confirmations, or handover items are shared for your request.',
      },
      {
        title: 'Closure and follow-up',
        body: 'Closure status and any follow-up guidance are available via Track Service Request.',
      },
    ],
    ctas: DEFAULT_CTAS,
    prevHref: ROUTES.SERVICE_JOURNEY_PAYMENT,
    prevLabel: 'Payment & Booking Confirmation',
  },
};
