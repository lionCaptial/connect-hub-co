'use client';

import { Suspense } from 'react';
import { PublicLoginScreen } from '@/features/public-login/PublicLoginScreen';

export default function LoginPage() {
  return (
    <Suspense fallback={<main className="grid min-h-screen place-items-center">Loading…</main>}>
      <PublicLoginScreen />
    </Suspense>
  );
}
