import React, { useState, useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";

export default function ResetPassword() {
  const navigate = useNavigate();
  const { search } = useLocation();
  const token = useMemo(()=> new URLSearchParams(search).get("token") || "", [search]);

  const [form, setForm] = useState({ newPassword: "", confirm: "" });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!token) return toast.error("Invalid reset link");
    if (!form.newPassword || form.newPassword !== form.confirm) {
      return toast.error("Passwords do not match");
    }
    try {
      const res = await fetch(SummaryApi.resetPassword.url, {
        method: SummaryApi.resetPassword.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, newPassword: form.newPassword }),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Password updated");
        navigate("/login");
      } else {
        toast.error(data.message || "Failed");
      }
    } catch (e2) {
      toast.error(e2.message || "Network error");
    }
  };

  return (
    <div className="max-w-sm mx-auto p-4 bg-white rounded-xl shadow">
      <h1 className="text-xl font-semibold mb-4">Reset Password</h1>
      <form onSubmit={onSubmit} className="grid gap-3">
        <label className="grid gap-1">
          <span className="text-sm">New password</span>
          <input
            type="password"
            className="border p-2 rounded"
            value={form.newPassword}
            onChange={(e)=>setForm(f=>({...f, newPassword:e.target.value}))}
          />
        </label>
        <label className="grid gap-1">
          <span className="text-sm">Confirm new password</span>
          <input
            type="password"
            className="border p-2 rounded"
            value={form.confirm}
            onChange={(e)=>setForm(f=>({...f, confirm:e.target.value}))}
          />
        </label>
        <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800 w-max">
          Update password
        </button>
      </form>
    </div>
  );
}
