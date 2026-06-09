import React, { useEffect, useMemo, useState } from "react";
import { getLoginRoleHint, looksLikeEmail, looksLikePhone, toUserSession } from "./authConfig";
import { GulefirdousLogo } from "./GulefirdousLogo";
import {
  sendPhoneOtp,
  setupRecaptcha,
  signInWithGoogle,
  usesMockAuth,
  verifyPhoneOtp,
} from "./authService";
import type { UserSession } from "./gulefirdousNav";

interface GulefirdousLoginProps {
  onSignIn: (session: UserSession) => void;
}

function GulefirdousLogin({ onSignIn }: GulefirdousLoginProps) {
  const [loginId, setLoginId] = useState("");
  const [otpCode, setOtpCode] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [busyAction, setBusyAction] = useState<"google" | "otp-send" | "otp-verify" | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const roleHint = useMemo(() => getLoginRoleHint(loginId), [loginId]);
  const showPhoneOtp = looksLikePhone(loginId);
  const showGoogle = looksLikeEmail(loginId);
  const isMockAuth = usesMockAuth();

  useEffect(() => {
    if (isMockAuth || !showPhoneOtp) {
      return;
    }

    setupRecaptcha("gf-recaptcha-container");
  }, [isMockAuth, showPhoneOtp]);

  const handleGoogleSignIn = async () => {
    setBusyAction("google");
    setError("");
    setNotice("");

    try {
      const user = await signInWithGoogle(loginId);
      onSignIn(toUserSession(user));
    } catch (signInError) {
      setError(signInError instanceof Error ? signInError.message : "Google sign-in failed.");
    } finally {
      setBusyAction(null);
    }
  };

  const handleSendOtp = async () => {
    setBusyAction("otp-send");
    setError("");
    setNotice("");

    try {
      await sendPhoneOtp(loginId);
      setOtpSent(true);
      setNotice(
        isMockAuth
          ? "Demo OTP sent. Enter any 6-digit code to continue."
          : "OTP sent to your mobile number."
      );
    } catch (otpError) {
      setError(otpError instanceof Error ? otpError.message : "Could not send OTP.");
    } finally {
      setBusyAction(null);
    }
  };

  const handleVerifyOtp = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setBusyAction("otp-verify");
    setError("");
    setNotice("");

    try {
      const user = await verifyPhoneOtp(loginId, otpCode);
      onSignIn(toUserSession(user));
    } catch (verifyError) {
      setError(verifyError instanceof Error ? verifyError.message : "OTP verification failed.");
    } finally {
      setBusyAction(null);
    }
  };

  return (
    <div className="gf-login-page">
      <div className="gf-login-card">
        <div className="gf-login-brand">
          <GulefirdousLogo variant="login" />
          <p className="gf-login-tagline">
            Sign in with Google or mobile OTP to access perfumes, orders, and social ads.
          </p>
        </div>

        <div className="gf-login-form">
          <label>
            Email or mobile number
            <input
              value={loginId}
              onChange={(event) => {
                setError("");
                setNotice("");
                setOtpSent(false);
                setOtpCode("");
                setLoginId(event.target.value);
              }}
              placeholder="Email or mobile number"
              autoComplete="username"
              aria-label="Email or mobile number"
            />
          </label>

          {roleHint ? (
            <p className={`gf-login-role-hint gf-login-role-hint-${roleHint.tone}`} role="status">
              {roleHint.message}
            </p>
          ) : null}

          {showGoogle ? (
            <button
              type="button"
              className="gf-google-button"
              onClick={() => {
                void handleGoogleSignIn();
              }}
              disabled={busyAction !== null}
            >
              {busyAction === "google" ? "Signing in with Google..." : "Continue with Google"}
            </button>
          ) : null}

          {showPhoneOtp ? (
            <div className="gf-otp-panel">
              <button
                type="button"
                className="gf-secondary-button"
                onClick={() => {
                  void handleSendOtp();
                }}
                disabled={busyAction !== null}
              >
                {busyAction === "otp-send" ? "Sending OTP..." : "Send OTP"}
              </button>

              {otpSent ? (
                <form className="gf-otp-form" onSubmit={handleVerifyOtp}>
                  <label>
                    OTP code
                    <input
                      value={otpCode}
                      onChange={(event) => {
                        setError("");
                        setOtpCode(event.target.value);
                      }}
                      placeholder="6-digit code"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      aria-label="OTP code"
                    />
                  </label>
                  <button type="submit" className="gf-login-submit" disabled={busyAction !== null}>
                    {busyAction === "otp-verify" ? "Verifying..." : "Verify and sign in"}
                  </button>
                </form>
              ) : null}
            </div>
          ) : null}

          {!showGoogle && !showPhoneOtp && loginId.trim() ? (
            <p className="gf-form-alert" role="alert">
              Enter a valid email address or mobile number.
            </p>
          ) : null}

          {error ? (
            <p className="gf-form-alert" role="alert">
              {error}
            </p>
          ) : null}

          {notice ? (
            <p className="gf-login-notice" role="status">
              {notice}
            </p>
          ) : null}
        </div>

        <div id="gf-recaptcha-container" className="gf-recaptcha-container" />

        {isMockAuth ? (
          <p className="gf-login-note">Demo auth mode is active for local development and tests.</p>
        ) : null}
      </div>
    </div>
  );
}

export default GulefirdousLogin;
