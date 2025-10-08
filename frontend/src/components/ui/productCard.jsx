import React from "react";
import DisplayUSDCurrency from "../../helper/displayCurrency";
import resolveImageUrl from "../../helper/resolveImageUrl";
import ProductImage from "./productImage";

/**
 * کارت محصول استاندارد
 * - تصویر درشت با نسبت 4:5 (پورتریت) → شکیل‌تر از 1:1
 * - عرض ریسپانسیو: 280 → 300 → 320px (برای ریل افقی عالیه)
 * - اگر توی Grid استفاده می‌کنی و نمی‌خوای min-width بده، prop "noMinWidth" رو true کن
 */
export default function ProductCard({
  data = {},
  onAdd,                 // اختیاری: کلیک "Add to cart"
  onClick,               // اختیاری: کلیک روی کل کارت
  className = "",
  imageRatio = "4:5",    // نسبت تصویر (مثلاً "1:1" یا "3:4")
  noMinWidth = false,    // اگر Grid داری و نمی‌خوای min-w بده → true
}) {
  const rawImg = data?.ProductImage?.[0];
  const img = resolveImageUrl(rawImg) || "/placeholder.png";

  const priceNow = Number(data?.Selling ?? data?.Price ?? 0);
  const priceOld = Number(data?.Price ?? 0);

  const widthClasses = noMinWidth
    ? ""
    : "min-w-[280px] sm:min-w-[300px] xl:min-w-[320px]";

  return (
    <div
      onClick={onClick}
      className={[
        "group rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-md transition",
        "p-3 md:p-4",
        widthClasses,
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      {/* تصویر بزرگ و تمیز؛ padding کم تا عکس درشت دیده شود */}
      <div className="w-full overflow-hidden rounded-xl bg-slate-50 p-1 md:p-2">
        <ProductImage
          src={img}
          alt={data?.ProductName || "product"}
          ratio={imageRatio}                 // پیش‌فرض 4:5
          fit="contain"
          bg="bg-transparent"
          sizes="(max-width:640px) 60vw, (max-width:1024px) 33vw, 320px"
          className="transition-transform duration-200 group-hover:scale-[1.02]"
          onError={(e) => (e.currentTarget.src = "/placeholder.png")}
        />
      </div>

      <div className="mt-3">
        {/* ارتفاع ثابت برای هم‌قدی کارت‌ها */}
        <h3 className="line-clamp-2 min-h-[52px] text-[15px] md:text-base font-medium text-slate-900">
          {data?.ProductName}
        </h3>

        <div className="mt-1 text-xs md:text-[13px] capitalize text-slate-500">
          {data?.category}
        </div>

        <div className="mt-2 flex items-center gap-2">
          <div className="text-[17px] md:text-[18px] font-semibold text-slate-900">
            {DisplayUSDCurrency(priceNow)}
          </div>
          {priceOld > priceNow && (
            <div className="text-xs md:text-[13px] text-slate-400 line-through">
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
