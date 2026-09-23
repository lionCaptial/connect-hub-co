import type { BookingStatus } from "@/types/booking";

export interface PitruMokshaInput {
  name: string;
  email: string;
  phone: string;
  country: string;
  city: string;
  isNRI: boolean;
  packageCode: "ESSENTIAL" | "COMPLETE" | "FAMILY";
  preferredDate: string;
  preferredDateEnd: string;
  pilgrimCount: number;
  pilgrimNames: string;
  ancestorNames: string;
  gotra: string;
  relationToAncestors: string;
  contactPreference: "PHONE" | "WHATSAPP" | "EMAIL";
  travelSupport: boolean;
  accommodationSupport: boolean;
  arrivalDetails: string;
  specialRequirements: string;
}

export interface PitruMokshaRequest {
  id: string;
  customerName: string;
  phone: string;
  email?: string | null;
  city?: string | null;
  country: string;
  isNRI: boolean;
  contactPreference: "PHONE" | "WHATSAPP" | "EMAIL";
  serviceName: string;
  scheduledAt: string;
  pilgrimCount: number;
  ancestorNames: string;
  gotra?: string | null;
  travelSupport: boolean;
  accommodationSupport: boolean;
  arrivalDetails?: string | null;
  specialRequirements?: string | null;
  religiousPartnerId?: string | null;
  status: BookingStatus;
  createdAt: string;
}
