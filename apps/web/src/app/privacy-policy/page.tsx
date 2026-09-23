import type { Metadata } from 'next';
import Content from '@content/legal/privacy-policy.mdx';
import { LegalMdxShell } from '@/components/legal/LegalMdxShell';

export const metadata: Metadata = {
  title: 'Privacy Policy | Holy Yatra',
  description:
    'Holy Yatra Privacy Policy — how personal information is collected, used, and protected.',
  alternates: { canonical: '/privacy-policy' },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalMdxShell
      title="Our Privacy Policy"
      subtitle="Your Information. Used Only for Your Service."
    >
      <Content />
    </LegalMdxShell>
  );
}
