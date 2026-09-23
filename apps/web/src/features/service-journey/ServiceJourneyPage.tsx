import Link from 'next/link';
import { PublicHeroShell } from '@/features/public-shell';
import type { ServiceJourneyPageContent } from './content';
import styles from './ServiceJourneyPage.module.css';

type ServiceJourneyPageProps = {
  content: ServiceJourneyPageContent;
};

export function ServiceJourneyPage({ content }: ServiceJourneyPageProps) {
  return (
    <PublicHeroShell>
      <main className={styles.main}>
        <div className={styles.container}>
          <section className={styles.card}>
            <p className={styles.eyebrow}>{content.eyebrow}</p>
            <h1 className={styles.title}>{content.title}</h1>
            <p className={styles.intro}>{content.intro}</p>

            <ol className={styles.steps}>
              {content.steps.map((step) => (
                <li key={step.title} className={styles.stepItem}>
                  <h2 className={styles.stepTitle}>{step.title}</h2>
                  <p className={styles.stepBody}>{step.body}</p>
                </li>
              ))}
            </ol>

            {content.notes?.length ? (
              <ul className={styles.notes}>
                {content.notes.map((note) => (
                  <li key={note}>{note}</li>
                ))}
              </ul>
            ) : null}

            <div className={styles.ctaRow}>
              {content.ctas.map((cta) => (
                <Link
                  key={`${cta.label}-${cta.href}`}
                  href={cta.href}
                  className={cta.variant === 'primary' ? styles.primaryCta : styles.secondaryCta}
                >
                  {cta.label}
                </Link>
              ))}
            </div>
          </section>

          {content.prevHref || content.nextHref ? (
            <nav className={styles.journeyNav} aria-label="Service journey navigation">
              {content.prevHref && content.prevLabel ? (
                <Link href={content.prevHref} className={styles.journeyLink}>
                  {`<- ${content.prevLabel}`}
                </Link>
              ) : (
                <span />
              )}
              {content.nextHref && content.nextLabel ? (
                <Link href={content.nextHref} className={styles.journeyLink}>
                  {`${content.nextLabel} ->`}
                </Link>
              ) : null}
            </nav>
          ) : null}
        </div>
      </main>
    </PublicHeroShell>
  );
}
