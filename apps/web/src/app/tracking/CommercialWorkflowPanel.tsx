'use client';

import { priestTerminology } from '@/lib/priest-terminology';

import { useState } from 'react';
import Link from 'next/link';
import { ApiError } from '@/lib/api';
import { submitAgreementAcceptance, submitCustomerPaymentDetails, submitQuotationDecision } from '@/services/urms.api';
import type { CustomerQuotationDecision, CustomerSafeCommercialWorkflow, ExternalBankPaymentMode } from '@/types/urms';

interface Props {
  referenceId: string;
  verification: string;
  workflow: CustomerSafeCommercialWorkflow | null;
  onRefresh: () => Promise<void>;
}

const stageOrder = [
  'SERVICE_REQUEST',
  'QUOTATION',
  'AGREEMENT',
  'EXTERNAL_PAYMENT',
  'BOOKING_CONFIRMED',
] as const;
const stageLabels: Record<(typeof stageOrder)[number], string> = {
  SERVICE_REQUEST: 'Service Request',
  QUOTATION: 'Quotation',
  AGREEMENT: 'Client Service Agreement',
  EXTERNAL_PAYMENT: 'Payment Confirmation',
  BOOKING_CONFIRMED: 'Booking Confirmed',
};

export function lifecyclePosition(stage?: CustomerSafeCommercialWorkflow['stage']) {
  if (!stage || stage === 'NOT_STARTED' || stage === 'QUOTATION_DRAFT') return 1;
  if (['QUOTATION_RELEASED', 'QUOTATION_CHANGE_REQUESTED', 'QUOTATION_REJECTED'].includes(stage)) return 1;
  if (['QUOTATION_ACCEPTED', 'AGREEMENT_AVAILABLE'].includes(stage)) return 2;
  if (['AGREEMENT_ACCEPTED', 'AWAITING_EXTERNAL_PAYMENT'].includes(stage)) return 3;
  if (stage === 'PAYMENT_CONFIRMED') return 4;
  return 5;
}

const completedState = 'border-lime-400 bg-lime-50 text-lime-950 shadow-[0_0_10px_rgba(132,204,22,0.22)]';
const attentionState = 'border-yellow-400 bg-yellow-50 text-yellow-950 shadow-[0_0_10px_rgba(250,204,21,0.28)]';
const futureState = 'border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] text-[var(--ch-ink)]';

function customerStatusLabel(status: string) {
  return status.split('_').map((word) => `${word.charAt(0)}${word.slice(1).toLowerCase()}`).join(' ');
}

function customerPaymentTerms(value: string) {
  return value === 'External payment is due only after acceptance of the Client Service Agreement.'
    ? 'Payment is due only after acceptance of the Client Service Agreement.'
    : value;
}

function friendlyError(error: unknown) {
  const code = error instanceof ApiError ? error.message : '';
  const messages: Record<string, string> = {
    QUOTATION_ALREADY_DECIDED: 'This quotation has already been decided. Refreshing the latest status is recommended.',
    QUOTATION_NOT_ACTIONABLE: 'This quotation is no longer available for that action.',
    QUOTATION_EXPIRED: 'This quotation has expired. Please wait for a revised quotation.',
    QUOTATION_NOT_FOUND: 'The quotation is no longer available.',
    REQUEST_NOT_FOUND_OR_VERIFICATION_FAILED: 'The registered email or mobile verification no longer matches this request.',
    AGREEMENT_ALREADY_ACCEPTED: 'This agreement has already been accepted.',
    AGREEMENT_NOT_ACTIONABLE: 'This agreement version is no longer available for acceptance.',
    AGREEMENT_NOT_FOUND: 'The agreement is no longer available.',
  };
  return messages[code] ?? 'The action could not be completed. Please refresh the tracking result and try again.';
}

function money(value: string, currency: string) {
  const amount = Number(value);
  return Number.isFinite(amount)
    ? new Intl.NumberFormat('en-IN', { style: 'currency', currency }).format(amount)
    : `${currency} ${value}`;
}

function DetailList({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <h5 className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">{title}</h5>
      {items.length ? <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-[var(--ch-ink-muted)]">{items.map((item) => <li key={item}>{priestTerminology(item)}</li>)}</ul> : <p className="mt-1 text-sm text-[var(--ch-ink-muted)]">None specified.</p>}
    </div>
  );
}

function PaymentDetailsForm({ referenceId, verification, onRefresh }: Pick<Props, 'referenceId' | 'verification' | 'onRefresh'>) {
  const [amountPaid, setAmountPaid] = useState('');
  const [paymentDate, setPaymentDate] = useState('');
  const [externalReference, setExternalReference] = useState('');
  const [paymentMode, setPaymentMode] = useState<ExternalBankPaymentMode | ''>('');
  const [payerName, setPayerName] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const amount = Number(amountPaid);
    const parsedDate = new Date(paymentDate);
    if (!Number.isFinite(amount) || amount <= 0) return setError('Enter a valid positive amount paid.');
    if (!paymentDate || Number.isNaN(parsedDate.getTime()) || parsedDate > new Date()) return setError('Enter a valid payment date.');
    if (!externalReference.trim()) return setError('Enter the bank transaction, UTR, or reference number.');
    if (!paymentMode) return setError('Select a bank payment mode.');
    if (!payerName.trim()) return setError('Enter the payer name.');
    setSubmitting(true);
    setError(null);
    try {
      await submitCustomerPaymentDetails(referenceId, {
        amountPaid, paymentDate, externalReference: externalReference.trim(), paymentMode,
        payerName: payerName.trim(), contactVerification: verification,
      });
      await onRefresh();
    } catch (submissionError) {
      setError(friendlyError(submissionError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="mt-4 grid gap-3 sm:grid-cols-2" onSubmit={(event) => void submit(event)}>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Service Request ID<input className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] px-4 py-3 font-mono text-sm font-normal normal-case tracking-normal text-[var(--ch-ink-muted)]" readOnly value={referenceId} /></label>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Amount Paid *<input className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal" min="0.01" onChange={(event) => setAmountPaid(event.target.value)} required step="0.01" type="number" value={amountPaid} /></label>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Payment Date *<input className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal" onChange={(event) => setPaymentDate(event.target.value)} required type="date" value={paymentDate} /></label>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Bank Transaction / UTR / Reference No. *<input className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal" maxLength={200} onChange={(event) => setExternalReference(event.target.value)} required value={externalReference} /></label>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Payment Mode *<select className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal" onChange={(event) => setPaymentMode(event.target.value as ExternalBankPaymentMode | '')} required value={paymentMode}><option value="">Select bank mode</option><option value="BANK_TRANSFER">Bank Transfer</option><option value="NEFT">NEFT</option><option value="RTGS">RTGS</option><option value="IMPS">IMPS</option></select></label>
      <label className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Payer Name *<input className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-3 text-sm font-normal normal-case tracking-normal" maxLength={200} onChange={(event) => setPayerName(event.target.value)} required value={payerName} /></label>
      {error ? <p className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800 sm:col-span-2" role="alert">{error}</p> : null}
      <div className="sm:col-span-2"><button className="rounded-full bg-[var(--ch-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--ch-ink)] disabled:opacity-50" disabled={submitting} type="submit">Submit Payment Details</button></div>
    </form>
  );
}

export function CommercialWorkflowPanel({ referenceId, verification, workflow, onRefresh }: Props) {
  const [changeReason, setChangeReason] = useState('');
  const [showChange, setShowChange] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const currentQuotation = workflow?.quotations[0];
  const currentAgreement = workflow?.agreements[0];
  const position = lifecyclePosition(workflow?.stage);

  async function decide(decision: CustomerQuotationDecision) {
    if (!currentQuotation) return;
    const reason = changeReason.trim();
    if (decision === 'REQUEST_CHANGE' && !reason) {
      setError('Please describe the requested change.');
      return;
    }
    if (decision === 'REQUEST_CHANGE' && reason.length > 1000) {
      setError('The requested change must be 1,000 characters or fewer.');
      return;
    }
    const confirmation = decision === 'ACCEPT'
      ? 'Accept this quotation and continue to the Client Service Agreement?'
      : decision === 'REJECT'
        ? 'Reject this quotation?'
        : null;
    if (confirmation && !window.confirm(confirmation)) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitQuotationDecision(referenceId, {
        quotationId: currentQuotation.id,
        decision,
        changeRequest: decision === 'REQUEST_CHANGE' ? reason : undefined,
        contactVerification: verification,
      });
      setChangeReason('');
      setShowChange(false);
      await onRefresh();
    } catch (actionError) {
      setError(friendlyError(actionError));
    } finally {
      setSubmitting(false);
    }
  }

  async function acceptAgreement() {
    if (!currentAgreement || !window.confirm(`Accept Client Service Agreement version ${currentAgreement.version}?`)) return;
    setSubmitting(true);
    setError(null);
    try {
      await submitAgreementAcceptance(referenceId, {
        agreementId: currentAgreement.id,
        agreementVersion: currentAgreement.version,
        contactVerification: verification,
      });
      await onRefresh();
    } catch (actionError) {
      setError(friendlyError(actionError));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mt-6 border-t border-[color:var(--ch-hairline)] pt-6" data-testid="commercial-workflow">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div>
          <h3 className="font-serif text-xl font-bold text-[var(--ch-ink)]">Commercial Workflow</h3>
          <p className="mt-1 text-sm text-[var(--ch-ink-muted)]">Quotation, agreement, payment confirmation and booking status.</p>
        </div>
        <div className="text-right">
          <div className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Service Request ID</div>
          <div className="font-mono text-sm font-bold text-[var(--ch-ink)]">{referenceId}</div>
        </div>
      </div>

      <ol className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5" aria-label="Commercial lifecycle">
        {stageOrder.map((stage, index) => {
          const state = index < position ? 'Completed' : index === position ? 'Current' : 'Pending';
          const visualState = state === 'Completed' ? completedState : state === 'Current' ? attentionState : futureState;
          return <li className={`rounded-xl border p-3 ${visualState}`} data-state={state.toLowerCase()} key={stage}><span className="block text-[10px] font-semibold uppercase tracking-wider opacity-70">{state}</span><strong className="mt-1 block text-xs">{stageLabels[stage]}</strong></li>;
        })}
      </ol>

      {currentQuotation ? (
        <section className="mt-4 rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)]/50 p-5" aria-labelledby="quotation-heading">
          <div className="flex flex-wrap justify-between gap-2">
            <div><h4 className="font-serif text-lg font-bold text-[var(--ch-ink)]" id="quotation-heading">Quotation</h4><p className="text-xs text-[var(--ch-ink-muted)]">Quotation #{currentQuotation.version}</p></div>
            <span className={`h-fit rounded-full border px-3 py-1 text-xs font-semibold ${currentQuotation.status === 'ACCEPTED' ? completedState : currentQuotation.status === 'RELEASED' ? attentionState : futureState}`}>{customerStatusLabel(currentQuotation.status)}</span>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Service</dt><dd className="mt-1 text-sm text-[var(--ch-ink)]">{currentQuotation.serviceName}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Final Price</dt><dd className="mt-1 font-bold text-[var(--ch-ink)]">{money(currentQuotation.finalPrice, currentQuotation.currency)}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Scope</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-[var(--ch-ink-muted)]">{priestTerminology(currentQuotation.serviceScope)}</dd></div>
            <DetailList title="Inclusions" items={currentQuotation.inclusions} />
            <DetailList title="Exclusions" items={currentQuotation.exclusions} />
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Valid Until</dt><dd className="mt-1 text-sm text-[var(--ch-ink-muted)]">{currentQuotation.validUntil ? new Date(currentQuotation.validUntil).toLocaleString() : 'Not specified'}</dd></div>
            <div><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Applicable Charges / Taxes</dt><dd className="mt-1 text-sm text-[var(--ch-ink-muted)]">{money(currentQuotation.applicableChargesTaxes, currentQuotation.currency)}</dd></div>
            <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Payment Terms</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-[var(--ch-ink-muted)]">{customerPaymentTerms(currentQuotation.paymentTerms)}</dd></div>
            {currentQuotation.notes ? <div className="sm:col-span-2"><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Notes</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-[var(--ch-ink-muted)]">{priestTerminology(currentQuotation.notes)}</dd></div> : null}
          </dl>
          {currentQuotation.decision?.decision === 'REQUEST_CHANGE' ? <div className="mt-4 rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-accent-soft)] p-3 text-sm text-[var(--ch-ink-muted)]"><strong className="block text-[var(--ch-accent)]">Change Requested</strong><p className="mt-1 whitespace-pre-wrap">Your request: {currentQuotation.decision.changeRequest}</p></div> : currentQuotation.decision?.decision === 'ACCEPT' ? <div className={`mt-4 rounded-xl border p-3 text-sm ${completedState}`}><strong className="block">Quotation Accepted</strong><p className="mt-1">Your decision: Accept</p></div> : currentQuotation.decision?.decision === 'REJECT' ? <div className="mt-4 rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-3 text-sm text-[var(--ch-ink-muted)]"><strong className="block text-[var(--ch-ink)]">Quotation Rejected</strong><p className="mt-1">Your decision: Reject</p></div> : null}
          {currentQuotation.status === 'RELEASED' && !currentQuotation.decision ? <div className="mt-4 space-y-3">
            <p className="text-sm text-[var(--ch-ink-muted)]">Please review the quotation carefully, then choose one option below.</p>
            <div className="flex flex-wrap gap-2">
              <button className="rounded-full bg-[var(--ch-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--ch-ink)] disabled:opacity-50" disabled={submitting} onClick={() => void decide('ACCEPT')} type="button">Accept Quotation</button>
              <button className="rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ch-accent)] disabled:opacity-50" disabled={submitting} onClick={() => setShowChange((value) => !value)} type="button">Request Change</button>
              <button className="rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-2 text-sm font-semibold text-[var(--ch-ink-muted)] disabled:opacity-50" disabled={submitting} onClick={() => void decide('REJECT')} type="button">Reject Quotation</button>
            </div>
            {showChange ? <div><label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Requested change *<span className="mt-1 block text-sm font-normal normal-case tracking-normal text-[var(--ch-ink-muted)]">Briefly explain the change you need. Maximum 1,000 characters.</span><textarea className="mt-2 min-h-24 w-full rounded-xl border border-[color:var(--ch-hairline)] bg-white px-4 py-3 text-sm outline-none focus:border-[var(--ch-accent)]" maxLength={1000} required value={changeReason} onChange={(event) => setChangeReason(event.target.value)} /></label><div className="mt-1 text-right text-xs text-[var(--ch-ink-muted)]" aria-live="polite">{changeReason.length} / 1,000</div><button className="mt-2 rounded-full bg-[var(--ch-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--ch-ink)] disabled:opacity-50" disabled={submitting || !changeReason.trim() || changeReason.length > 1000} onClick={() => void decide('REQUEST_CHANGE')} type="button">Submit Change Request</button></div> : null}
          </div> : null}
        </section>
      ) : null}

      {currentAgreement ? (
        <section className="mt-4 rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg)] p-5" aria-labelledby="agreement-heading">
          <div className="flex flex-wrap items-center justify-between gap-2"><h4 className="font-serif text-lg font-bold text-[var(--ch-ink)]" id="agreement-heading">Client Service Agreement</h4><div className="flex flex-wrap items-center gap-3"><Link className="font-semibold text-[var(--ch-accent)] underline" href="/cancellation-policy">Cancellation &amp; Refund Policy</Link><span className={`h-fit rounded-full border px-3 py-1 text-xs font-semibold ${currentAgreement.acceptance ? completedState : attentionState}`}>{currentAgreement.acceptance ? 'Accepted' : 'Available for Acceptance'}</span></div></div>
          <div className="mt-5 grid gap-6 lg:grid-cols-2 lg:gap-0">
            <div className="lg:pr-6">
              <h5 className="text-sm font-bold uppercase tracking-wider text-[var(--ch-ink)]">A. Agreed Service</h5>
              <dl className="mt-4 grid gap-4">
                <div><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Agreed Scope</dt><dd className="mt-1 whitespace-pre-wrap text-sm text-[var(--ch-ink-muted)]">{priestTerminology(currentAgreement.agreedScope)}</dd></div>
                <DetailList title="Inclusions" items={currentAgreement.inclusions} />
                <div><dt className="text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Final Agreed Price</dt><dd className="mt-1 font-bold text-[var(--ch-ink)]">{money(currentAgreement.finalAgreedPrice, currentAgreement.currency)}</dd></div>
              </dl>
              {currentAgreement.acceptance ? <div className={`mt-4 rounded-xl border p-3 text-sm ${completedState}`}><strong className="block">Agreement Accepted</strong><dl className="mt-2 grid gap-1"><div><dt className="inline font-semibold">Accepted on:</dt> <dd className="inline">{new Date(currentAgreement.acceptance.acceptedAt).toLocaleString()}</dd></div></dl></div> : currentAgreement.status === 'AVAILABLE' ? <div className="mt-4"><p className="text-sm text-[var(--ch-ink-muted)]">Please review the complete agreement carefully before accepting.</p><button className="mt-2 rounded-full bg-[var(--ch-accent-soft)] px-4 py-2 text-sm font-semibold text-[var(--ch-ink)] disabled:opacity-50" disabled={submitting} onClick={() => void acceptAgreement()} type="button">Accept Client Service Agreement</button></div> : null}
            </div>
            <div className="border-t border-cyan-200 pt-5 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <h5 className="text-sm font-bold uppercase tracking-wider text-[var(--ch-ink)]">B. Payment</h5>
              <p className={`mt-3 w-fit rounded-lg border px-3 py-2 text-sm font-semibold ${workflow?.externalPayment?.status === 'PAYMENT_CONFIRMED' ? completedState : currentAgreement.acceptance ? attentionState : futureState}`}>{workflow?.externalPayment?.status === 'PAYMENT_CONFIRMED' ? 'Payment Confirmed' : workflow?.paymentDetails ? 'Payment Details Submitted — Verification Pending' : currentAgreement.acceptance ? 'Awaiting Payment Confirmation' : 'Pending'}</p>
              {currentAgreement.acceptance ? <p className="mt-3 text-sm text-[var(--ch-ink-muted)]">All payments are accepted through <strong className="text-[var(--ch-ink)]">BANK ONLY</strong>. <strong className="text-[var(--ch-ink)]">We do not accept CASH.</strong> Bank details are available under <Link className="font-semibold text-[var(--ch-accent)] underline" href="/about">About Us</Link>. For assistance, contact us by email or WhatsApp.</p> : <p className="mt-3 text-sm text-[var(--ch-ink-muted)]">Payment confirmation becomes available after the agreement is accepted.</p>}
              {workflow?.paymentDetails ? <div className={`mt-4 rounded-xl border p-4 text-sm ${workflow.externalPayment?.status === 'PAYMENT_CONFIRMED' ? completedState : attentionState}`}><strong className="block">Payment Details Submitted</strong>{workflow.externalPayment?.status !== 'PAYMENT_CONFIRMED' ? <span className="mt-1 block font-semibold">Verification Pending</span> : null}<dl className="mt-3 grid gap-3 sm:grid-cols-2"><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Amount Paid</dt><dd>{money(workflow.paymentDetails.amountPaid, workflow.paymentDetails.currency)}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Payment Date</dt><dd>{new Date(workflow.paymentDetails.paymentDate).toLocaleDateString()}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Bank Transaction / UTR / Reference No.</dt><dd className="break-words">{workflow.paymentDetails.externalReference}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Payment Mode</dt><dd>{customerStatusLabel(workflow.paymentDetails.paymentMode)}</dd></div><div><dt className="text-xs font-semibold uppercase tracking-wider opacity-70">Payer Name</dt><dd>{workflow.paymentDetails.payerName}</dd></div></dl></div> : null}
              {workflow?.stage === 'AWAITING_EXTERNAL_PAYMENT' && currentAgreement.acceptance && !workflow.paymentDetails ? <PaymentDetailsForm referenceId={referenceId} verification={verification} onRefresh={onRefresh} /> : null}
              {workflow?.externalPayment?.confirmedAt ? <p className="mt-3 text-xs text-[var(--ch-ink-muted)]">Confirmed {new Date(workflow.externalPayment.confirmedAt).toLocaleString()}</p> : null}
            </div>
          </div>
        </section>
      ) : null}

      {workflow ? <section className="mt-4 rounded-xl border border-[color:var(--ch-hairline)] bg-[var(--ch-bg-elevated)] p-5"><h4 className="font-serif text-lg font-bold text-[var(--ch-ink)]">Booking Confirmation</h4>{workflow.stage === 'BOOKING_CONFIRMED' ? <><p className={`mt-2 w-fit rounded-lg border px-3 py-2 text-sm font-semibold ${completedState}`}>Booking Confirmed</p><p className="mt-2 text-sm text-[var(--ch-ink-muted)]">Your booking is confirmed under Service Request ID <strong className="font-mono">{referenceId}</strong>.</p>{workflow.bookingConfirmedAt ? <p className="mt-2 text-xs text-[var(--ch-ink-muted)]">Confirmed {new Date(workflow.bookingConfirmedAt).toLocaleString()}</p> : null}</> : <><p className={`mt-2 w-fit rounded-lg border px-3 py-2 text-sm font-semibold ${futureState}`}>Pending</p><p className="mt-2 text-sm text-[var(--ch-ink-muted)]">Booking will be confirmed after payment verification by Holy Yatra</p></>}</section> : null}
      {error ? <p className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-800" role="alert">{error}</p> : null}
    </div>
  );
}
