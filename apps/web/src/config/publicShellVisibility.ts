export function shouldShowPublicChrome(pathname: string): boolean {
  if (pathname === '/account' || pathname.startsWith('/account/')) return true;

  return (
    !pathname.startsWith('/admin') &&
    !pathname.startsWith('/dashboard') &&
    pathname !== '/login' &&
    pathname !== '/register' &&
    !pathname.includes('/requests')
  );
}
