import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helper/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import UserImage from "../assest/signin.gif";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    profilePic: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target; // Ã¢Å“â€¦ Ã˜Â¯Ã˜Â±Ã˜Â³Ã˜ÂªÃ˜Â´ Ã˜Â§Ã›Å’Ã™â€ Ã™â€¡
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const base64 = await imageTobase64(file);
    setData((prev) => ({ ...prev, profilePic: base64 }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.firstName.trim()) return toast.error("Enter your first name");
    if (!data.lastName.trim()) return toast.error("Enter your last name");
    if (!data.email.trim()) return toast.error("Enter your email");
    if (!data.password) return toast.error("Enter a password");
    if (data.password !== data.confirmPassword)
      return toast.error("Passwords do not match");
    if (!data.phone || !isValidPhoneNumber(data.phone))
      return toast.error("Enter a valid phone number");
    if (!data.address.trim()) return toast.error("Enter your address");

    const payload = {
      firstName: data.firstName.trim(), // Ã¢Å“â€¦ Ã™â€¡Ã™â€¦Ã˜Â§Ã™â€¡Ã™â€ ÃšÂ¯ Ã˜Â¨Ã˜Â§ Ã˜Â¨ÃšÂ©Ã¢â‚¬Å’Ã˜Â§Ã™â€ Ã˜Â¯
      lastName: data.lastName.trim(),
      name: `${data.firstName.trim()} ${data.lastName.trim()}`, // Ã˜Â¨Ã˜Â±Ã˜Â§Ã›Å’ Ã˜Â³Ã˜Â§Ã˜Â²ÃšÂ¯Ã˜Â§Ã˜Â±Ã›Å’
      email: data.email.trim().toLowerCase(),
      password: data.password,
      profilePic: data.profilePic,
      phone: data.phone, // E.164 e.g. +98912...
      address: data.address.trim(),
    };

    try {
      setLoading(true);
      const res = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method, // POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        toast.success(json.message || "Account created");
        navigate("/login");
      } else {
        toast.error(json.message || "Sign up failed");
      }
    } catch (err) {
      toast.error(err?.message || "Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] py-7 page auth">
      {/* soft gradient blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-600/30 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/30 to-teal-500/30 blur-3xl" />
        <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
        <div className="w-full max-w-md">
          {/* glass card */}
          <div className="relative overflow-hidden auth-card signup-card rounded-3xl border border-white/15 bg-[var(--surface)]/10 p-6 shadow-2xl backdrop-blur-xl">
            {/* header */}
            <div className="flex flex-col items-center gap-4 pt-2">
              <div className="relative">
                <div className="h-20 w-20 overflow-hidden rounded-2xl ring-2 ring-white/20">
                  <img src={data.profilePic || UserImage} alt="" className="h-full w-full object-cover" />
                </div>
                <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-xl bg-[var(--surface)]/20 px-3 py-1 text-xs text-white backdrop-blur-md ring-1 ring-white/30 hover:bg-[var(--surface)]/30">
                  Upload photo
                  <input type="file" accept="image/*" className="hidden" onChange={handleUploadPic} />
                </label>
              </div>

              <div className="text-center">
                <h1 className="text-[var(--text)]">
                  Create an account
                </h1>
                <p className="mt-1 text-sm text-[var(--text)]/70">
                  Fill the details to get started
                </p>
              </div>
            </div>

            {/* form */}
            <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
              {/* firstName */}
              <label className="grid gap-1">
                <span className="text-xs text-slate-200/80">First name</span>
                <input
                  type="text"
                  name="firstName"
                  value={data.firstName}
                  onChange={handleOnChange}
                  placeholder="First name"
                  className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12
            text-[var(--text)] dark:text-[var(--text)]
            placeholder:text-slate-400 dark:placeholder:text-slate-400
            [-webkit-text-fill-color:var(--text)] dark:[-webkit-text-fill-color:var(--text)]
            outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
                />
              </label>

              {/* lastName */}
              <label className="grid gap-1">
                <span className="text-xs text-slate-200/80">Last name</span>
                <input
                  type="text"
                  name="lastName"
                  value={data.lastName}
                  onChange={handleOnChange}
                  placeholder="Last name"
                  className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12
            text-[var(--text)] dark:text-[var(--text)]
            placeholder:text-slate-400 dark:placeholder:text-slate-400
            [-webkit-text-fill-color:var(--text)] dark:[-webkit-text-fill-color:var(--text)]
            outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
                />
              </label>

              {/* Email */}
              <label className="grid gap-1">
  <span className="text-xs text-[var(--text)]/75 dark:text-[var(--text)]/80">Phone</span>

  {/* رَپر با استایلِ دقیقاً مثل ui-input */}
  <div
    className="
      ui-input flex items-center gap-2 !px-3 !py-0
      focus-within:outline-2 focus-within:outline-offset-2
      focus-within:outline-[color:color-mix(in_oklab,var(--primary)_38%,transparent)]
    "
  >
    <PhoneInput
      international
      defaultCountry="IR"
      value={data.phone}
      onChange={(v) => setData((p) => ({ ...p, phone: v || "" }))}
      placeholder="e.g. +98 912 123 4567"
      /* استایل‌دادن به المنت‌های داخلی PhoneInput تا شبیه ui-input شود */
      className="
        flex-1
        [&_.PhoneInputCountry]:mr-2
        [&_.PhoneInputCountryIcon]:!rounded-md
        [&_.PhoneInputCountrySelect]:!bg-transparent
        [&_.PhoneInputCountrySelect]:!outline-none
        [&_.PhoneInputCountrySelectArrow]:!text-[var(--text)]
        [&_.PhoneInputInput]:h-11
        [&_.PhoneInputInput]:leading-[44px]
        [&_.PhoneInputInput]:!bg-transparent
        [&_.PhoneInputInput]:!border-0
        [&_.PhoneInputInput]:px-0
        [&_.PhoneInputInput]:!text-[var(--text)] dark:[&_.PhoneInputInput]:!text-[var(--text)]
        [&_.PhoneInputInput]:placeholder:text-slate-400 dark:[&_.PhoneInputInput]:placeholder:text-slate-400
        [&_.PhoneInputInput]:!outline-none
        [&_.PhoneInputInput]:![-webkit-text-fill-color:var(--text)]
        dark:[&_.PhoneInputInput]:![-webkit-text-fill-color:var(--text)]
      "
    />
  </div>

  {data.phone && !isValidPhoneNumber(data.phone) && (
    <span className="text-xs text-rose-500">Invalid phone number</span>
  )}
</label>
              {/* Address */}
              <label className="grid gap-1">
                <span className="text-xs text-slate-200/80">Address</span>
                <textarea
                  name="address"
                  value={data.address}
                  onChange={handleOnChange}
                  placeholder="Street , avanue , number"
                  rows={3}
                  className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12
            text-[var(--text)] dark:text-[var(--text)]
            placeholder:text-slate-400 dark:placeholder:text-slate-400
            [-webkit-text-fill-color:var(--text)] dark:[-webkit-text-fill-color:var(--text)]
            outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
                />
              </label>

              {/* Password */}
              <div className="grid gap-1">
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
                    autoComplete="new-password"
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
              </div>

              {/* Confirm Password */}
              <div className="grid gap-1">
                <span className="text-xs text-slate-200/80">Confirm password</span>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={data.confirmPassword}
                    onChange={handleOnChange}
                    placeholder="*************"
                    className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12
            text-[var(--text)] dark:text-[var(--text)]
            placeholder:text-slate-400 dark:placeholder:text-slate-400
            [-webkit-text-fill-color:var(--text)] dark:[-webkit-text-fill-color:var(--text)]
            outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword((p) => !p)}
                    className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]/70 hover:text-white"
                    aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
                  >
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 btn btn-ghost"
              >
                {loading ? "Creating account..." : "Sign up"}
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
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
                >
                  Sign in
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

export default SignUp;






// import React, { useState } from "react";
// import { FaEye, FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from "react-router-dom";
// import imageTobase64 from "../helper/imageTobase64";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
// import "react-phone-number-input/style.css";
// import UserImage from "../assest/signin.gif";

// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const [data, setData] = useState({
//     email: "",
//     password: "",
//     confirmPassword: "",
//     firstname: "",
//     lastname: "",
//     profilePic: "",
//     phone: "",
//     address: "",
//   });

//   const navigate = useNavigate();

//   const handleOnChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => ({ ...prev, [name]: value }));
//   };

//   const handleUploadPic = async (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     const base64 = await imageTobase64(file);
//     setData((prev) => ({ ...prev, profilePic: base64 }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!data.firstname.trim()) return toast.error("Enter your first name");
//     if (!data.lastname.trim()) return toast.error("Enter your last name");
//     if (!data.email.trim()) return toast.error("Enter your email");
//     if (!data.password) return toast.error("Enter a password");
//     if (data.password !== data.confirmPassword)
//       return toast.error("Passwords do not match");
//     if (!data.phone || !isValidPhoneNumber(data.phone))
//       return toast.error("Enter a valid phone number");
//     if (!data.address.trim()) return toast.error("Enter your address");

//     const payload = {
//       firstname: data.firstname.trim(),
//       lastname: data.lastname.trim(),
//       email: data.email.trim().toLowerCase(),
//       password: data.password,
//       profilePic: data.profilePic,
//       phone: data.phone, // E.164 e.g. +98912...
//       address: data.address.trim(),
//     };

//     try {
//       setLoading(true);
//       const res = await fetch(SummaryApi.SignUp.url, {
//         method: SummaryApi.SignUp.method, // POST
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//       });
//       const json = await res.json();

//       if (json.success) {
//         toast.success(json.message || "Account created");
//         navigate("/login");
//       } else {
//         toast.error(json.message || "Sign up failed");
//       }
//     } catch (err) {
//       toast.error(err?.message || "Network error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <main className="relative min-h-screen overflow-hidden bg-[var(--bg)] page">
//       {/* soft gradient blobs */}
//       <div className="pointer-events-none absolute inset-0">
//         <div className="absolute -top-20 -left-20 h-72 w-72 rounded-full bg-gradient-to-br from-indigo-500/40 to-violet-600/30 blur-3xl" />
//         <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-400/30 to-teal-500/30 blur-3xl" />
//         <div className="absolute top-1/3 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-gradient-to-tr from-fuchsia-500/20 to-rose-500/20 blur-3xl" />
//       </div>

//       <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center justify-center px-4">
//         <div className="w-full max-w-md">
//           {/* glass card */}
//           <div className="relative overflow-hidden auth-card signup-card rounded-3xl border border-white/15 bg-[var(--surface)]/10 p-6 shadow-2xl backdrop-blur-xl">
//             {/* header */}
//             <div className="flex flex-col items-center gap-4 pt-2">
//               <div className="relative">
//                 <div className="h-20 w-20 overflow-hidden rounded-2xl ring-2 ring-white/20">
//                   <img src={data.profilePic || UserImage} alt="" className="h-full w-full object-cover" />
//                 </div>
//                 <label className="absolute -bottom-2 left-1/2 -translate-x-1/2 cursor-pointer rounded-xl bg-[var(--surface)]/20 px-3 py-1 text-xs text-white backdrop-blur-md ring-1 ring-white/30 hover:bg-[var(--surface)]/30">
//                   Upload photo
//                   <input type="file" accept="image/*" className="hidden" onChange={handleUploadPic} />
//                 </label>
//               </div>

//               <div className="text-center">
//                 <h1 className="text-[var(--text)]">
//                   Create an account Ã¢Å“Â¨
//                 </h1>
//                 <p className="mt-1 text-sm text-[var(--text)]/70">
//                   Fill the details to get started
//                 </p>
//               </div>
//             </div>

//             {/* form */}
//             <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
//               {/* firstName */}
//               <label className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">firstName</span>
//                 <input
//                   type="text"
//                   name="firstname"
//                   value={data.firstname}
//                   onChange={handleOnChange}
//                   placeholder="First name"
//                   className="w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
//                 />
//               </label>
//               <label className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">lastName</span>
//                 <input
//                   type="text"
//                   name="lastname"
//                   value={data.lastname}
//                   onChange={handleOnChange}
//                   placeholder="Last name"
//                   className="w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
//                 />
//               </label>

//               {/* Email */}
//               <label className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">Email</span>
//                 <div className="relative">
//                   <input
//                     type="email"
//                     name="email"
//                     value={data.email}
//                     onChange={handleOnChange}
//                     placeholder="you@example.com"
//                     className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
//                     autoComplete="email"
//                   />
//                   <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
//                     <span className="text-[var(--text-muted)]/50">@</span>
//                   </div>
//                 </div>
//               </label>

//               {/* Phone */}
//               <label className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">Phone</span>
//                 <div className="rounded-2xl border border-white/15 bg-[var(--surface)]/5 px-2 py-1 text-[var(--text)]">
//                   <PhoneInput
//                     international
//                     defaultCountry="IR"
//                     value={data.phone}
//                     onChange={(val) => setData((prev) => ({ ...prev, phone: val || "" }))}
//                     placeholder="e.g. +98 912 123 4567"
//                     className="text-[15px] [&_.PhoneInputInput]:!bg-transparent [&_.PhoneInputInput]:!text-slate-100 [&_.PhoneInputInput]:!outline-none [&_.PhoneInputInput]:!border-none"
//                   />
//                 </div>
//                 {data.phone && !isValidPhoneNumber(data.phone) && (
//                   <span className="text-xs text-rose-300">Invalid phone number</span>
//                 )}
//               </label>

//               {/* Address */}
//               <label className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">Address</span>
//                 <textarea
//                   name="address"
//                   value={data.address}
//                   onChange={handleOnChange}
//                   placeholder="Street, number, unitÃ¢â‚¬Â¦"
//                   rows={3}
//                   className="w-full resize-none rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
//                 />
//               </label>

//               {/* Password */}
//               <div className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">Password</span>
//                 <div className="relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     name="password"
//                     value={data.password}
//                     onChange={handleOnChange}
//                     placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
//                     className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
//                     autoComplete="new-password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowPassword((p) => !p)}
//                     className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]/70 hover:text-white"
//                     aria-label={showPassword ? "Hide password" : "Show password"}
//                   >
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               {/* Confirm Password */}
//               <div className="grid gap-1">
//                 <span className="text-xs text-slate-200/80">Confirm password</span>
//                 <div className="relative">
//                   <input
//                     type={showConfirmPassword ? "text" : "password"}
//                     name="confirmPassword"
//                     value={data.confirmPassword}
//                     onChange={handleOnChange}
//                     placeholder="Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢Ã¢â‚¬Â¢"
//                     className="peer w-full rounded-2xl border-white/15 bg-[var(--surface)]/5 px-4 py-3 pr-12 text-slate-100 outline-none placeholder:text-[var(--text-muted)]/40 focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-400/20 ui-input"
//                     autoComplete="new-password"
//                   />
//                   <button
//                     type="button"
//                     onClick={() => setShowConfirmPassword((p) => !p)}
//                     className="absolute inset-y-0 right-3 flex items-center text-[var(--text-muted)]/70 hover:text-white"
//                     aria-label={showConfirmPassword ? "Hide confirm password" : "Show confirm password"}
//                   >
//                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                   </button>
//                 </div>
//               </div>

//               <button
//                 type="submit"
//                 disabled={loading}
//                 className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-indigo-500 via-violet-600 to-fuchsia-500 px-5 py-3 font-medium text-white shadow-lg shadow-indigo-900/20 transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60 btn btn-ghost"
//               >
//                 {loading ? "Creating account..." : "Sign up"}
//               </button>

//               <div className="relative my-2">
//                 <div className="absolute inset-0 flex items-center">
//                   <span className="w-full border-t border-white/10" />
//                 </div>
//                 <div className="relative flex justify-center">
//                   <span className="bg-[var(--bg)] px-3 text-xs text-[var(--text-muted)]/60">
//                     or
//                   </span>
//                 </div>
//               </div>

//               <p className="text-center text-sm text-slate-200/80">
//                 Already have an account?{" "}
//                 <Link
//                   to="/login"
//                   className="text-indigo-300 underline-offset-4 hover:text-indigo-200 hover:underline"
//                 >
//                   Sign in
//                 </Link>
//               </p>
//             </form>

//             <div className="pointer-events-none absolute -left-10 -top-10 h-24 w-24 rotate-12 rounded-3xl bg-[var(--surface)]/10 blur-xl" />
//             <div className="pointer-events-none absolute -bottom-10 -right-10 h-24 w-24 -rotate-12 rounded-3xl bg-[var(--surface)]/10 blur-xl" />
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default SignUp;

