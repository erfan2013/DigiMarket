import React from "react";
import DisplayUSDCurrency from "../../helper/displayCurrency";

export default function ProductRailCard({ data, onAdd }) {
  const img = data?.ProductImage?.[0] || "/placeholder.png";

  return (
    <div className="w-[220px] flex-shrink-0 rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md">
      <div className="relative h-40 w-full overflow-hidden rounded-xl bg-slate-50">
        <img
          src={img}
          alt={data?.ProductName || "product"}
          className="h-full w-full object-contain"
          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
        />
      </div>

      <div className="mt-3">
        <h3 className="line-clamp-2 text-sm font-medium text-slate-900">
          {data?.ProductName}
        </h3>
        <div className="mt-1 text-xs capitalize text-slate-500">{data?.category}</div>

        <div className="mt-2 flex items-center gap-2">
          <div className="text-base font-semibold text-slate-900">
            {DisplayUSDCurrency(data?.Selling || data?.Price || 0)}
          </div>
          {data?.Price && data?.Selling && data.Price > data.Selling && (
            <div className="text-xs text-slate-400 line-through">
              {DisplayUSDCurrency(data.Price)}
            </div>
          )}
        </div>

        <button
          className="mt-3 w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
          onClick={() => onAdd?.(data)}
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
