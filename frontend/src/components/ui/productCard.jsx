import React from "react";
import DisplayUSDCurrency from "../../helper/displayCurrency";

export default function ProductCard({
  data = {},
  onAdd,             // (اختیاری) کلیک روی "Add to cart"
  onClick,           // (اختیاری) کلیک روی کل کارت
  className = "",
  compact = false,   // true = ریل افقی کوچکتر
}) {
  const img = data?.ProductImage?.[0] || "/placeholder.png";
  const priceNow = Number(data?.Selling ?? data?.Price ?? 0);
  const priceOld = Number(data?.Price ?? 0);

  return (
    <div
      onClick={onClick}
      className={[
        "rounded-2xl border border-slate-200 bg-white p-3 transition hover:shadow-md",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      {/* تصویر با ارتفاع ثابت برای یکدستی */}
      <div
        className={`relative w-full ${
          compact ? "h-36 md:h-40" : "h-44 md:h-48"
        } overflow-hidden rounded-xl bg-slate-50`}
      >
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
        <div className="mt-1 text-xs capitalize text-slate-500">
          {data?.category}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="text-base font-semibold text-slate-900">
            {DisplayUSDCurrency(priceNow)}
          </div>
          {priceOld > priceNow && (
            <div className="text-xs text-slate-400 line-through">
              {DisplayUSDCurrency(priceOld)}
            </div>
          )}
        </div>

        {onAdd && (
          <button
            className="mt-3 w-full rounded-lg bg-slate-900 px-3 py-2 text-sm font-medium text-white hover:bg-slate-800"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(data);
            }}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}
