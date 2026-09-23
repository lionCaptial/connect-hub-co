import type { Metadata } from 'next';
import { PublicHeroShell } from '@/features/public-shell';
import { BusinessAbout } from '@/components/common/BusinessAbout';

export const metadata: Metadata = {
  title: 'About Us | Holy Yatra',
  description:
    'Holy Yatra creates premium operational services that bring tradition, lawful processes, specialist expertise and professional execution together for families who value authenticity, privacy and personal attention.',
};

export default function AboutPage() {
  return <PublicHeroShell><BusinessAbout /></PublicHeroShell>;
}
