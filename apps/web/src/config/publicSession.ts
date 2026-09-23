export const PUBLIC_SESSION = {
  idleMs: 5 * 60 * 1000,
  absoluteMs: 30 * 60 * 1000,
  storageKeyAbsolute: 'ch.public.session.absoluteStartedAt',
  storageKeyLastActivity: 'ch.public.session.lastActivityAt',
} as const;

export const LOGIN_QUERY = {
  sessionEnded: 'ended',
  modeCreate: 'create',
} as const;

export function loginSessionEndedHref(): string {
  return `/login?session=${LOGIN_QUERY.sessionEnded}`;
}

export function loginCreateModeHref(): string {
  return `/login?mode=${LOGIN_QUERY.modeCreate}`;
}
