import type { Metadata } from "next";
import { ReligiousPartnerApplicationForm } from "@/components/partner/ReligiousPartnerApplicationForm";
import { PublicHeroShell } from "@/features/public-shell";

export const metadata: Metadata = {
  title: "Priest Application | Holy Yatra",
  description: "Apply to register as a Verified Priest with Holy Yatra",
};

export default function ReligiousPartnerRegistrationPage() {
  return (
    <PublicHeroShell><main className="min-h-[70vh] bg-[var(--ch-bg)] px-6 py-16 text-[var(--ch-ink)]">
      <div className="mx-auto max-w-4xl">
        <ReligiousPartnerApplicationForm />
      </div>
    </main></PublicHeroShell>
  );
}
