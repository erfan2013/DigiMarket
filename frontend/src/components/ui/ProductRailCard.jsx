import React from "react";
import DisplayUSDCurrency from "../../helper/displayCurrency";

export default function ProductRailCard({ data, onAdd }) {
  const img = data?.ProductImage?.[0] || "/placeholder.png";

  return (
    <div className="w-[220px] flex-shrink-0 rounded-2xl p-3 transition hover:shadow-md ui-card">
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-[var(--surface-2)]">
        <img
          src={img}
          alt={data?.ProductName || "product"}
          className="h-full w-full object-contain"
          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
        />
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-2 text-sm font-medium text-[var(--text)]">
          {data?.ProductName}
        </h3>
        <div className="mt-1 text-xs capitalize text-[var(--text-muted)]">{data?.category}</div>

        <div className="mt-2 flex items-center gap-2">
          <div className="text-base font-semibold text-[var(--text)]">
            {DisplayUSDCurrency(data?.Selling || data?.Price || 0)}
          </div>
          {data?.Price && data?.Selling && data.Price > data.Selling && (
            <div className="text-xs text-[var(--text-muted)] line-through price-old">
              {DisplayUSDCurrency(data.Price)}
            </div>
          )}
        </div>

        <button
          className="mt-3 w-full rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-[var(--surface-2)] btn btn-ghost"
          onClick={() => onAdd?.(data)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

