'use client';

import { FormEvent, useState } from 'react';
import Link from 'next/link';
import { submitGeneralInquiry } from '@/services/inquiry.api';
import { ROUTES } from '@/config/navigation';

export function TravelCompanionRegisterForm() {
  const [submitting, setSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const form = event.currentTarget;
    const data = new FormData(form);

    try {
      const result = await submitGeneralInquiry({
        fullName: String(data.get('fullName') || '').trim(),
        phone: String(data.get('phone') || '').trim(),
        email: String(data.get('email') || '').trim(),
        country: String(data.get('country') || '').trim(),
        inquiryCategory: 'travel-companion-registration',
        relatedService: 'travel-assistance',
        preferredContactMethod: String(data.get('contactMethod') || ''),
        message: [
          'Travel Companion Registration application.',
          `City/base: ${String(data.get('baseCity') || '').trim()}`,
          `Experience: ${String(data.get('experience') || '').trim()}`,
          `Languages: ${String(data.get('languages') || '').trim()}`,
          `Availability: ${String(data.get('availability') || '').trim()}`,
          String(data.get('message') || '').trim(),
        ]
          .filter(Boolean)
          .join('\n'),
      });

      if (!result.success || !result.inquiryId) {
        setError(result.message || 'Unable to submit the registration interest form.');
        return;
      }

      setReferenceId(result.inquiryId);
      form.reset();
    } catch (reason) {
      setError(reason instanceof Error ? reason.message : 'Unable to submit the registration interest form.');
    } finally {
      setSubmitting(false);
    }
  }

  if (referenceId) {
    return (
      <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-8 text-center" role="status">
        <h2 className="font-serif text-2xl font-bold text-stone-900">Application received</h2>
        <p className="mt-3 text-sm text-stone-700">
          Keep this Reference ID to track your Travel Companion Registration interest.
        </p>
        <div className="mx-auto mt-4 inline-block rounded-xl border border-emerald-200 bg-white p-4">
          <span className="block text-xs font-semibold uppercase tracking-widest text-stone-500">
            Registration Reference ID
          </span>
          <strong className="mt-1 block font-mono text-2xl tracking-wider text-emerald-800">
            {referenceId}
          </strong>
        </div>
        <Link
          className="mt-5 inline-block rounded-xl bg-sky-800 px-5 py-2.5 text-sm font-semibold text-white"
          href={ROUTES.TRACK_TRAVEL_COMPANION_REGISTRATION}
        >
          Track Travel Companion Registration
        </Link>
      </div>
    );
  }

  const field =
    'mt-1 w-full rounded-xl border border-stone-300 px-4 py-2.5 text-sm outline-none focus:border-sky-700';

  return (
    <form className="grid gap-4" onSubmit={handleSubmit}>
      {error ? (
        <p className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-800" role="alert">
          {error}
        </p>
      ) : null}

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          Full Name *
          <input className={field} name="fullName" required placeholder="Your full name" />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          Country *
          <input className={field} name="country" required placeholder="India, Nepal, etc." />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          Mobile / WhatsApp *
          <input className={field} name="phone" type="tel" required placeholder="+91 9876543210" />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          Email *
          <input className={field} name="email" type="email" required placeholder="name@example.com" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          Base city / region *
          <input className={field} name="baseCity" required placeholder="Gaya, Patna, Kathmandu…" />
        </label>
        <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
          Languages *
          <input className={field} name="languages" required placeholder="Hindi, English…" />
        </label>
      </div>

      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
        Relevant experience *
        <textarea
          className={field}
          name="experience"
          rows={3}
          required
          maxLength={600}
          placeholder="Pilgrim support, local coordination, travel guiding…"
        />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
        Availability *
        <input className={field} name="availability" required placeholder="Weekends, festival seasons, full-time…" />
      </label>

      <label className="block text-xs font-semibold uppercase tracking-wider text-stone-700">
        Additional notes
        <textarea className={field} name="message" rows={3} maxLength={800} placeholder="Anything else we should know…" />
      </label>

      <fieldset>
        <legend className="text-xs font-semibold uppercase tracking-wider text-stone-700">
          Preferred contact method *
        </legend>
        <div className="mt-2 flex flex-wrap gap-4 text-sm">
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="contactMethod" value="whatsapp" defaultChecked /> WhatsApp
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="contactMethod" value="email" /> Email
          </label>
          <label className="flex cursor-pointer items-center gap-2">
            <input type="radio" name="contactMethod" value="phone" /> Phone Call
          </label>
        </div>
      </fieldset>

      <div className="mt-2 flex items-start gap-2">
        <input type="checkbox" required id="companionConsent" className="mt-1 cursor-pointer" />
        <label htmlFor="companionConsent" className="cursor-pointer text-xs text-stone-600">
          I agree to be contacted about Travel Companion opportunities in accordance with the Privacy Policy.
        </label>
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 rounded-xl bg-sky-800 px-6 py-3 font-semibold text-white disabled:opacity-60"
      >
        {submitting ? 'Submitting…' : 'Submit Travel Companion Registration'}
      </button>
    </form>
  );
}
