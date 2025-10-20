import React from "react";
import DisplayUSDCurrency from "../../helper/displayCurrency";
import resolveImageUrl from "../../helper/resolveImageUrl";
import ProductImage from "./productImage";

export default function ProductCard({
  data = {},
  onAdd,                 // Ø¨Ø§ÛŒØ¯ id Ø¨Ú¯ÛŒØ±Ù‡Ø› Ù…Ø§ Ø®ÙˆØ¯Ù…ÙˆÙ† id Ø±Ùˆ Ø§Ø³ØªØ®Ø±Ø§Ø¬ Ù…ÛŒâ€ŒÚ©Ù†ÛŒÙ…
  onClick,
  className = "",
  inRail = false,        // Ø¯Ø§Ø®Ù„ Ø±ÛŒÙ„ â†’ min-width Ø«Ø§Ø¨Øª
  ratio = "1:1",
  showAdd = true,
}) {
  const id = data?._id;
  const img = resolveImageUrl(data?.ProductImage?.[0]) || "/placeholder.png";
  const now = Number(data?.Selling ?? data?.Price ?? 0);
  const old = Number(data?.Price ?? 0);

  return (
    <div
      onClick={onClick}
      className={[
        "group rounded-2xl bg-[var(--surface)] p-3 ring-1 ring-slate-200 shadow-sm",
        "transition will-change-transform hover:shadow-md hover:-translate-y-0.5",
        inRail ? "min-w-[260px] sm:min-w-[300px] xl:min-w-[320px]" : "",
        onClick ? "cursor-pointer" : "",
        className,
      ].join(" ")}
    >
      <div className="rounded-xl bg-[var(--surface-2)] p-2 overflow-hidden">
        <ProductImage
          src={img}
          alt={data?.ProductName}
          ratio={ratio}
          fit="contain"
          className="transition-transform duration-200 group-hover:scale-[1.03]"
        />
      </div>

      <div className="mt-3">
        <h3 className="text-[15px] md:text-base font-medium text-[var(--text)] line-clamp-2 min-h-[44px]">
          {data?.ProductName}
        </h3>
        <div className="mt-1 text-xs capitalize text-[var(--text-muted)]">{data?.category}</div>

        <div className="mt-2 flex items-center gap-2">
          <div className="text-[17px] md:text-[18px] font-semibold text-[var(--text)]">
            {DisplayUSDCurrency(now)}
          </div>
          {old > now && (
            <div className="text-xs text-[var(--text-muted)] line-through price-old">
              {DisplayUSDCurrency(old)}
            </div>
          )}
        </div>

        {showAdd && (
          <button
            className="mt-3 w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:brightness-110 disabled:opacity-60 btn btn-ghost"
            onClick={(e) => {
              e.stopPropagation();
              if (onAdd && id) onAdd(id);     // â† Ù‡Ù…ÛŒØ´Ù‡ Ø¨Ø§ id ÙØ±Ø§Ø®ÙˆØ§Ù†ÛŒ Ù…ÛŒâ€ŒÚ©Ù†ÛŒÙ…
            }}
            disabled={!onAdd || !id}
          >
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

