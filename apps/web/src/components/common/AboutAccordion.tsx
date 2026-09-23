'use client';

import { useState, type ReactNode } from 'react';

export type AboutAccordionPanel = {
  id: string;
  title: string;
  children: ReactNode;
};

export function AboutAccordion({ panels }: { panels: ReadonlyArray<AboutAccordionPanel> }) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="border-t border-[var(--ch-hairline)]">
      {panels.map((panel) => {
        const isOpen = openId === panel.id;
        const panelId = `about-panel-${panel.id}`;
        const headerId = `about-header-${panel.id}`;

        return (
          <div key={panel.id} className="border-b border-[var(--ch-hairline)]">
            <h2 className="m-0">
              <button
                type="button"
                id={headerId}
                className="flex w-full items-center justify-between gap-4 px-0 py-5 text-left font-[family-name:var(--font-display)] text-xl font-bold text-[var(--ch-ink)] sm:text-2xl"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : panel.id)}
              >
                <span>{panel.title}</span>
                <span aria-hidden className="text-[var(--ch-accent)]">
                  {isOpen ? '−' : '+'}
                </span>
              </button>
            </h2>
            {isOpen ? (
              <div
                id={panelId}
                role="region"
                aria-labelledby={headerId}
                className="pb-6 text-[var(--ch-ink-muted)]"
              >
                {panel.children}
              </div>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
