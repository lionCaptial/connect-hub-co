export type UserRole = "FOUNDER" | "ADMIN" | "CUSTOMER" | "RELIGIOUS_PARTNER";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  mobile?: string | null;
}

export interface LoginInput {
  email: string;
  password: string;
}

export interface RegisterInput {
  fullName: string;
  email: string;
  password: string;
  mobile?: string;
}
