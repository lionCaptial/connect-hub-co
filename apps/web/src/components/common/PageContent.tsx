"use client";

import { usePathname } from "next/navigation";
import { BusinessDashboard } from "./BusinessDashboard";
import { InternalSidebar } from "@/components/auth/InternalSidebar";
import { NeedHelpAITrigger } from "@/features/ai/components/NeedHelpAITrigger";
import { shouldShowPublicChrome } from "@/config/publicShellVisibility";

function isAuthChromeException(path: string): boolean {
  return (
    path === "/login" ||
    path === "/register" ||
    path === "/verify-email" ||
    path === "/forgot-password" ||
    path === "/reset-password"
  );
}

export function PageContent({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const authException = isAuthChromeException(path);

  // Public header "Our Services" is the sole service nav wherever public chrome shows.
  if (shouldShowPublicChrome(path) || authException) {
    return (
      <>
        {children}
        {authException || path === "/" ? <NeedHelpAITrigger /> : null}
      </>
    );
  }

  return (
    <InternalSidebar>
      {path === "/dashboard" ? <BusinessDashboard /> : children}
      <NeedHelpAITrigger />
    </InternalSidebar>
  );
}
