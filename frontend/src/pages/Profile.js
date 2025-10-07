import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { authHeaders } from "../common/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/UserSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // user data
  const [me, setMe] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });

  // forms
  const [form, setForm] = useState({ firstname: "", lastname: "", phone: "", address: "" });
  const [pwd, setPwd] = useState({ currentPassword: "", newPassword: "" });

  // avatar
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

  // ===== LOAD ME =====
  const fetchMe = async () => {
    try {
      const res = await fetch(SummaryApi.me.url, {
        method: SummaryApi.me.method, // "GET"
        credentials: "include",
        cache: "no-store",
        headers: { ...authHeaders() },
      });

      if (res.status === 401) {
        toast.error("Please login");
        setLoading(false);
        return;
      }

      const data = await res.json();
      if (data.success) {
        setMe(data.data || {});
        setForm({
          firstname: data.data?.firstname || "",
          lastname: data.data?.lastname || "",
          phone: data.data?.phone || "",
          address: data.data?.address || "",
        });
      } else {
        toast.error(data.message || "Failed to load profile");
      }
    } catch (e) {
      toast.error(e.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMe();
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ===== UPDATE PROFILE =====
  const onUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(SummaryApi.updateMe.url, {
        method: SummaryApi.updateMe.method, // "PATCH"
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Profile updated");
        setMe(data.data || {});
        dispatch(setUserDetails(data.data || {}));
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (e) {
      toast.error(e.message || "Network error");
    }
  };

  // ===== CHANGE PASSWORD =====
  const onChangePassword = async (e) => {
    e.preventDefault();
    if (!pwd.currentPassword || !pwd.newPassword) {
      toast.error("Fill current and new password");
      return;
    }
    try {
      const res = await fetch(SummaryApi.changePassword.url, {
        method: SummaryApi.changePassword.method, // "PATCH"
        credentials: "include",
        cache: "no-store",
        headers: { "Content-Type": "application/json", ...authHeaders() },
        body: JSON.stringify(pwd),
      });
      const data = await res.json();
      if (data.success) {
        toast.success(data.message || "Password changed");
        setPwd({ currentPassword: "", newPassword: "" });
      } else {
        toast.error(data.message || "Change failed");
      }
    } catch (e) {
      toast.error(e.message || "Network error");
    }
  };

  // ===== AVATAR PICK =====
  const onPickAvatar = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;

    if (!["image/png", "image/jpeg", "image/jpg", "image/webp"].includes(f.type)) {
      toast.error("Only PNG/JPG/JPEG/WEBP allowed");
      return;
    }
    if (f.size > 2 * 1024 * 1024) {
      toast.error("Max size: 2MB");
      return;
    }

    if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

  // ===== UPDATE AVATAR =====
  const onUpdateAvatar = async (e) => {
    e.preventDefault();
    if (!avatarFile) {
      toast.error("Choose an image");
      return;
    }
    const fd = new FormData();
    fd.append("avatar", avatarFile);

    try {
      const res = await fetch(SummaryApi.updateAvatar.url, {
        method: SummaryApi.updateAvatar.method, // "PATCH"
        credentials: "include",
        headers: { ...authHeaders() }, // FORM: no Content-Type
        body: fd,
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.message || "Upload failed");

      if (data.success) {
        toast.success(data.message || "Avatar updated");
        setMe(data.data || {});
        dispatch(setUserDetails(data.data || {}));

        setAvatarFile(null);
        if (avatarPreview) URL.revokeObjectURL(avatarPreview);
        setAvatarPreview("");
      } else {
        toast.error(data.message || "Upload failed");
      }
    } catch (e) {
      toast.error(e.message || "Network error");
    }
  };

  // ===== UI =====
  if (loading) {
    return (
      <main className="relative min-h-[60vh] overflow-hidden bg-slate-950">
        <div className="absolute inset-0 -z-10">
          <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-600/30 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/30 to-teal-500/30 blur-3xl" />
        </div>
        <div className="mx-auto max-w-3xl p-6">
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur-xl">
            <div className="h-6 w-40 animate-pulse rounded-lg bg-white/10" />
            <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="h-12 animate-pulse rounded-xl bg-white/10" />
              ))}
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-950">
      {/* soft gradient background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-600/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/30 to-teal-500/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 py-10">
        <header className="mb-6 flex items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white">
            <span className="text-xl">👤</span>
          </div>
          <div>
            <h1 className="bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-2xl font-semibold text-transparent">
              Profile
            </h1>
            <p className="text-sm text-slate-300/80">Manage your personal information</p>
          </div>
        </header>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-5">
          {/* LEFT: Avatar */}
          <section className="md:col-span-2">
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-medium text-white/90">Avatar</h2>

              <div className="flex items-center gap-4">
                <img
                  src={avatarPreview || me.avatar || "/default-avatar.png"}
                  alt="avatar"
                  className="h-20 w-20 rounded-full border border-white/20 object-cover"
                />
                <div className="flex-1">
                  <label
                    className="inline-flex cursor-pointer items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm text-white/90 transition hover:bg-white/10"
                  >
                    <input type="file" accept="image/*" onChange={onPickAvatar} className="hidden" />
                    Choose image
                  </label>
                  <p className="mt-2 text-xs text-slate-300/70">
                    JPG/PNG/WEBP, up to 2MB
                  </p>
                </div>
              </div>

              <form onSubmit={onUpdateAvatar} className="mt-5">
                <button
                  className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-2.5 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110 disabled:opacity-60"
                  disabled={!avatarFile}
                >
                  {me.avatar ? "Change avatar" : "Upload avatar"}
                </button>
              </form>

              <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rotate-12 rounded-3xl bg-white/10 blur-xl" />
            </div>
          </section>

          {/* RIGHT: Info + Password */}
          <section className="md:col-span-3 space-y-6">
            {/* Profile info */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-medium text-white/90">Basic information</h2>

              <div className="grid gap-4">
                <div>
                  <label className="mb-1 block text-xs text-slate-300/80">Email</label>
                  <div className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-200">
                    {me.email}
                  </div>
                </div>

                <form onSubmit={onUpdateProfile} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <label>
                    <span className="mb-1 block text-xs text-slate-300/80">firstName</span>
                    <input
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-300/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                      value={form.firstname}
                      onChange={(e) => setForm((f) => ({ ...f, firstname: e.target.value }))}
                      placeholder="Your first name"
                    />
                  </label>
                  <label>
                    <span className="mb-1 block text-xs text-slate-300/80">Last Name</span>
                    <input
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-300/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                      value={form.lastname}
                      onChange={(e) => setForm((f) => ({ ...f, lastname: e.target.value }))}
                      placeholder="Your last name"
                    />
                  </label>

                  <label>
                    <span className="mb-1 block text-xs text-slate-300/80">Phone</span>
                    <input
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-300/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                      value={form.phone}
                      onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                      placeholder="+98 912 123 4567"
                    />
                  </label>

                  <label className="sm:col-span-2">
                    <span className="mb-1 block text-xs text-slate-300/80">Address</span>
                    <input
                      className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-300/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                      value={form.address}
                      onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                      placeholder="Street, No, Unit..."
                    />
                  </label>

                  <div className="sm:col-span-2">
                    <button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110">
                      Save changes
                    </button>
                  </div>
                </form>
              </div>

              <div className="pointer-events-none absolute -right-10 -bottom-10 h-24 w-24 -rotate-12 rounded-3xl bg-white/10 blur-xl" />
            </div>

            {/* Change password */}
            <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">
              <h2 className="mb-4 text-lg font-medium text-white/90">Change password</h2>

              <form onSubmit={onChangePassword} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <label>
                  <span className="mb-1 block text-xs text-slate-300/80">Current password</span>
                  <input
                    type="password"
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-300/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                    value={pwd.currentPassword}
                    onChange={(e) => setPwd((s) => ({ ...s, currentPassword: e.target.value }))}
                    autoComplete="current-password"
                  />
                </label>

                <label>
                  <span className="mb-1 block text-xs text-slate-300/80">New password</span>
                  <input
                    type="password"
                    className="w-full rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-slate-100 outline-none placeholder:text-slate-300/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20"
                    value={pwd.newPassword}
                    onChange={(e) => setPwd((s) => ({ ...s, newPassword: e.target.value }))}
                    autoComplete="new-password"
                  />
                </label>

                <div className="sm:col-span-2">
                  <button className="w-full rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110">
                    Update password
                  </button>
                </div>
              </form>

              <div className="pointer-events-none absolute -right-10 -top-10 h-24 w-24 rotate-12 rounded-3xl bg-white/10 blur-xl" />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
