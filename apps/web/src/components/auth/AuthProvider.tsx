"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getCurrentUser, login as loginRequest, logout as logoutRequest, register as registerRequest } from "@/services/auth.api";
import { PUBLIC_SESSION, loginSessionEndedHref } from "@/config/publicSession";
import { AuthUser, LoginInput, RegisterInput } from "@/types/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  login: (input: LoginInput) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
  forgotPassword: (...args: unknown[]) => Promise<{ message: string }>;
  resetPassword: (...args: unknown[]) => Promise<{ message: string }>;
  verifyEmail: (...args: unknown[]) => Promise<{ message: string }>;
  hasRole: (role: AuthUser["role"] | AuthUser["role"][]) => boolean;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const isSessionExpiringRef = useRef(false);

  const isInternalERPRoute =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/admin" ||
    pathname.startsWith("/admin/") ||
    pathname === "/customers" ||
    pathname.startsWith("/customers/") ||
    pathname === "/partners" ||
    pathname.startsWith("/partners/") ||
    pathname === "/bookings" ||
    pathname.startsWith("/bookings/") ||
    pathname === "/reports" ||
    pathname.startsWith("/reports/") ||
    pathname === "/pitru-moksha/requests" ||
    pathname === "/travel-assistance/requests";

  const isPublic = !isInternalERPRoute;

  useEffect(() => {
    let active = true;
    void getCurrentUser()
      .then(({ user: currentUser }) => { if (active) setUser(currentUser); })
      .catch(() => { if (active) setUser(null); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    if (!loading && !user && !isPublic) router.replace("/login");
    if (!loading && user && (pathname === "/login" || pathname === "/register")) router.replace("/");
  }, [isPublic, loading, pathname, router, user]);

  const clearPublicSessionTimestamps = useCallback(() => {
    sessionStorage.removeItem(PUBLIC_SESSION.storageKeyAbsolute);
    sessionStorage.removeItem(PUBLIC_SESSION.storageKeyLastActivity);
  }, []);

  const setPublicSessionTimestamps = useCallback((at: number) => {
    sessionStorage.setItem(PUBLIC_SESSION.storageKeyAbsolute, String(at));
    sessionStorage.setItem(PUBLIC_SESSION.storageKeyLastActivity, String(at));
  }, []);

  const expirePublicSession = useCallback(async () => {
    if (isSessionExpiringRef.current) return;
    isSessionExpiringRef.current = true;
    try {
      await logoutRequest();
    } finally {
      clearPublicSessionTimestamps();
      setUser(null);
      if (!pathname.startsWith("/login")) router.replace(loginSessionEndedHref());
      isSessionExpiringRef.current = false;
    }
  }, [clearPublicSessionTimestamps, pathname, router]);

  useEffect(() => {
    if (!user) return;

    const now = Date.now();
    const absoluteStartedAt = sessionStorage.getItem(PUBLIC_SESSION.storageKeyAbsolute);
    if (!absoluteStartedAt) sessionStorage.setItem(PUBLIC_SESSION.storageKeyAbsolute, String(now));
    sessionStorage.setItem(PUBLIC_SESSION.storageKeyLastActivity, String(now));

    const bumpActivity = () => {
      sessionStorage.setItem(PUBLIC_SESSION.storageKeyLastActivity, String(Date.now()));
    };
    const activityEvents: ReadonlyArray<keyof WindowEventMap> = ["pointerdown", "keydown", "scroll", "touchstart"];
    const activityListenerOptions: AddEventListenerOptions = { passive: true };
    activityEvents.forEach((eventName) => window.addEventListener(eventName, bumpActivity, activityListenerOptions));

    const timerId = window.setInterval(() => {
      const currentTime = Date.now();
      const absoluteTimestamp = Number(sessionStorage.getItem(PUBLIC_SESSION.storageKeyAbsolute) || 0);
      const lastActivityTimestamp = Number(sessionStorage.getItem(PUBLIC_SESSION.storageKeyLastActivity) || 0);
      const idleExpired = currentTime - lastActivityTimestamp >= PUBLIC_SESSION.idleMs;
      const absoluteExpired = currentTime - absoluteTimestamp >= PUBLIC_SESSION.absoluteMs;
      if (idleExpired || absoluteExpired) void expirePublicSession();
    }, 15_000);

    return () => {
      activityEvents.forEach((eventName) => window.removeEventListener(eventName, bumpActivity));
      window.clearInterval(timerId);
    };
  }, [expirePublicSession, user]);

  const login = useCallback(async (input: LoginInput) => {
    const response = await loginRequest(input);
    setUser(response.user);
    setPublicSessionTimestamps(Date.now());
    router.replace("/");
  }, [router, setPublicSessionTimestamps]);

  const logout = useCallback(async () => {
    try { await logoutRequest(); }
    finally {
      clearPublicSessionTimestamps();
      setUser(null);
      router.replace("/");
    }
  }, [clearPublicSessionTimestamps, router]);

  const register = useCallback(async (input: RegisterInput) => {
    await registerRequest(input);
  }, []);

  const hasRole = useCallback((role: AuthUser["role"] | AuthUser["role"][]) => {
    if (Array.isArray(role)) return user ? role.includes(user.role) : false;
    return user?.role === role;
  }, [user]);

  const unsupportedAuthFlow = useCallback(async (): Promise<never> => {
    throw new Error('This authentication flow is unavailable during the current pre-trial phase.');
  }, []);

  const value = useMemo(() => ({
    user,
    loading,
    login,
    logout,
    hasRole,
    register,
    forgotPassword: unsupportedAuthFlow,
    resetPassword: unsupportedAuthFlow,
    verifyEmail: unsupportedAuthFlow,
  }), [hasRole, loading, login, logout, register, unsupportedAuthFlow, user]);

  const canRender = isPublic || (!loading && user);

  return <AuthContext.Provider value={value}>{canRender ? children : <main className="grid min-h-screen place-items-center">Checking your session...</main>}</AuthContext.Provider>;
}

export function useAuth() {
  const value = useContext(AuthContext);
  if (!value) throw new Error("useAuth must be used inside AuthProvider.");
  return value;
}
