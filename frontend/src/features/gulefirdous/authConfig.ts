import type { AuthMethod, UserRole, UserSession } from "./gulefirdousNav";

export const ADMIN_EMAIL = "suhaibzubair@gmail.com";

export interface AuthenticatedUser {
  loginId: string;
  role: UserRole;
  displayName: string;
  authMethod: AuthMethod;
  email?: string;
  phone?: string;
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function isAdminEmail(email: string) {
  return normalizeEmail(email) === ADMIN_EMAIL;
}

export function looksLikeEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export function looksLikePhone(value: string) {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

export function toE164Phone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (digits.startsWith("92") && digits.length >= 12) {
    return `+${digits}`;
  }

  if (digits.startsWith("0") && digits.length >= 10) {
    return `+92${digits.slice(1)}`;
  }

  if (digits.length === 10) {
    return `+92${digits}`;
  }

  return `+${digits}`;
}

export function resolveRoleFromEmail(email?: string | null): UserRole {
  if (!email) {
    return "client";
  }

  return isAdminEmail(email) ? "admin" : "client";
}

export function resolveRoleFromLoginId(loginId: string): UserRole {
  const trimmed = loginId.trim();

  if (looksLikeEmail(trimmed)) {
    return resolveRoleFromEmail(trimmed);
  }

  return "client";
}

export function buildAuthenticatedUser(input: {
  loginId: string;
  authMethod: AuthMethod;
  email?: string | null;
  phone?: string | null;
  displayName?: string | null;
}): AuthenticatedUser {
  const loginId = input.loginId.trim();
  const email = input.email ? normalizeEmail(input.email) : undefined;
  const phone = input.phone?.trim() || undefined;
  const role = email ? resolveRoleFromEmail(email) : "client";
  const displayName =
    input.displayName?.trim() ||
    (email ? email.split("@")[0] : phone ? `Client ${phone.slice(-4)}` : "Gulefirdous Client");

  return {
    loginId: email || phone || loginId,
    role,
    displayName,
    authMethod: input.authMethod,
    email,
    phone,
  };
}

export function toUserSession(user: AuthenticatedUser): UserSession {
  return {
    loginId: user.loginId,
    role: user.role,
    displayName: user.displayName,
    authMethod: user.authMethod,
    email: user.email,
    phone: user.phone,
  };
}

export function getLoginRoleHint(loginId: string) {
  const trimmed = loginId.trim();

  if (!trimmed) {
    return null;
  }

  if (looksLikeEmail(trimmed)) {
    return {
      tone: "client" as const,
      message: "Continue with Google or use your mobile number with OTP.",
    };
  }

  if (looksLikePhone(trimmed)) {
    return {
      tone: "client" as const,
      message: "Mobile number detected. We will send an OTP to verify you.",
    };
  }

  return {
    tone: "client" as const,
    message: "Enter a valid email or mobile number to continue.",
  };
}
