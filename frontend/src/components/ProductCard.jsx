import React from "react";
import resolveImageUrl from "../helper/resolveImageUrl";
import DisplayUSDCurrency from "../helper/displayCurrency";
import clsx from "clsx";

export default function ProductCard({ product, onClick, footer }) {
  const img = product?.ProductImage?.[0];
  return (
    <div
      className={clsx(
        "group rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-md transition-all",
        "overflow-hidden cursor-pointer"
      )}
      onClick={onClick}
    >
      <div className="relative aspect-[4/3] bg-slate-50">
        <img
          src={resolveImageUrl(img)}
          alt={product?.ProductName || "product"}
          className="h-full w-full object-contain p-4"
          loading="lazy"
        />
      </div>

      <div className="p-4">
        <h3 className="line-clamp-2 text-sm font-semibold text-slate-900">
          {product?.ProductName}
        </h3>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-base font-bold text-slate-900">
            {DisplayUSDCurrency(product?.Price)}
          </div>
          {product?.Discount > 0 && (
            <div className="text-xs text-slate-500 line-through">
              {DisplayUSDCurrency(
                Number(product?.Price) + Number(product?.Discount || 0)
              )}
            </div>
          )}
        </div>
        {footer && <div className="mt-3">{footer}</div>}
      </div>
    </div>
  );
}
