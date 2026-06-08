import React, { useState } from "react";
import type { UserRole } from "./gulefirdousNav";

interface GulefirdousLoginProps {
  onSignIn: (loginId: string, role: UserRole) => void;
}

function GulefirdousLogin({ onSignIn }: GulefirdousLoginProps) {
  const [loginId, setLoginId] = useState("");
  const [role, setRole] = useState<UserRole>("admin");
  const [error, setError] = useState("");

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = loginId.trim();

    if (!trimmed) {
      setError("Enter your email address or phone number to continue.");
      return;
    }

    setError("");
    onSignIn(trimmed, role);
  };

  return (
    <div className="gf-login-page">
      <div className="gf-login-card">
        <div className="gf-login-brand">
          <div className="gf-logo" aria-hidden="true">
            GF
          </div>
          <div>
            <p className="gf-eyebrow">Fragrance of Humanity</p>
            <h1>Gulefirdous</h1>
            <p>Mobile app and web control center for perfumes, orders, and social ads.</p>
          </div>
        </div>

        <form className="gf-login-form" onSubmit={submit}>
          <label>
            Email or phone number
            <input
              value={loginId}
              onChange={(event) => {
                setError("");
                setLoginId(event.target.value);
              }}
              placeholder="admin@gulefirdous.com or 0300 1234567"
              autoComplete="username"
            />
          </label>

          <fieldset className="gf-role-picker">
            <legend>Sign in as</legend>
            <div className="gf-role-options">
              <button
                type="button"
                className={role === "admin" ? "active" : ""}
                aria-pressed={role === "admin"}
                onClick={() => setRole("admin")}
              >
                Administrator
                <small>Post ads, update products, process delivery</small>
              </button>
              <button
                type="button"
                className={role === "client" ? "active" : ""}
                aria-pressed={role === "client"}
                onClick={() => setRole("client")}
              >
                Client
                <small>Order perfumes and track shipment</small>
              </button>
            </div>
          </fieldset>

          {error ? (
            <p className="gf-form-alert" role="alert">
              {error}
            </p>
          ) : null}

          <button type="submit" className="gf-login-submit">
            Sign in
          </button>
        </form>

        <p className="gf-login-note">
          The Android and iPhone app uses the same login. Administrators manage the store from
          mobile; clients shop and track orders from mobile.
        </p>
      </div>
    </div>
  );
}

export default GulefirdousLogin;
