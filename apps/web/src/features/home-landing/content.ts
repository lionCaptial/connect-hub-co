import { ROUTES } from '@/config/navigation';
import { PUBLIC_BRAND } from '@/config/publicBrand';

export const homeLandingContent = {
  brand: PUBLIC_BRAND.name,
  slides: [
    {
      id: 'pitru-moksha-gaya',
      headline: 'When you can’t reach Gaya, devotion still can.',
      support:
        'Coordinate ancestral rites online or in person — with privacy, sanctity, and a path you can follow.',
      cta: {
        label: 'Find your PitruMoksha path',
        href: ROUTES.PITRU_MOKSHA_GAYA,
      },
      image: {
        src: '/images/heroes/hero-1/Hero_1_PitruMoksha_Gaya_v2.0.png',
        alt: 'PitruMoksha Gaya sacred coordination',
      },
    },
    {
      id: 'ritual-services',
      headline: 'Every rite deserves a priest you can trust.',
      support:
        'From sankalp to completion — verified priests, clear coordination, whether you’re here or far away.',
      cta: {
        label: 'See ritual pathways',
        href: ROUTES.RITUAL_SERVICES,
      },
      image: {
        src: '/images/heroes/hero-2/Hero_2_Ritual_Services_v1.0.png',
        alt: 'Ritual services atmosphere',
      },
    },
    {
      id: 'travel-assistance',
      headline: 'The journey to the tirtha shouldn’t feel uncertain.',
      support:
        'Pilgrimage support across India and Nepal — practical help, respectful guidance, fewer unknowns.',
      cta: {
        label: 'Plan sacred travel',
        href: ROUTES.TRAVEL_ASSISTANCE,
      },
      image: {
        src: '/images/heroes/hero-3/Hero_3_Travel_Assistance_v1.0.png',
        alt: 'Sacred travel assistance',
      },
    },
    {
      id: 'vahi-records',
      headline: 'Your lineage is waiting to be found.',
      support:
        'Guided Gotra and Vahi (Panji) assistance with authorised custodians — careful, honest, never overpromised.',
      cta: {
        label: 'Begin lineage search',
        href: ROUTES.VAHI_RECORDS,
      },
      image: {
        src: '/images/heroes/hero-4/Hero_4_Vahi_Records_v1.0.png',
        alt: 'Traditional Vahi ancestral records',
      },
    },
    {
      id: 'verified-priest',
      headline: 'Faith needs partners who honour it.',
      support:
        'Join a network built on authenticity and accountability — so families find you with confidence.',
      cta: {
        label: 'Join as Verified Priest',
        href: ROUTES.RELIGIOUS_PARTNERS,
      },
      image: {
        src: '/images/heroes/hero-5/Hero_5_Religious_Partner_Network_v1.0.png',
        alt: 'Verified Priest network',
      },
    },
  ],
  assurance: {
    eyebrow: PUBLIC_BRAND.assuranceHeading,
    heading: 'Special Advantages',
    body: 'Different journeys. The same devotion.',
    items: [
      {
        id: 'attend-your-way',
        title: 'Attend Your Way',
        accent: 'gold',
        features: [
          'Flexible Options',
          'Choose What Suits You',
          'No Need to Share Reasons',
        ],
      },
      {
        id: 'independent-verification',
        title: 'Independent Verification',
        accent: 'blue',
        features: [
          'Verify Arrangements',
          'Check Authenticity',
          'Greater Confidence',
        ],
      },
      {
        id: 'virtual-services',
        title: 'Virtual Services',
        accent: 'green',
        features: [
          'Live Puja & Rituals',
          'Chants & Jaap',
          'Personalized Participation',
        ],
      },
      {
        id: 'shadow-traveller',
        title: 'Shadow Traveller',
        accent: 'purple',
        features: [
          'Local Assistance',
          'On-Ground Presence',
          'Support For Families',
        ],
      },
      {
        id: 'partner-opportunities',
        title: 'Partner Opportunities',
        accent: 'orange',
        features: [
          'Income Opportunities',
          'Value-Added Services',
          'Be Part of a Trusted Network',
        ],
      },
      {
        id: 'confidential-service',
        title: 'Confidential Service',
        accent: 'teal',
        features: [
          'Discreet Handling',
          'Dignity and Comfort',
          'Only Essential Information',
        ],
      },
      {
        id: 'beyond-standard',
        title: 'Beyond the Standard Service',
        accent: 'magenta',
        features: [
          'Custom Arrangements',
          'Additional Rituals or Add-ons',
          'Solutions for Unique Situations',
        ],
      },
    ],
  },
  finalEnquire: {
    title: 'Speak with a coordinator',
    body: 'Share your situation. A human coordinator will help you take the next respectful step.',
    cta: {
      label: 'Talk to a coordinator',
      href: ROUTES.INQUIRY,
    },
  },
} as const;

export type HomeLandingContent = typeof homeLandingContent;
export type HomeLandingSlide = (typeof homeLandingContent.slides)[number];
