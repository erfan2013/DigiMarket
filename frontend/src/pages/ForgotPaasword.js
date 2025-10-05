import React, { useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [devLink, setDevLink] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return toast.error("Enter email");

    try {
      const res = await fetch(SummaryApi.forgotPassword.url, {
        method: SummaryApi.forgotPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        setSent(true);
        if (data.resetLink) setDevLink(data.resetLink); // DEV
        toast.success(data.message || "If the email exists, we sent reset link");
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (e2) {
      toast.error(e2.message || "Network error");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Forgot Password</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm">Email</span>
          <input
            type="email"
            className="border p-2 rounded"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </label>
        <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800 w-max">
          Send reset link
        </button>
      </form>

      {sent && (
        <p className="text-sm text-green-700 mt-3">
          If the email exists, you'll receive a reset link shortly.
        </p>
      )}

      {devLink && (
        <div className="mt-4 text-xs">
          <div className="font-medium">DEV reset link:</div>
          <a className="text-blue-600 underline" href={devLink}>
            {devLink}
          </a>
        </div>
      )}
    </div>
  );
}
