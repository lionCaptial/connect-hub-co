import type { Metadata } from 'next';
import Content from '@content/legal/cancellation-refund-policy.mdx';
import { LegalMdxShell } from '@/components/legal/LegalMdxShell';

export const metadata: Metadata = {
  title: 'Cancellation & Refund Policy | Holy Yatra',
  description:
    'Holy Yatra Cancellation & Refund Policy for cancellations, rescheduling, and refunds.',
  alternates: { canonical: '/cancellation-policy' },
};

export default function CancellationPolicyPage() {
  return (
    <LegalMdxShell
      title="Cancellation & Refund Policy"
      subtitle="Clear Process. Fair Resolution."
    >
      <Content />
    </LegalMdxShell>
  );
}
