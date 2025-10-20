import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter email");

    try {
      setLoading(true);
      const res = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method, // POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        if (data.resetLink) setDevLink(data.resetLink); // shows only in dev backend
        toast.success(data.message || "If the email exists, we sent a reset link");
      } else {
        toast.error(data.message || "Failed to send reset link");
      }
    } catch (e2) {
      toast.error(e2.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] page">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-600/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/30 to-teal-500/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--surface)]/10 p-6 shadow-2xl backdrop-blur-xl">
            <div className="text-center">
              <h1 className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-2xl font-semibold text-transparent">
                Forgot password?
              </h1>
              <p className="mt-1 text-sm text-slate-200/80">
                Enter your email to receive a reset link.
              </p>
            </div>

            <form onSubmit={onSubmit} className="mt-8 grid gap-4">
              <label className="grid gap-1">
                <span className="text-xs text-slate-200/80">Email</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full rounded-2xl border border-white/15 bg-[var(--surface)]/5 px-4 py-3 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                />
              </label>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 btn btn-ghost"
              >
                {loading ? "Sending..." : "Send reset link"}
              </button>

              <p className="text-center text-sm text-slate-200/80">
                Back to{" "}
                <Link
                  to="/login"
                  className="text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </form>

            {sent && (
              <p className="mt-4 text-center text-sm text-emerald-300">
                If the email exists, you'll receive a reset link shortly.
              </p>
            )}

            {devLink && (
              <div className="mt-4 rounded-xl border border-white/10 bg-[var(--surface)]/5 p-3 text-xs text-slate-200">
                <div className="mb-1 font-medium">DEV reset link:</div>
                <a className="text-indigo-300 underline" href={devLink}>
                  {devLink}
                </a>
              </div>
            )}

            <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rotate-12 rounded-3xl bg-[var(--surface)]/10 blur-xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 -rotate-12 rounded-3xl bg-[var(--surface)]/10 blur-xl" />
          </div>
        </div>
      </div>
    </main>
  );
}


