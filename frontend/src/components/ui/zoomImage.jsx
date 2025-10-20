import React, { useRef, useState } from "react";

export default function ZoomImage({ src, alt, zoom = 2, className = "" }) {
  const ref = useRef(null);
  const [origin, setOrigin] = useState("center");
  const [active, setActive] = useState(false);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = Math.min(Math.max(0, e.clientX - r.left), r.width);
    const y = Math.min(Math.max(0, e.clientY - r.top), r.height);
    const px = (x / r.width) * 100;
    const py = (y / r.height) * 100;
    setOrigin(`${px}% ${py}%`);
  };

  return (
    <div
      ref={ref}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      onMouseMove={onMove}
      className={`relative overflow-hidden rounded-2xl bg-[var(--surface-2)] ${className}`}
    >
      <img
        src={src}
        alt={alt}
        className="w-full h-auto select-none pointer-events-none transition-transform duration-200 ease-out"
        style={{
          transform: active ? `scale(${zoom})` : "scale(1)",
          transformOrigin: origin,
        }}
        draggable="false"
      />
    </div>
  );
}
