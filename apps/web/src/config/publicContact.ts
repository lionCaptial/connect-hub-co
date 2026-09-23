export const PUBLIC_CONTACT = {
  email: 'support@holyyatra.com',
  whatsappDisplay: '+91-9334455665',
  whatsappE164Digits: '919334455665',
} as const;

export function supportMailtoHref(): string {
  return `mailto:${PUBLIC_CONTACT.email}`;
}

export function supportWhatsAppHref(prefill?: string): string {
  const base = `https://wa.me/${PUBLIC_CONTACT.whatsappE164Digits}`;
  if (!prefill) return base;
  return `${base}?text=${encodeURIComponent(prefill)}`;
}
