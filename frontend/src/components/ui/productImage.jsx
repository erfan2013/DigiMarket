import React from "react";

export default function ProductImage({
  src,
  alt = "",
  ratio = "1:1",
  fit = "contain",
  bg = "bg-slate-50",
  className = "",
  sizes = "(max-width: 768px) 50vw, 25vw",
  loading = "lazy",
}) {
  const [w, h] = ratio.split(":").map(Number);
  const paddingTop = `${(h / w) * 100}%`;

  return (
    <div className={`relative w-full overflow-hidden rounded-xl ${bg} ${className}`}>
      <div style={{ paddingTop }} />
      {src ? (
        <img
          src={src}
          alt={alt}
          loading={loading}
          sizes={sizes}
          className={`absolute inset-0 h-full w-full object-${fit}`}
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center text-slate-400 text-xs">
          No image
        </div>
      )}
    </div>
  );
}
