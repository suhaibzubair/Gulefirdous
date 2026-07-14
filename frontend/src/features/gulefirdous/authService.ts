import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  RecaptchaVerifier,
  signInWithPopup,
  signInWithPhoneNumber,
  signOut as firebaseSignOut,
  type Auth,
  type ConfirmationResult,
  type User,
} from "firebase/auth";
import {
  ADMIN_EMAIL,
  buildAuthenticatedUser,
  isAdminEmail,
  looksLikeEmail,
  looksLikePhone,
  normalizeEmail,
  toE164Phone,
  toUserSession,
  type AuthenticatedUser,
} from "./authConfig";
import type { UserSession } from "./gulefirdousNav";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

const authMode = process.env.REACT_APP_AUTH_MODE || "auto";
let firebaseApp: FirebaseApp | null = null;
let auth: Auth | null = null;
let recaptchaVerifier: RecaptchaVerifier | null = null;
let phoneConfirmation: ConfirmationResult | null = null;
let mockPhonePending: string | null = null;

export function isFirebaseConfigured() {
  return Boolean(
    firebaseConfig.apiKey &&
      firebaseConfig.authDomain &&
      firebaseConfig.projectId &&
      firebaseConfig.appId
  );
}

export function usesMockAuth() {
  if (authMode === "mock") {
    return true;
  }

  if (authMode === "firebase") {
    return false;
  }

  return !isFirebaseConfigured();
}

function getFirebaseAuth() {
  if (!isFirebaseConfigured()) {
    throw new Error("Firebase is not configured. Add Firebase keys to frontend/.env");
  }

  if (!firebaseApp) {
    firebaseApp = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  }

  if (!auth) {
    auth = getAuth(firebaseApp);
  }

  return auth;
}

function mapFirebaseUser(user: User, authMethod: "google" | "phone"): AuthenticatedUser {
  const email = user.email ? normalizeEmail(user.email) : undefined;
  const phone = user.phoneNumber || undefined;

  if (authMethod === "google" && email && !isAdminEmail(email)) {
    return buildAuthenticatedUser({
      loginId: email,
      authMethod,
      email,
      phone,
      displayName: user.displayName,
    });
  }

  if (authMethod === "google" && email && isAdminEmail(email)) {
    return buildAuthenticatedUser({
      loginId: email,
      authMethod,
      email,
      displayName: user.displayName || "Suhaib",
    });
  }

  return buildAuthenticatedUser({
    loginId: phone || email || user.uid,
    authMethod,
    email,
    phone,
    displayName: user.displayName,
  });
}

async function mockGoogleSignIn(expectedLoginId: string): Promise<AuthenticatedUser> {
  const trimmed = expectedLoginId.trim();

  if (!looksLikeEmail(trimmed)) {
    throw new Error("Enter your administrator email before using Google sign-in.");
  }

  if (!isAdminEmail(trimmed)) {
    return buildAuthenticatedUser({
      loginId: trimmed,
      authMethod: "google",
      email: trimmed,
      displayName: trimmed.split("@")[0],
    });
  }

  return buildAuthenticatedUser({
    loginId: ADMIN_EMAIL,
    authMethod: "google",
    email: ADMIN_EMAIL,
    displayName: "Suhaib",
  });
}

async function mockSendPhoneOtp(phoneNumber: string) {
  if (!looksLikePhone(phoneNumber)) {
    throw new Error("Enter a valid mobile number before requesting OTP.");
  }

  mockPhonePending = toE164Phone(phoneNumber);
  phoneConfirmation = { verificationId: "mock-verification" } as ConfirmationResult;

  return phoneConfirmation;
}

async function mockVerifyPhoneOtp(phoneNumber: string, otpCode: string): Promise<AuthenticatedUser> {
  if (!mockPhonePending) {
    throw new Error("Request an OTP before verifying your code.");
  }

  if (!/^\d{6}$/.test(otpCode.trim())) {
    throw new Error("Enter the 6-digit OTP code.");
  }

  const normalizedPhone = toE164Phone(phoneNumber);
  mockPhonePending = null;
  phoneConfirmation = null;

  return buildAuthenticatedUser({
    loginId: normalizedPhone,
    authMethod: "phone",
    phone: normalizedPhone,
    displayName: `Client ${normalizedPhone.slice(-4)}`,
  });
}

export async function signInWithGoogle(expectedLoginId: string): Promise<AuthenticatedUser> {
  const trimmed = expectedLoginId.trim();

  if (!trimmed) {
    throw new Error("Enter your email or mobile number first.");
  }

  if (!looksLikeEmail(trimmed)) {
    throw new Error("Google sign-in requires an email address in the box above.");
  }

  if (usesMockAuth()) {
    return mockGoogleSignIn(trimmed);
  }

  const authClient = getFirebaseAuth();
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({ prompt: "select_account" });

  const result = await signInWithPopup(authClient, provider);
  const email = result.user.email ? normalizeEmail(result.user.email) : "";

  if (!email) {
    throw new Error("Google did not return an email address for this account.");
  }

  if (isAdminEmail(trimmed) && !isAdminEmail(email)) {
    await firebaseSignOut(authClient);
    throw new Error("This Google account is not authorized for administrator access.");
  }

  if (!isAdminEmail(trimmed) && isAdminEmail(email)) {
    return buildAuthenticatedUser({
      loginId: email,
      authMethod: "google",
      email,
      displayName: result.user.displayName || "Suhaib",
    });
  }

  return mapFirebaseUser(result.user, "google");
}

export function setupRecaptcha(containerId: string) {
  if (usesMockAuth()) {
    return null;
  }

  const authClient = getFirebaseAuth();

  if (recaptchaVerifier) {
    recaptchaVerifier.clear();
    recaptchaVerifier = null;
  }

  recaptchaVerifier = new RecaptchaVerifier(authClient, containerId, {
    size: "invisible",
  });

  return recaptchaVerifier;
}

export async function sendPhoneOtp(phoneNumber: string) {
  const trimmed = phoneNumber.trim();

  if (!looksLikePhone(trimmed)) {
    throw new Error("Enter a valid mobile number.");
  }

  if (usesMockAuth()) {
    return mockSendPhoneOtp(trimmed);
  }

  const authClient = getFirebaseAuth();

  if (!recaptchaVerifier) {
    throw new Error("Phone verification is still loading. Please try again.");
  }

  phoneConfirmation = await signInWithPhoneNumber(
    authClient,
    toE164Phone(trimmed),
    recaptchaVerifier
  );

  return phoneConfirmation;
}

export async function verifyPhoneOtp(
  phoneNumber: string,
  otpCode: string
): Promise<AuthenticatedUser> {
  const trimmedPhone = phoneNumber.trim();
  const trimmedOtp = otpCode.trim();

  if (usesMockAuth()) {
    return mockVerifyPhoneOtp(trimmedPhone, trimmedOtp);
  }

  if (!phoneConfirmation) {
    throw new Error("Request an OTP before verifying your code.");
  }

  const result = await phoneConfirmation.confirm(trimmedOtp);
  phoneConfirmation = null;

  return mapFirebaseUser(result.user, "phone");
}

export async function signOutUser() {
  phoneConfirmation = null;
  mockPhonePending = null;

  if (usesMockAuth() || !auth) {
    return;
  }

  await firebaseSignOut(auth);
}

export function subscribeToAuthSession(onSession: (session: UserSession | null) => void) {
  if (usesMockAuth()) {
    return () => undefined;
  }

  const authClient = getFirebaseAuth();

  return onAuthStateChanged(authClient, (user) => {
    if (!user) {
      onSession(null);
      return;
    }

    const authMethod = user.phoneNumber ? "phone" : "google";
    onSession(toUserSession(mapFirebaseUser(user, authMethod)));
  });
}
