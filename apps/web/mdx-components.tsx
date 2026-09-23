import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import { PrivacyConsentCheckboxes } from '@/components/legal/PrivacyConsentCheckboxes';
import { CsaAcceptance } from '@/components/legal/CsaAcceptance';
import { CsaPlaceholder } from '@/components/legal/CsaPlaceholder';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    a: ({ href, children, ...props }) =>
      href?.startsWith('/') ? (
        <Link href={href} {...props}>
          {children}
        </Link>
      ) : (
        <a href={href} {...props}>
          {children}
        </a>
      ),
    PrivacyConsentCheckboxes,
    CsaAcceptance,
    CsaPlaceholder,
    ...components,
  };
}
