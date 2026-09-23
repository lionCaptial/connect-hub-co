'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { ROUTES } from '@/config/navigation';
import { PublicAccountShell } from '@/features/public-account/PublicAccountShell';

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && !user) router.replace(ROUTES.LOGIN);
  }, [loading, router, user]);

  if (loading) {
    return <main className="grid min-h-[45vh] place-items-center">Loading your account...</main>;
  }

  if (!user) {
    return <main className="grid min-h-[45vh] place-items-center">Redirecting to sign in...</main>;
  }

  return <PublicAccountShell>{children}</PublicAccountShell>;
}
