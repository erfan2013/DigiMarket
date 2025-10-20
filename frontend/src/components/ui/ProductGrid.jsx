import React from "react";
import ProductCard from "./productCard";

export default function ProductGrid({
  items = [],
  loading = false,
  onAdd,          // (اختیاری)
  onClickItem,    // (اختیاری)
  compact = false // اگر خواستی نسخه کوچک
}) {
  const skeletons = new Array(8).fill(0);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
      {(loading ? skeletons : items).map((p, i) =>
        loading ? (
          <Skel key={i} />
        ) : (
          <ProductCard
            key={p?._id || i}
            data={p}
            compact={compact}
            onAdd={onAdd}
            onClick={onClickItem ? () => onClickItem(p) : undefined}
          />
        )
      )}
    </div>
  );
}

function Skel() {
  return (
    <div className="rounded-2xl p-3 ui-card">
      <div className="h-48 w-full rounded-xl bg-[var(--surface-2)] animate-pulse" />
      <div className="mt-3 h-4 w-3/4 rounded bg-[var(--surface-2)] animate-pulse" />
      <div className="mt-2 h-3 w-1/2 rounded bg-[var(--surface-2)] animate-pulse" />
      <div className="mt-3 h-9 w-full rounded-lg bg-[var(--surface-2)] animate-pulse" />
    </div>
  );
}
