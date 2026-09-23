'use client';

import { priestTerminology } from '@/lib/priest-terminology';

import type { FormEvent } from 'react';
import { useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { PublicHeroShell } from '@/features/public-shell';
import { QuestionCircleIcon, MulticolourAiBrainIcon } from '@/features/public-shell/components/PublicHeroSidebar';
import { getUniversalRequestByReferenceId } from '@/services/urms.api';
import type { URMSUniversalRecord } from '@/types/urms';
import { CommercialWorkflowPanel } from './CommercialWorkflowPanel';
import { ROUTES } from '@/config/navigation';

type TrackingMode = 'service' | 'partner' | 'companion';

function resolvePreferredMode(type: string | null): TrackingMode {
  if (type === 'partner') return 'partner';
  if (type === 'companion') return 'companion';
  return 'service';
}

function modeCopy(mode: TrackingMode) {
  if (mode === 'partner') {
    return {
      heading: 'Track Priest Registration',
      idLabel: 'Priest Registration ID',
      formId: 'track-partner-registration',
      tone: 'partner' as const,
      empty: 'No Priest Registration was found for those verified details.',
      resultTitle: 'Priest Registration Tracking Result',
      statusLabel: 'Application Status',
    };
  }
  if (mode === 'companion') {
    return {
      heading: 'Track Travel Companion Registration',
      idLabel: 'Travel Companion Registration ID',
      formId: 'track-companion-registration',
      tone: 'companion' as const,
      empty: 'No Travel Companion Registration was found for those verified details.',
      resultTitle: 'Travel Companion Registration Tracking Result',
      statusLabel: 'Application Status',
    };
  }
  return {
    heading: 'Track Service Request',
    idLabel: 'Service Request ID',
    formId: 'track-service-request',
    tone: 'service' as const,
    empty: 'No customer or service request was found for those verified details.',
    resultTitle: 'Service Request Tracking Result',
    statusLabel: 'Request Status',
  };
}

function matchesTrackingMode(mode: TrackingMode, requestType: URMSUniversalRecord['requestType']) {
  if (mode === 'partner') return requestType === 'PARTNER_REGISTRATION';
  // Companion applications currently use the public inquiry path (INQUIRY).
  if (mode === 'companion') return requestType === 'INQUIRY';
  return requestType !== 'PARTNER_REGISTRATION';
}

function TrackingForm({
  mode,
  preferred,
  loading,
  onTrack,
}: {
  mode: TrackingMode;
  preferred: boolean;
  loading: boolean;
  onTrack: (referenceId: string, verification: string, mode: TrackingMode) => Promise<void>;
}) {
  const [referenceId, setReferenceId] = useState('');
  const [verification, setVerification] = useState('');
  const copy = modeCopy(mode);
  const focusBorder = 'focus:border-[var(--ch-accent)]';
  const panelClass =
    copy.tone === 'partner'
      ? 'bg-[var(--ch-accent-soft)]/80'
      : copy.tone === 'companion'
        ? 'bg-[color-mix(in_srgb,var(--ch-accent-soft)_70%,#ffffff)]'
        : 'bg-[color-mix(in_srgb,var(--ch-accent-soft)_55%,#ffffff)]';
  const preferredRing = 'ring-1 ring-inset ring-[var(--ch-accent)]';
  const buttonClass = 'rounded-full bg-[var(--ch-accent-soft)] text-[var(--ch-ink)]';
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    void onTrack(referenceId, verification, mode);
  }

  return (
    <form
      id={copy.formId}
      onSubmit={submit}
      className={`flex h-full flex-col p-5 sm:p-6 ${panelClass} ${preferred ? preferredRing : ''}`}
    >
      <h2 className="font-serif text-xl font-bold text-[var(--ch-ink)]">{copy.heading}</h2>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">
        {copy.idLabel} *
        <input
          autoFocus={preferred}
          className={`mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-4 py-3 font-mono text-sm outline-none ${focusBorder}`}
          name="referenceId"
          required
          value={referenceId}
          onChange={(event) => setReferenceId(event.target.value)}
          placeholder="CHC-YYYY-XXXXXX"
        />
      </label>
      <label className="mt-4 block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">
        Registered Email or Mobile *
        <input
          className={`mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-4 py-3 text-sm outline-none ${focusBorder}`}
          name="verification"
          required
          value={verification}
          onChange={(event) => setVerification(event.target.value)}
        />
      </label>
      <button
        className={`mt-4 w-full px-5 py-3 font-semibold disabled:opacity-50 ${buttonClass}`}
        disabled={loading}
        type="submit"
      >
        {loading ? 'Searching...' : copy.heading}
      </button>
      <div className="mt-auto pt-5">
        {mode === 'partner' ? (
          <Link
            className="flex w-fit items-center gap-2 rounded-full bg-[var(--ch-accent)] px-4 py-2 text-sm font-semibold text-white shadow-sm"
            href="/zen-g"
          >
            <span className="flex h-[35px] w-[35px] items-center justify-center [&>svg]:h-[35px] [&>svg]:w-[35px]">
              <MulticolourAiBrainIcon />
            </span>
            <span>May I Help You?</span>
          </Link>
        ) : mode === 'companion' ? (
          <Link
            className="flex w-fit items-center gap-2 rounded-full border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-4 py-2 text-sm font-semibold text-[var(--ch-ink)] shadow-sm hover:bg-[var(--ch-accent-soft)]"
            href={ROUTES.TRAVEL_COMPANION_REGISTER}
          >
            Travel Companion Registration
          </Link>
        ) : (
          <Link
            className="flex w-fit items-center gap-2 rounded-full border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] px-4 py-2 text-sm font-semibold text-[var(--ch-ink)] shadow-sm hover:bg-[var(--ch-accent-soft)]"
            href="/contact?topic=inquiry"
          >
            <span className="flex h-[35px] w-[35px] items-center justify-center [&>svg]:h-[35px] [&>svg]:w-[35px]">
              <QuestionCircleIcon />
            </span>
            <span>Raise Inquiry</span>
          </Link>
        )}
      </div>
    </form>
  );
}

export default function TrackingPage() {
  const searchParams = useSearchParams();
  const preferredMode = resolvePreferredMode(searchParams.get('type'));
  const [loadingMode, setLoadingMode] = useState<TrackingMode | null>(null);
  const [resultMode, setResultMode] = useState<TrackingMode>(preferredMode);
  const [searchedReference, setSearchedReference] = useState('');
  const [verifiedContact, setVerifiedContact] = useState('');
  const [record, setRecord] = useState<URMSUniversalRecord | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function track(referenceId: string, verification: string, mode: TrackingMode) {
    const cleanReference = referenceId.trim().toUpperCase();
    if (!/^CHC-\d{4}-\d{6}$/.test(cleanReference)) {
      setResultMode(mode);
      setSearchedReference(cleanReference);
      setRecord(null);
      setMessage('Enter a valid reference ID in the format CHC-YYYY-XXXXXX.');
      return;
    }

    setLoadingMode(mode);
    setResultMode(mode);
    setSearchedReference(cleanReference);
    setMessage(null);
    try {
      const result = await getUniversalRequestByReferenceId(cleanReference, 'GUEST', verification);
      const matchesMode = Boolean(result && matchesTrackingMode(mode, result.requestType));
      setRecord(matchesMode ? result : null);
      setVerifiedContact(matchesMode ? verification.trim() : '');
      if (!matchesMode) setMessage(modeCopy(mode).empty);
    } catch {
      setRecord(null);
      setVerifiedContact('');
      setMessage(modeCopy(mode).empty);
    } finally {
      setLoadingMode(null);
    }
  }

  const resultCopy = modeCopy(resultMode);
  const partnerResult = resultMode === 'partner';

  async function refreshCommercialWorkflow() {
    const refreshed = await getUniversalRequestByReferenceId(searchedReference, 'GUEST', verifiedContact);
    if (!refreshed) throw new Error('Tracking refresh failed.');
    setRecord(refreshed);
  }

  return (
    <PublicHeroShell>
      <main className="bg-[var(--ch-bg)] px-4 py-5 text-[var(--ch-ink)] sm:px-6 sm:py-6">
        <div className="mx-auto max-w-5xl space-y-4">
          <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[linear-gradient(165deg,#0b2430_0%,var(--ch-accent)_72%,#123a4f_100%)] px-5 py-4 text-[#f4f8fb] shadow-sm sm:px-6">
            <p className="text-xs font-semibold uppercase tracking-widest text-[var(--ch-accent-soft)]">Track &amp; Status Support</p>
            <h1 className="mt-2 font-serif text-3xl font-bold">Track Your Request or Registration</h1>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-[color-mix(in_srgb,#f4f8fb_88%,transparent)]">
              Track a service request, Priest Registration, or Travel Companion Registration using the registered
              reference details below.
            </p>
            <p className="mt-3 text-sm text-[color-mix(in_srgb,#f4f8fb_88%,transparent)]">
              <span className="font-semibold text-[var(--ch-accent-soft)]">PLEASE MAKE SURE -</span> Please use the same
              Registered Reference ID, Email or Mobile Number associated with it, for every purpose.
            </p>
          </section>

          <section className="overflow-hidden rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] shadow-[var(--ch-shadow-soft)]">
            <div className="grid lg:grid-cols-3 lg:divide-x lg:divide-[color:var(--ch-hairline)]">
              <TrackingForm
                mode="service"
                preferred={preferredMode === 'service'}
                loading={loadingMode !== null}
                onTrack={track}
              />
              <TrackingForm
                mode="partner"
                preferred={preferredMode === 'partner'}
                loading={loadingMode !== null}
                onTrack={track}
              />
              <TrackingForm
                mode="companion"
                preferred={preferredMode === 'companion'}
                loading={loadingMode !== null}
                onTrack={track}
              />
            </div>
          </section>

          {searchedReference ? (
            <section className="rounded-2xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-4 shadow-[var(--ch-shadow-soft)] sm:p-8">
              {record ? (
                <>
                  <h2 className="font-serif text-2xl font-bold text-[var(--ch-ink)]">{resultCopy.resultTitle}</h2>
                  <dl className="mt-6 grid gap-4 rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-5 sm:grid-cols-2">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">
                        {resultCopy.idLabel}
                      </dt>
                      <dd className="mt-1 font-mono font-bold text-[var(--ch-ink)]">{record.referenceId}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">
                        {resultCopy.statusLabel}
                      </dt>
                      <dd className="mt-1 font-bold text-[var(--ch-accent)]">
                        {record.currentStatus.replaceAll('_', ' ')}
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Last Updated</dt>
                      <dd className="mt-1 text-[var(--ch-ink)]">{new Date(record.updatedAt).toLocaleString()}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Current Stage</dt>
                      <dd className="mt-1 text-[var(--ch-ink)]">{priestTerminology(record.currentStage)}</dd>
                    </div>
                    {record.expectedNextStep ? (
                      <div className="sm:col-span-2">
                        <dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">
                          Next Step / Action Required
                        </dt>
                        <dd className="mt-1 text-[var(--ch-ink)]">{priestTerminology(record.expectedNextStep)}</dd>
                      </div>
                    ) : null}
                  </dl>
                  {record.timeline.length ? (
                    <div className="mt-6">
                      <h3 className="font-semibold text-[var(--ch-ink)]">Public Updates</h3>
                      <div className="mt-3 space-y-3">
                        {record.timeline.map((event) => (
                          <article className="rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-4 text-sm" key={event.id}>
                            <div className="flex flex-wrap justify-between gap-2">
                              <strong>{priestTerminology(event.title)}</strong>
                              <time className="text-xs text-[var(--ch-ink-muted)]">
                                {new Date(event.timestamp).toLocaleString()}
                              </time>
                            </div>
                            <p className="mt-1 text-[var(--ch-ink-muted)]">{priestTerminology(event.description)}</p>
                          </article>
                        ))}
                      </div>
                    </div>
                  ) : null}
                  {!partnerResult && record.requestType === 'SERVICE_REQUEST' ? (
                    <CommercialWorkflowPanel
                      referenceId={record.referenceId}
                      verification={verifiedContact}
                      workflow={record.commercialWorkflow ?? null}
                      onRefresh={refreshCommercialWorkflow}
                    />
                  ) : null}
                </>
              ) : (
                <div className="text-center">
                  <h2 className="font-serif text-xl font-bold text-[var(--ch-ink)]">Tracking record not available</h2>
                  <p className="mx-auto mt-2 max-w-lg text-sm text-[var(--ch-ink-muted)]">{message}</p>
                </div>
              )}
            </section>
          ) : null}
        </div>
      </main>
    </PublicHeroShell>
  );
}
