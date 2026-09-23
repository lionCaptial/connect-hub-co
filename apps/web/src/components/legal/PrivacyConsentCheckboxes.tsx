'use client';

import { useState } from 'react';

export function PrivacyConsentCheckboxes() {
  const [general, setGeneral] = useState(false);
  const [guardian, setGuardian] = useState(false);

  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={general}
          onChange={(e) => setGeneral(e.target.checked)}
        />{' '}
        I consent to Holy Yatra processing the personal information provided by me for the
        stated purpose and acknowledge the Privacy Policy.
      </label>
      <label>
        <input
          type="checkbox"
          checked={guardian}
          onChange={(e) => setGuardian(e.target.checked)}
        />{' '}
        I confirm that I am the parent/lawful guardian and consent to the processing of the
        child&apos;s personal information for the stated purpose.
      </label>
    </div>
  );
}
