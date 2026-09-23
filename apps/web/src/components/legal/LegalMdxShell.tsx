import { PublicHeroShell } from '@/features/public-shell';
import styles from './LegalDocument.module.css';

type LegalMdxShellProps = {
  title: string;
  subtitle?: string;
  lastUpdatedYear?: string;
  children: React.ReactNode;
};

export function LegalMdxShell({
  title,
  subtitle,
  lastUpdatedYear = '2026',
  children,
}: LegalMdxShellProps) {
  return (
    <PublicHeroShell>
      <main className={styles.page}>
        <article className={styles.document} aria-labelledby="legal-page-title" data-legal-document>
          <h1 id="legal-page-title" tabIndex={-1}>
            {title}
          </h1>
          {subtitle ? <p>{subtitle}</p> : null}
          <div data-legal-body>{children}</div>
          <footer className={styles.documentFooter} data-legal-footer>
            <p>Last Updated: {lastUpdatedYear}</p>
          </footer>
        </article>
      </main>
    </PublicHeroShell>
  );
}
