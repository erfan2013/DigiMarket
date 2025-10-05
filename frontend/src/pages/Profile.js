import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import { authHeaders } from "../common/auth";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../Store/UserSlice";

export default function Profile() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  // داده‌های کاربر + فرم
  const [me, setMe] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    avatar: "",
  });
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  // تغییر رمز
  const [pwd, setPwd] = useState({ currentPassword: "", newPassword: "" });

  // آواتار
  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState("");

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
          name: data.data?.name || "",
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
    // cleanup preview URL on unmount
    return () => {
      if (avatarPreview) URL.revokeObjectURL(avatarPreview);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
        dispatch(setUserDetails(data.data || {})); // برای آپدیت Header
      } else {
        toast.error(data.message || "Update failed");
      }
    } catch (e) {
      toast.error(e.message || "Network error");
    }
  };

  const onChangePassword = async (e) => {
    e.preventDefault();
    if (!pwd.currentPassword || !pwd.newPassword) {
      toast.error("Fill current and new password");
      return;
    }
    try {
      const res = await fetch(SummaryApi.changePassword.url, {
        method: SummaryApi.changePassword.method, // "PATCH" یا alias
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

    // پاک کردن preview قبلی
    if (avatarPreview) URL.revokeObjectURL(avatarPreview);

    setAvatarFile(f);
    setAvatarPreview(URL.createObjectURL(f));
  };

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
        headers: { ...authHeaders() }, // ❗️ Content-Type رو نذار
        body: fd,
      });

      const data = await res.json();

      if (!res.ok) {
        // اگر سرور non-2xx داد
        throw new Error(data?.message || "Upload failed");
      }

      if (data.success) {
        toast.success(data.message || "Avatar updated");
        setMe(data.data || {});
        dispatch(setUserDetails(data.data || {})); // هدر همان لحظه آپدیت می‌شود

        // پاکسازی
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

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-8">
      {/* اطلاعات پایه */}
      <section className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold">Profile</h2>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <span className="text-sm text-gray-600">Email</span>
            <div className="font-medium">{me.email}</div>
          </div>

          <form onSubmit={onUpdateProfile} className="grid gap-3">
            <label className="grid gap-1">
              <span className="text-sm">Name</span>
              <input
                className="border p-2 rounded"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm">Phone</span>
              <input
                className="border p-2 rounded"
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                placeholder="+98 912 123 4567"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm">Address</span>
              <input
                className="border p-2 rounded"
                value={form.address}
                onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                placeholder="Street, No, Unit..."
              />
            </label>

            <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800 w-max">
              Save changes
            </button>
          </form>
        </div>
      </section>

      {/* تغییر رمز */}
      <section className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold">Change Password</h2>
        <form onSubmit={onChangePassword} className="grid gap-3">
          <label className="grid gap-1">
            <span className="text-sm">Current password</span>
            <input
              type="password"
              className="border p-2 rounded"
              value={pwd.currentPassword}
              onChange={(e) => setPwd((s) => ({ ...s, currentPassword: e.target.value }))}
            />
          </label>
          <label className="grid gap-1">
            <span className="text-sm">New password</span>
            <input
              type="password"
              className="border p-2 rounded"
              value={pwd.newPassword}
              onChange={(e) => setPwd((s) => ({ ...s, newPassword: e.target.value }))}
            />
          </label>
          <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800 w-max">
            Update password
          </button>
        </form>
      </section>

      {/* آواتار */}
      <section className="bg-white rounded-xl shadow p-4 space-y-4">
        <h2 className="text-xl font-semibold">Avatar</h2>
        <div className="flex items-center gap-4">
          <img
            src={avatarPreview || me.avatar || "/default-avatar.png"}
            alt="avatar"
            className="w-16 h-16 rounded-full object-cover border"
          />
          <form onSubmit={onUpdateAvatar} className="flex items-center gap-3">
            <input type="file" accept="image/*" onChange={onPickAvatar} />
            <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800">
              {me.avatar ? "Change avatar" : "Upload avatar"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}



// import React, { useEffect, useState } from "react";
// import SummaryApi from "../common";
// import { authHeaders } from "../common/auth";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { setUserDetails } from "../Store/UserSlice";

// export default function Profile() {
//   const dispatch = useDispatch();
//   const [loading, setLoading] = useState(true);
//   const [me, setMe] = useState({ name: "", email: "", phone: "", address: "", avatar: "" });

//   const [form, setForm] = useState({ name: "", phone: "", address: "" });
//   const [pwd, setPwd] = useState({ currentPassword: "", newPassword: "" });

//   const [avatarFile, setAvatarFile] = useState(null);
//   const [avatarPreview, setAvatarPreview] = useState("");

//   const fetchMe = async () => {
//     try {
//       const res = await fetch(SummaryApi.me.url, {
//         method: SummaryApi.me.method,
//         credentials: "include",
//         cache: "no-store",
//         headers: { ...authHeaders() },
//       });
//       if (res.status === 401) {
//         toast.error("Please login");
//         setLoading(false);
//         return;
//       }
//       const data = await res.json();
//       if (data.success) {
//         setMe(data.data || {});
//         setForm({
//           name: data.data?.name || "",
//           phone: data.data?.phone || "",
//           address: data.data?.address || "",
//         });
//       } else {
//         toast.error(data.message || "Failed to load profile");
//       }
//     } catch (e) {
//       toast.error(e.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => { fetchMe(); }, []);

//   const onUpdateProfile = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch(SummaryApi.updateMe.url, {
//         method: SummaryApi.updateMe.method.toUpperCase(),
//         credentials: "include",
//         cache: "no-store",
//         headers: { "Content-Type": "application/json", ...authHeaders() },
//         body: JSON.stringify(form),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success(data.message || "Profile updated");
//         setMe(data.data || {});
//         dispatch(setUserDetails(data.data || {})); // برای آپدیت Header
//       } else {
//         toast.error(data.message || "Update failed");
//       }
//     } catch (e) {
//       toast.error(e.message || "Network error");
//     }
//   };

//   const onChangePassword = async (e) => {
//     e.preventDefault();
//     if (!pwd.currentPassword || !pwd.newPassword) {
//       toast.error("Fill current and new password");
//       return;
//     }
//     try {
//       const res = await fetch(SummaryApi.changePassword.url, {
//         method: SummaryApi.changePassword.method,
//         credentials: "include",
//         cache: "no-store",
//         headers: { "Content-Type": "application/json", ...authHeaders() },
//         body: JSON.stringify(pwd),
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success(data.message || "Password changed");
//         setPwd({ currentPassword: "", newPassword: "" });
//       } else {
//         toast.error(data.message || "Change failed");
//       }
//     } catch (e) {
//       toast.error(e.message || "Network error");
//     }
//   };

//   const onPickAvatar = (e) => {
//     const f = e.target.files?.[0];
//     if (!f) return;
//     if (!["image/png","image/jpeg","image/jpg","image/webp"].includes(f.type)) {
//       toast.error("Only PNG/JPG/JPEG/WEBP allowed");
//       return;
//     }
//     if (f.size > 2 * 1024 * 1024) {
//       toast.error("Max size: 2MB");
//       return;
//     }
//     setAvatarFile(f);
//     setAvatarPreview(URL.createObjectURL(f));
//   };

//   const onUpdateAvatar = async (e) => {
//     e.preventDefault();
//     if (!avatarFile) {
//       toast.error("Choose an image");
//       return;
//     }
//     const fd = new FormData();
//     fd.append("avatar", avatarFile);
//     try {
//       const res = await fetch(SummaryApi.updateAvatar.url, {
//         method: SummaryApi.updateAvatar.method,
//         credentials: "include",
//         headers: { ...authHeaders() }, // Content-Type رو نذار
//         body: fd,
//       });
//       await fetch(SummaryApi.updateMe.url, {
//       method: SummaryApi.updateMe.method, // "PATCH"
//       credentials: "include",
//       headers: { "Content-Type": "application/json", ...authHeaders() },
//       body: JSON.stringify({ name, phone, address, countryCode }),
//       });

//       const data = await res.json();
//       if (data.success) {
//         toast.success(data.message || "Avatar updated");
//         setMe(data.data || {});
//         dispatch(setUserDetails(data.data || {})); // Header آواتار جدید را بلافاصله نشان می‌دهد
//         setAvatarFile(null);
//         setAvatarPreview("");
//       } else {
//         toast.error(data.message || "Upload failed");
//       }
//     } catch (e) {
//       toast.error(e.message || "Network error");
//     }
//   };

//   if (loading) return <div className="p-4">Loading...</div>;

//   return (
//     <div className="max-w-2xl mx-auto p-4 space-y-8">
//       {/* اطلاعات پایه */}
//       <section className="bg-white rounded-xl shadow p-4 space-y-4">
//         <h2 className="text-xl font-semibold">Profile</h2>
//         <div className="grid gap-3">
//           <div className="grid gap-1">
//             <span className="text-sm text-gray-600">Email</span>
//             <div className="font-medium">{me.email}</div>
//           </div>

//           <form onSubmit={onUpdateProfile} className="grid gap-3">
//             <label className="grid gap-1">
//               <span className="text-sm">Name</span>
//               <input className="border p-2 rounded" value={form.name}
//                      onChange={e=>setForm(f=>({...f, name:e.target.value}))}/>
//             </label>
//             <label className="grid gap-1">
//               <span className="text-sm">Phone</span>
//               <input className="border p-2 rounded" value={form.phone}
//                      onChange={e=>setForm(f=>({...f, phone:e.target.value}))}/>
//             </label>
//             <label className="grid gap-1">
//               <span className="text-sm">Address</span>
//               <input className="border p-2 rounded" value={form.address}
//                      onChange={e=>setForm(f=>({...f, address:e.target.value}))}/>
//             </label>
//             <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800 w-max">
//               Save changes
//             </button>
//           </form>
//         </div>
//       </section>

//       {/* تغییر رمز */}
//       <section className="bg-white rounded-xl shadow p-4 space-y-4">
//         <h2 className="text-xl font-semibold">Change Password</h2>
//         <form onSubmit={onChangePassword} className="grid gap-3">
//           <label className="grid gap-1">
//             <span className="text-sm">Current password</span>
//             <input type="password" className="border p-2 rounded"
//                    value={pwd.currentPassword}
//                    onChange={e=>setPwd(s=>({...s, currentPassword:e.target.value}))}/>
//           </label>
//           <label className="grid gap-1">
//             <span className="text-sm">New password</span>
//             <input type="password" className="border p-2 rounded"
//                    value={pwd.newPassword}
//                    onChange={e=>setPwd(s=>({...s, newPassword:e.target.value}))}/>
//           </label>
//           <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800 w-max">
//             Update password
//           </button>
//         </form>
//       </section>

//       {/* آواتار */}
//       <section className="bg-white rounded-xl shadow p-4 space-y-4">
//         <h2 className="text-xl font-semibold">Avatar</h2>
//         <div className="flex items-center gap-4">
//           <img
//             src={avatarPreview || me.avatar || "/default-avatar.png"}
//             alt="avatar"
//             className="w-16 h-16 rounded-full object-cover border"
//           />
//           <form onSubmit={onUpdateAvatar} className="flex items-center gap-3">
//             <input type="file" accept="image/*" onChange={onPickAvatar} />
//             <button className="bg-slate-700 text-white rounded px-4 py-2 hover:bg-slate-800">
//               {me.avatar ? "Change avatar" : "Upload avatar"}
//             </button>
//           </form>
//         </div>
//       </section>
//     </div>
//   );
// }
