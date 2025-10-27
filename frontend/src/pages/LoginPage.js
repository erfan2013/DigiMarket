import React, { useContext, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({ email: "", password: "" });

  const navigate = useNavigate();
  const { fetchUserDetails, fetchUserAddToCart } = useContext(Context);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!data.email || !data.password) {
      toast.error("Please enter email and password");
      return;
    }
    try {
      setLoading(true);
      const res = await fetch(SummaryApi.signIN.url, {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        cache: "no-cache",
      });
      const json = await res.json();

      if (json.success) {
        toast.success(json.message || "Signed in");
        // fallback if third-party cookie fails
        if (json.data) localStorage.setItem("jwt", json.data);

        await fetchUserDetails?.();
        await fetchUserAddToCart?.();
        navigate("/");
      } else {
        toast.error(json.message || "Sign in failed");
      }
    } catch (err) {
      toast.error(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] page auth">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-600/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/30 to-teal-500/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* glass card */}
          <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-[var(--surface)]/10 p-6 shadow-2xl backdrop-blur-xl auth-card">
            <div className="flex flex-col items-center gap-3 pt-4">
              <div className="text-center">
                <h1 className="text-2xl font-semibold text-[var(--text)]">
                  Welcome back
                </h1>
                <p className="mt-1 text-sm text-[var(--text-muted)]/80">
                  Please sign in to continue
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              {/* Email */}
              <label className="group grid gap-1">
                <span className="text-xs text-slate-200/80">Email</span>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleOnChange}
                    placeholder="you@example.com"
                    className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12
            text-[var(--text)] dark:text-[var(--text)]
            placeholder:text-slate-400 dark:placeholder:text-slate-400
            [-webkit-text-fill-color:var(--text)] dark:[-webkit-text-fill-color:var(--text)]
            outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
                    autoComplete="email"
                  />
                  <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                    <span className="text-[var(--text-muted)]/50">@</span>
                  </div>
                </div>
              </label>

              {/* Password */}
              <label className="group grid gap-1">
                <span className="text-xs text-slate-200/80">Password</span>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={data.password}
                    onChange={handleOnChange}
                    placeholder="*************"
                    className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12
            text-[var(--text)] dark:text-[var(--text)]
            placeholder:text-slate-400 dark:placeholder:text-slate-400
            [-webkit-text-fill-color:var(--text)] dark:[-webkit-text-fill-color:var(--text)]
            outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((p) => !p)}
                    className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]/70 hover:text-white"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </label>

              <div className="mt-2 flex items-center justify-between text-sm">
                <div className="flex items-center justify-between gap-1 text-slate-200/80">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 rounded border-white/20 bg-[var(--surface)]/10 text-indigo-500 focus:ring-indigo-400/30 ui-input"
                  />
                  <label htmlFor="remember" className="whitespace-nowrap text-slate-600 dark:text-slate-300">Remember me</label>
                </div>
                {/* adjust path if your route differs */}
                <Link
                  to="/forgot-password"
                  className="text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
                >
                  Forgot password?
                </Link>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 btn btn-ghost"
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>

              <div className="relative my-2">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-white/10" />
                </div>
                <div className="relative flex justify-center">
                  <span className="bg-[var(--bg)] px-3 text-xs text-[var(--text-muted)]/60">
                    or
                  </span>
                </div>
              </div>

              <p className="text-center text-sm text-slate-200/80">
                Dont have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
                >
                  Sign up
                </Link>
              </p>
            </form>

            <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rotate-12 rounded-3xl bg-[var(--surface)]/10 blur-xl" />
            <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 -rotate-12 rounded-3xl bg-[var(--surface)]/10 blur-xl" />
          </div>
        </div>
      </div>
    </main>
  );
};

export default LoginPage;



