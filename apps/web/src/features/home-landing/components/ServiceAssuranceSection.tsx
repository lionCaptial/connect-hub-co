'use client';

import { motion } from 'motion/react';
import type { ReactNode } from 'react';
import { homeLandingContent } from '../content';
import styles from './ServiceAssuranceSection.module.css';

type Accent = (typeof homeLandingContent.assurance.items)[number]['accent'];

const accentClass: Record<Accent, string> = {
  gold: styles.accentGold,
  blue: styles.accentBlue,
  green: styles.accentGreen,
  purple: styles.accentPurple,
  orange: styles.accentOrange,
  teal: styles.accentTeal,
  magenta: styles.accentMagenta,
};

function CardIcon({ accent }: { accent: Accent }) {
  const common = {
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.6,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true as const,
    className: styles.iconSvg,
  };

  const icons: Record<Accent, ReactNode> = {
    gold: (
      <svg {...common}>
        <circle cx="9" cy="8" r="2.2" />
        <circle cx="15" cy="8" r="2.2" />
        <circle cx="12" cy="14.5" r="2.2" />
        <path d="M5.5 19c.8-2.2 2.6-3.5 5.5-3.5" />
        <path d="M18.5 19c-.8-2.2-2.6-3.5-5.5-3.5" />
      </svg>
    ),
    blue: (
      <svg {...common}>
        <path d="M12 3.5 19 7v5.2c0 4.2-2.9 7.1-7 8.3-4.1-1.2-7-4.1-7-8.3V7l7-3.5Z" />
        <path d="m9.2 12.2 1.9 1.9 3.7-3.8" />
      </svg>
    ),
    green: (
      <svg {...common}>
        <rect x="4" y="7" width="11" height="8" rx="1.5" />
        <path d="m15 10.5 5-2.5v8l-5-2.5" />
      </svg>
    ),
    purple: (
      <svg {...common}>
        <circle cx="8.5" cy="9" r="2.2" />
        <circle cx="15.5" cy="9" r="2.2" />
        <path d="M4.8 18.5c.9-2.4 2.8-3.6 5.2-3.6" />
        <path d="M19.2 18.5c-.9-2.4-2.8-3.6-5.2-3.6" />
        <path d="M12 14.2v4.3" />
        <path d="M10.2 16.5h3.6" />
      </svg>
    ),
    orange: (
      <svg {...common}>
        <path d="M8 12.5c0-2.4 1.6-4 4-4h.5" />
        <path d="M16 11.5c0 2.4-1.6 4-4 4h-.5" />
        <path d="M8.2 9.2 6 7.5l2-1.8" />
        <path d="M15.8 14.8 18 16.5l-2 1.8" />
        <circle cx="8" cy="12.5" r="2.2" />
        <circle cx="16" cy="11.5" r="2.2" />
      </svg>
    ),
    teal: (
      <svg {...common}>
        <rect x="6" y="11" width="12" height="9" rx="1.5" />
        <path d="M8.5 11V8.5a3.5 3.5 0 0 1 7 0V11" />
      </svg>
    ),
    magenta: (
      <svg {...common}>
        <path d="M12 3.5 13.7 9H19l-4.2 3.2L16.4 18 12 14.8 7.6 18l1.6-5.8L5 9h5.3L12 3.5Z" />
      </svg>
    ),
  };

  return icons[accent];
}

const listVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.06 },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
  },
} as const;

export function ServiceAssuranceSection() {
  const { assurance } = homeLandingContent;

  return (
    <section
      id="service-assurance"
      className={styles.section}
      aria-labelledby="service-assurance-heading"
    >
      <header className={styles.intro}>
        <p className={styles.eyebrow}>{assurance.eyebrow}</p>
        <h2 id="service-assurance-heading" className={styles.heading}>
          {assurance.heading}
        </h2>
        <p className={styles.support}>{assurance.body}</p>
      </header>

      <motion.ul
        className={styles.grid}
        variants={listVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {assurance.items.map((item) => (
          <motion.li
            key={item.id}
            id={item.id}
            className={`${styles.card} ${accentClass[item.accent]}`}
            variants={cardVariants}
          >
            <span className={styles.icon} aria-hidden="true">
              <CardIcon accent={item.accent} />
            </span>
            <h3 className={styles.cardTitle}>{item.title}</h3>
            <ul className={styles.features}>
              {item.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </motion.li>
        ))}
      </motion.ul>
    </section>
  );
}
