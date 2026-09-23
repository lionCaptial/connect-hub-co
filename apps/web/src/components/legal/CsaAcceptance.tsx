'use client';

import { useState } from 'react';

const AGREEMENT_VERSION = 'draft';

export function CsaAcceptance() {
  const [checked, setChecked] = useState(false);
  const [acceptedOn, setAcceptedOn] = useState<string | null>(null);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => setChecked(e.target.checked)}
          disabled={Boolean(acceptedOn)}
        />{' '}
        I have reviewed and accept this Client Service Agreement, the agreed service scope and
        price, and the applicable Booking Terms &amp; Conditions and Cancellation &amp; Refund
        Policy.
      </label>
      <button
        type="button"
        disabled={!checked || Boolean(acceptedOn)}
        onClick={() => setAcceptedOn(new Date().toLocaleString())}
      >
        Accept Agreement
      </button>
      <p>Accepted On: {acceptedOn ?? '—'}</p>
      <p>Agreement Version: {AGREEMENT_VERSION}</p>
    </div>
  );
}
