'use client';

import { FormEvent, useState } from 'react';
import { submitGeneralInquiry } from '@/services/inquiry.api';

export function GeneralInquiryForm() {
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    const relatedService = String(data.get('relatedService') || 'none');
    try {
      const result = await submitGeneralInquiry({
        fullName: String(data.get('fullName') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        email: String(data.get('email') || '').trim(),
        country: String(data.get('country') || '').trim(),
        inquiryCategory: String(data.get('inquiryCategory') || ''),
        relatedService: relatedService === 'none' ? undefined : relatedService,
        preferredContactMethod: String(data.get('contactMethod') || ''),
        message: String(data.get('message') || '').trim(),
      });

      if (!result.success || !result.inquiryId) {
        setError(result.message || 'Unable to submit the inquiry.');
        return;
      }

      setReferenceId(result.inquiryId);
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to submit the inquiry.');
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceId) {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status">
        <h2 className="font-serif text-2xl font-bold text-[var(--ch-ink)]">Inquiry submitted</h2>
        <p className="mt-3 text-sm text-[var(--ch-ink-muted)]">
          Your inquiry has been recorded. Keep this Inquiry Reference ID for tracking.
        </p>
        <div className="mx-auto mt-4 inline-block rounded-xl border border-emerald-200 bg-white p-4">
          <span className="block text-xs font-semibold uppercase tracking-widest text-[var(--ch-ink-muted)]">
            Inquiry Reference ID
          </span>
          <strong className="mt-1 block font-mono text-2xl tracking-wider text-emerald-800">
            {referenceId}
          </strong>
        </div>
      </div>
    );
  }

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Full Name *</label>
          <input name="fullName" type="text" required placeholder="Your full name" className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Country *</label>
          <input name="country" type="text" required placeholder="India, USA, UK, etc." className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)]" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Mobile / WhatsApp Number *</label>
          <input name="phone" type="tel" required placeholder="+91 9876543210" className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)]" />
        </div>
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Email Address *</label>
          <input name="email" type="email" required placeholder="name@example.com" className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)]" />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Inquiry Category *</label>
          <select name="inquiryCategory" required defaultValue="" className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)] bg-white">
            <option value="" disabled>Select Category...</option>
            <option value="general">General Information</option>
            <option value="service-question">Service Question</option>
            <option value="travel-support">Pilgrim Travel Support</option>
            <option value="partner-inquiry">Verified Priest Network Inquiry</option>
            <option value="other">Other Inquiry</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Related Service (Optional)</label>
          <select name="relatedService" defaultValue="none" className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)] bg-white">
            <option value="none">None / Not Applicable</option>
            <option value="pitru-moksha-gaya">PitruMoksha Gaya</option>
            <option value="ritual-services">Ritual Services</option>
            <option value="travel-assistance">Travel Assistance</option>
            <option value="vahi-records">Vahi Records</option>
            <option value="religious-partners">Priest Registration</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Message / Question *</label>
        <textarea name="message" rows={4} required placeholder="Write your question or request in detail..." className="mt-1 w-full rounded-xl border border-[color:var(--ch-hairline)] px-4 py-2.5 text-sm outline-none focus:border-[var(--ch-accent)]" maxLength={1000} />
      </div>

      <div>
        <label className="block text-xs font-semibold uppercase tracking-wider text-[var(--ch-ink-muted)]">Preferred Contact Method *</label>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contactMethod" value="whatsapp" defaultChecked /> WhatsApp</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contactMethod" value="email" /> Email</label>
          <label className="flex items-center gap-2 cursor-pointer"><input type="radio" name="contactMethod" value="phone" /> Phone Call</label>
        </div>
      </div>

      <div className="mt-2 flex items-start gap-2">
        <input type="checkbox" required id="inquiryConsent" className="mt-1 cursor-pointer" />
        <label htmlFor="inquiryConsent" className="text-xs text-[var(--ch-ink-muted)] cursor-pointer">
          I agree to allow Holy Yatra to contact me regarding this inquiry in accordance with the Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-full bg-[var(--ch-accent-soft)] px-6 py-3 font-semibold text-[var(--ch-ink)] disabled:opacity-60"
      >
        {submitting ? 'Submitting Inquiry...' : 'Submit Inquiry'}
      </button>
    </form>
  );
}
