import React from "react";

/** نسبت ثابت + بدون کشیدگی */
export default function ProductImage({
  src,
  alt = "",
  ratio = "1:1",      // اگر خواستی 4:5 یا 4:3 هم می‌تونی بدی
  fit = "contain",    // برای محصولات بهتره contain باشه
  className = "",
  sizes = "(max-width:640px) 60vw, (max-width:1024px) 33vw, 320px",
  loading = "lazy",
}) {
  const [w, h] = String(ratio).split(":").map(Number);
  const paddingTop = (h && w) ? `${(h / w) * 100}%` : "100%";

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${className}`}>
      <div style={{ paddingTop }} />
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          sizes={sizes}
          className={`absolute inset-0 h-full w-full object-${fit}`}
          onError={(e)=> (e.currentTarget.src="/placeholder.png")}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-slate-400 text-xs">
          No image
        </div>
      )}
    </div>
  );
}
