// src/components/ProductDetailsView.jsx
import React, { useMemo } from "react";
import resolveImageUrl from "../helper/resolveImageUrl";
import DisplayUSDCurrency from "../helper/displayCurrency";
// اگر مسیرش فرق می‌کنه، مطابق پروژهٔ خودت اصلاحش کن
import ZoomImage from "./ui/zoomImage"; // یا: import ZoomImage from "../components/ui/ZoomImage";

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
        {/* LEFT: تصویر کوچکتر + زوم با ZoomImage خودت */}
        <div>
          <ZoomImage
            src={main}
            alt={product?.ProductName}
            zoom={2}                     // شدت زوم (بخواهی تغییر بده)
            className="rounded-2xl ring-1 ring-slate-200 bg-slate-50
                       max-h-[460px] aspect-square overflow-hidden"
          />

          {pics.length > 1 && (
            <div className="mt-4 flex gap-3 overflow-x-auto">
              {pics.map((src, i) => (
                <div
                  key={i}
                  className="h-20 w-20 shrink-0 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white"
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

        {/* RIGHT: اطلاعات محصول */}
        <div className="space-y-5">
          <h1 className="text-2xl font-semibold text-slate-900">
            {product?.ProductName}
          </h1>

          <div className="flex items-baseline gap-3">
            <div className="text-2xl font-bold text-slate-900">
              {DisplayUSDCurrency(price)}
            </div>
            {hasDiscount && (
              <>
                <div className="text-slate-500 line-through">
                  {DisplayUSDCurrency(old)}
                </div>
                <span className="rounded-full bg-green-100 px-2 py-0.5 text-sm text-green-700">
                  -{Math.round(((old - price) / (old || 1)) * 100)}%
                </span>
              </>
            )}
          </div>

          {product?.brand && (
            <div className="text-sm text-slate-600">
              Brand: <span className="font-medium text-slate-800">{product.brand}</span>
            </div>
          )}
          {product?.category && (
            <div className="text-sm text-slate-600">
              Category: <span className="font-medium text-slate-800">{product.category}</span>
            </div>
          )}

          {product?.description && (
            <p className="text-slate-700 leading-7">{product.description}</p>
          )}

          <div className="flex items-center gap-3">
            <button
              onClick={onAddToCart}
              className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-5 py-2.5 text-white
                         hover:scale-105 active:scale-100 transition-transform duration-200 ease-out
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400"
            >
              Add to cart
            </button>

            <button
              onClick={onBuyNow}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-slate-700 hover:bg-slate-50 transition"
            >
              Buy now
            </button>
          </div>

          {Array.isArray(product?.features) && product.features.length > 0 && (
            <ul className="mt-2 list-disc pl-5 text-slate-700 space-y-1">
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
//   rightExtra,     // اگر خواستی چیز اضافه در ستون راست نمایش بدی
// }) {
//   if (!product) return null;

//   return (
//     <div className="grid lg:grid-cols-2 gap-8">
//       {/* Gallery */}
//       <ProductGallery images={product?.ProductImage} />

//       {/* Info */}
//       <div className="space-y-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">{product?.ProductName}</h1>
//           {product?.category && (
//             <div className="mt-1 text-sm text-slate-500">{product?.category}</div>
//           )}
//         </div>

//         <div className="flex items-end gap-3">
//           <div className="text-2xl font-extrabold text-slate-900">
//             {DisplayUSDCurrency(product?.Price)}
//           </div>
//           {product?.Discount > 0 && (
//             <div className="text-sm text-slate-400 line-through">
//               {DisplayUSDCurrency(Number(product?.Price) + Number(product?.Discount || 0))}
//             </div>
//           )}
//         </div>

//         <p className="text-slate-700 leading-relaxed">
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
