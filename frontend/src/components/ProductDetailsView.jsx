// src/components/ProductDetailsView.jsx
import React, { useMemo } from "react";
import resolveImageUrl from "../helper/resolveImageUrl";
import DisplayUSDCurrency from "../helper/displayCurrency";
// Ø§Ú¯Ø± Ù…Ø³ÛŒØ±Ø´ ÙØ±Ù‚ Ù…ÛŒâ€ŒÚ©Ù†Ù‡ØŒ Ù…Ø·Ø§Ø¨Ù‚ Ù¾Ø±ÙˆÚ˜Ù‡Ù” Ø®ÙˆØ¯Øª Ø§ØµÙ„Ø§Ø­Ø´ Ú©Ù†
import ZoomImage from "./ui/zoomImage"; // ÛŒØ§: import ZoomImage from "../components/ui/ZoomImage";

export default function ProductDetailsView({ product, onAddToCart, onBuyNow }) {
  const pics = useMemo(() => {
    const arr = Array.isArray(product?.ProductImage) ? product.ProductImage : [];
    return arr.map(resolveImageUrl).filter(Boolean);
  }, [product]);

  const main = pics[0] || "/placeholder.png";
  const price = Number(product?.Selling ?? product?.Price ?? 0);
  const old = Number(product?.Price ?? 0);
  const hasDiscount = old > price;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT: ØªØµÙˆÛŒØ± Ú©ÙˆÚ†Ú©ØªØ± + Ø²ÙˆÙ… Ø¨Ø§ ZoomImage Ø®ÙˆØ¯Øª */}
        <div>
          <ZoomImage
            src={main}
            alt={product?.ProductName}
            zoom={2}                     // Ø´Ø¯Øª Ø²ÙˆÙ… (Ø¨Ø®ÙˆØ§Ù‡ÛŒ ØªØºÛŒÛŒØ± Ø¨Ø¯Ù‡)
            className="rounded-2xl ring-1 ring-slate-200 bg-[var(--surface-2)]
                       max-h-[460px] aspect-square overflow-hidden"
          />

          {pics.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {pics.map((src, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-[var(--surface)]"
                >
                  <img
                    src={src}
                    alt={`thumb-${i}`}
                    className="h-full w-full object-contain"
                    draggable="false"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* RIGHT: Ø§Ø·Ù„Ø§Ø¹Ø§Øª Ù…Ø­ØµÙˆÙ„ */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold text-[var(--text)]">
            {product?.ProductName}
          </h1>

          <div className="flex items-baseline gap-3">
            <div className="text-2xl font-bold text-[var(--text)]">
              {DisplayUSDCurrency(price)}
            </div>
            {hasDiscount && (
              <>
                <div className="text-[var(--text-muted)] line-through price-old">
                  {DisplayUSDCurrency(old)}
                </div>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-700">
                  -{Math.round(((old - price) / (old || 1)) * 100)}%
                </span>
              </>
            )}
          </div>

          {product?.brand && (
            <div className="text-sm text-[var(--text-muted)]">
              Brand: <span className="font-medium text-[var(--text-muted)]">{product.brand}</span>
            </div>
          )}
          {product?.category && (
            <div className="text-sm text-[var(--text-muted)]">
              Category: <span className="font-medium text-[var(--text-muted)]">{product.category}</span>
            </div>
          )}

          {product?.description && (
            <p className="text-[var(--text-muted)] leading-7">{product.description}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onAddToCart}
              className="inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-white hover:scale-105 active:scale-100 transition-transform duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 btn btn-ghost"
            >
              Add to cart
            </button>

            <button
              onClick={onBuyNow}
              className="rounded-xl px-4 py-2.5 text-[var(--text-muted)] hover:bg-[var(--surface-2)] transition ui-card btn btn-ghost"
            >
              Buy now
            </button>
          </div>

          {Array.isArray(product?.features) && product.features.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-[var(--text-muted)] space-y-1">
              {product.features.map((f, idx) => <li key={idx}>{f}</li>)}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}






// import React from "react";
// import ProductGallery from "./ProductGallery";
// import DisplayUSDCurrency from "../helper/displayCurrency";
// import Button from "./ui/Button";

// export default function ProductDetailsView({
//   product,
//   onAddToCart,
//   onBuyNow,
//   rightExtra,     // Ø§Ú¯Ø± Ø®ÙˆØ§Ø³ØªÛŒ Ú†ÛŒØ² Ø§Ø¶Ø§ÙÙ‡ Ø¯Ø± Ø³ØªÙˆÙ† Ø±Ø§Ø³Øª Ù†Ù…Ø§ÛŒØ´ Ø¨Ø¯ÛŒ
// }) {
//   if (!product) return null;

//   return (
//     <div className="grid lg:grid-cols-2 gap-8">
//       {/* Gallery */}
//       <ProductGallery images={product?.ProductImage} />

//       {/* Info */}
//       <div className="space-y-4">
//         <div>
//           <h1 className="text-2xl font-bold text-[var(--text)]">{product?.ProductName}</h1>
//           {product?.category && (
//             <div className="mt-1 text-sm text-[var(--text-muted)]">{product?.category}</div>
//           )}
//         </div>

//         <div className="flex items-end gap-3">
//           <div className="text-2xl font-extrabold text-[var(--text)]">
//             {DisplayUSDCurrency(product?.Price)}
//           </div>
//           {product?.Discount > 0 && (
//             <div className="text-sm text-[var(--text-muted)] line-through price-old">
//               {DisplayUSDCurrency(Number(product?.Price) + Number(product?.Discount || 0))}
//             </div>
//           )}
//         </div>

//         <p className="text-[var(--text-muted)] leading-relaxed">
//           {product?.description || "No description"}
//         </p>

//         <div className="flex items-center gap-3">
//           <Button onClick={onAddToCart}>Add to cart</Button>
//           <Button variant="secondary" onClick={onBuyNow}>Buy now</Button>
//         </div>

//         {rightExtra}
//       </div>
//     </div>
//   );
// }

