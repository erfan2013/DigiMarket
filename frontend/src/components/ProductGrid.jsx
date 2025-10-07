import React from "react";
import ProductCard from "./ProductCard";
import EmptyState from "./ui/EmptyState";
import Skeleton from "./ui/Skeleton";

export default function ProductGrid({ items, loading, onClickItem }) {
  if (loading) {
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4">
            <Skeleton className="h-36 w-full mb-3" />
            <Skeleton className="h-4 w-3/4 mb-2" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return <EmptyState title="No products" subtitle="Try changing filters or search keywords." />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((p) => (
        <ProductCard key={p?._id} product={p} onClick={() => onClickItem?.(p)} />
      ))}
    </div>
  );
}
