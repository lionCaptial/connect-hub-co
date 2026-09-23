"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PUBLIC_BRAND } from "@/config/publicBrand";
import { ROUTES } from "@/config/navigation";
import { shouldShowPublicChrome } from "@/config/publicShellVisibility";

const contactTopic = (topic: string) => `/contact?topic=${topic}`;

const footerColumns = [
  {
    heading: PUBLIC_BRAND.assuranceHeading,
    links: [
      { label: "Service Assurance", href: "/#service-assurance" },
    ],
  },
  {
    heading: "Service Journey",
    links: [
      { label: "Book Now", href: ROUTES.BOOKING },
      {
        label: "Quotation & Agreement",
        href: ROUTES.SERVICE_JOURNEY_QUOTATION,
      },
      {
        label: "Payment & Booking Confirmation",
        href: ROUTES.SERVICE_JOURNEY_PAYMENT,
      },
      {
        label: "Fulfilment & Closure",
        href: ROUTES.SERVICE_JOURNEY_FULFILMENT,
      },
    ],
  },
  {
    heading: "Quick Access",
    links: [
      { label: "Track Service Request", href: ROUTES.TRACKING },
      { label: "Track Registration", href: ROUTES.TRACK_REGISTRATION },
      { label: "Knowledge Center", href: ROUTES.KNOWLEDGE_CENTER },
      { label: "AI Help", href: ROUTES.ASK_GENZ_AI },
    ],
  },
  {
    heading: "Protection",
    links: [
      { label: "Our Privacy Policy", href: ROUTES.PRIVACY_POLICY },
      { label: "Booking Terms & Conditions", href: ROUTES.BOOKING_TERMS },
      { label: "Cancellation & Refund Policy", href: ROUTES.CANCELLATION_POLICY },
    ],
  },
] as const;

export function BusinessFooter() {
  const path = usePathname();

  if (!shouldShowPublicChrome(path)) return null;

  const footerLinkClass =
    "rounded-r-md border-l-[3px] border-l-transparent px-2 py-2 text-[14px] text-[color-mix(in_srgb,var(--ch-bg-elevated)_78%,var(--ch-gold)_22%)] transition-colors hover:text-[var(--ch-bg-elevated)] [&[aria-current=page]]:border-l-[var(--ch-gold-soft)] [&[aria-current=page]]:bg-[color-mix(in_srgb,var(--ch-gold)_20%,transparent)] [&[aria-current=page]]:text-[var(--ch-bg-elevated)]";
  const footerHeadingClass =
    "mb-1 text-left text-[14px] font-semibold tracking-wider text-[var(--ch-gold-soft)]";

  return (
    <footer className="relative z-10 w-full border-t border-[color-mix(in_srgb,var(--ch-gold)_45%,transparent)] bg-[var(--ch-ink)] px-4 py-6 text-[var(--ch-bg-elevated)]">
      <div className="mx-auto grid max-w-[1536px] grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1.6fr)_minmax(0,4fr)]">
        <div className="flex flex-col items-center text-center lg:items-start lg:border-r lg:border-[color-mix(in_srgb,var(--ch-gold)_30%,transparent)] lg:pr-8 lg:text-left">
          <Image
            src="/images/brand/golden-lotus-mark.svg"
            alt={`${PUBLIC_BRAND.name} logo`}
            width={60}
            height={50}
            className="mb-1 h-[50px] w-[60px] shrink-0"
          />

          <h2 className="font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[var(--ch-bg-elevated)] sm:text-2xl">
            {PUBLIC_BRAND.name}
          </h2>

          <div className="my-1 flex items-center gap-2">
            <span className="h-[1px] w-10 bg-[var(--ch-gold)]" />
            <span className="text-[10px] text-[var(--ch-gold)]">&#9830;</span>
            <span className="h-[1px] w-10 bg-[var(--ch-gold)]" />
          </div>

          <p className="text-sm font-semibold text-[var(--ch-gold-soft)]">
            {PUBLIC_BRAND.tagline}
          </p>
          <p className="mt-1 text-xs text-[color-mix(in_srgb,var(--ch-bg-elevated)_72%,var(--ch-gold)_28%)]">
            {PUBLIC_BRAND.subLine}
          </p>
          <p className="mt-3 max-w-sm text-xs leading-relaxed text-[color-mix(in_srgb,var(--ch-bg-elevated)_78%,var(--ch-gold)_22%)]">
            {PUBLIC_BRAND.companyBlurb}
          </p>
          <Link
            href="/about"
            className="mt-2 text-xs font-semibold text-[var(--ch-gold-soft)] underline decoration-[color-mix(in_srgb,var(--ch-gold)_55%,transparent)] underline-offset-4 transition-colors hover:text-[var(--ch-bg-elevated)]"
          >
            Know More
          </Link>
          <div className="mt-3 space-y-1 text-[11px] text-[color-mix(in_srgb,var(--ch-bg-elevated)_72%,var(--ch-gold)_28%)]">
            <p>&#128737;&#65039; {PUBLIC_BRAND.registeredLine}</p>
            <p>{PUBLIC_BRAND.rightsLine}</p>
          </div>
        </div>

        <div className="flex min-w-0 flex-col gap-5">
          <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <nav
                key={column.heading}
                aria-label={column.heading}
                className="mx-auto flex w-full max-w-[210px] flex-col space-y-1 sm:mx-0"
              >
                <h3 className={footerHeadingClass}>{column.heading}</h3>
                {column.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    aria-current={path === link.href ? "page" : undefined}
                    className={footerLinkClass}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>
            ))}
          </div>

          <div className="mt-auto grid gap-5 border-t border-[color-mix(in_srgb,var(--ch-gold)_30%,transparent)] pt-5 md:grid-cols-[minmax(250px,420px)_1fr] md:items-center">
            <div className="w-full">
              <h3 className="mb-2 text-[14px] font-semibold tracking-wider text-[var(--ch-gold-soft)]">
                Request Updates
              </h3>

              <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter email or phone..."
                  className="min-w-0 flex-1 rounded-md border border-[color-mix(in_srgb,var(--ch-gold)_50%,transparent)] bg-[color-mix(in_srgb,var(--ch-ink)_88%,#000_12%)] px-3 py-2 text-[11px] text-[var(--ch-bg-elevated)] placeholder-[color-mix(in_srgb,var(--ch-bg-elevated)_62%,var(--ch-gold)_38%)] focus:border-[var(--ch-gold-soft)] focus:outline-none"
                />

                <button
                  type="submit"
                  className="flex shrink-0 items-center justify-center rounded-md bg-[var(--ch-gold)] px-4 py-2 text-[11px] font-semibold text-[var(--ch-bg-elevated)] transition-colors hover:bg-[var(--ch-gold-soft)]"
                >
                  Subscribe &#8594;
                </button>
              </form>
            </div>

            <div>
              <p className="mb-2 text-center text-[11px] tracking-wide text-[var(--ch-gold-soft)] md:text-right">
                Connect with us
              </p>
              <div className="flex items-center justify-center gap-4 md:justify-end">
                <a
                  href={contactTopic("social-facebook")}
                  aria-label="Facebook"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ch-gold)] text-xs font-bold text-[var(--ch-gold-soft)] transition-colors hover:bg-[var(--ch-gold)] hover:text-[var(--ch-ink)]"
                >
                  f
                </a>

                <a
                  href={contactTopic("social-x")}
                  aria-label="X"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ch-gold)] text-xs font-bold text-[var(--ch-gold-soft)] transition-colors hover:bg-[var(--ch-gold)] hover:text-[var(--ch-ink)]"
                >
                  X
                </a>

                <a
                  href={contactTopic("social-youtube")}
                  aria-label="YouTube"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ch-gold)] text-xs font-bold text-[var(--ch-gold-soft)] transition-colors hover:bg-[var(--ch-gold)] hover:text-[var(--ch-ink)]"
                >
                  &#9654;
                </a>

                <a
                  href={contactTopic("social-linkedin")}
                  aria-label="LinkedIn"
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-[var(--ch-gold)] text-xs font-bold text-[var(--ch-gold-soft)] transition-colors hover:bg-[var(--ch-gold)] hover:text-[var(--ch-ink)]"
                >
                  in
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-6 flex max-w-[1536px] items-center justify-center gap-2">
        <span className="h-[1px] w-8 shrink-0 bg-[color-mix(in_srgb,var(--ch-gold)_60%,transparent)]" />

        <span className="shrink-0 text-[10px] text-[var(--ch-gold)]">&#9830;</span>

        <p className="text-center text-sm font-semibold tracking-wide text-[var(--ch-bg-elevated)] sm:text-base">
          Made with{" "}
          <span className="text-xl text-red-500">&#9829;</span>{" "}
          for Dharma, Devotion & Digital India
        </p>

        <span className="shrink-0 text-[10px] text-[var(--ch-gold)]">&#9830;</span>

        <span className="h-[1px] w-8 shrink-0 bg-[color-mix(in_srgb,var(--ch-gold)_60%,transparent)]" />
      </div>

      <div className="mx-auto mt-2 flex max-w-[1536px] items-center justify-center gap-1">
        <span className="h-[1px] w-10 shrink-0 bg-[var(--ch-gold)] sm:w-16" />

        <span className="shrink-0 text-[10px] text-[var(--ch-gold)]">&#9830;</span>

        <p className="px-1 text-center text-[12px] font-semibold tracking-wide text-[var(--ch-gold-soft)]">
          Combining tradition with technology to make your spiritual journey smooth, transparent, and meaningful.
        </p>

        <span className="shrink-0 text-[10px] text-[var(--ch-gold)]">&#9830;</span>

        <span className="h-[1px] w-10 shrink-0 bg-[var(--ch-gold)] sm:w-16" />
      </div>
    </footer>
  );
}






