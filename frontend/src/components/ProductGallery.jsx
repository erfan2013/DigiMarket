import React, { useState } from "react";
import resolveImageUrl from "../helper/resolveImageUrl";
import clsx from "clsx";

export default function ProductGallery({ images = [] }) {
  const prepared = (images || []).map(resolveImageUrl);
  const [active, setActive] = useState(0);

  if (!prepared.length) {
    return (
      <div className="rounded-2xl bg-[var(--surface-2)] aspect-square flex items-center justify-center text-[var(--text-muted)]">
        No image
      </div>
    );
  }

  return (
    <div className="grid gap-3">
      <div className="rounded-2xl p-2 ui-card">
        <img
          src={prepared[active]}
          alt="product"
          className="w-full h-auto object-contain rounded-xl"
        />
      </div>

      <div className="flex gap-2 overflow-auto">
        {prepared.map((u, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={clsx(
              "h-20 w-20 shrink-0 rounded-xl border p-1 transition-all",
              i === active
                ? "border-blue-500 ring-2 ring-blue-300"
                : "border-[var(--surface-border)] hover:border-[var(--surface-border)]"
            )}
          >
            <img src={u} alt={`thumb-${i}`} className="h-full w-full object-contain rounded-lg" />
          </button>
        ))}
      </div>
    </div>
  );
}

