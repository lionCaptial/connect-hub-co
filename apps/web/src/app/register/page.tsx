'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { loginCreateModeHref } from '@/config/publicSession';

export default function RegisterPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace(loginCreateModeHref());
  }, [router]);
  return (
    <main className="grid min-h-screen place-items-center p-6">
      <p>Redirecting to Create Account…</p>
    </main>
  );
}
