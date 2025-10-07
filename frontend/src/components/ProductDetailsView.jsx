import React from "react";
import ProductGallery from "./ProductGallery";
import DisplayUSDCurrency from "../helper/displayCurrency";
import Button from "./ui/Button";

export default function ProductDetailsView({
  product,
  onAddToCart,
  onBuyNow,
  rightExtra,     // اگر خواستی چیز اضافه در ستون راست نمایش بدی
}) {
  if (!product) return null;

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Gallery */}
      <ProductGallery images={product?.ProductImage} />

      {/* Info */}
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">{product?.ProductName}</h1>
          {product?.category && (
            <div className="mt-1 text-sm text-slate-500">{product?.category}</div>
          )}
        </div>

        <div className="flex items-end gap-3">
          <div className="text-2xl font-extrabold text-slate-900">
            {DisplayUSDCurrency(product?.Price)}
          </div>
          {product?.Discount > 0 && (
            <div className="text-sm text-slate-400 line-through">
              {DisplayUSDCurrency(Number(product?.Price) + Number(product?.Discount || 0))}
            </div>
          )}
        </div>

        <p className="text-slate-700 leading-relaxed">
          {product?.description || "No description"}
        </p>

        <div className="flex items-center gap-3">
          <Button onClick={onAddToCart}>Add to cart</Button>
          <Button variant="secondary" onClick={onBuyNow}>Buy now</Button>
        </div>

        {rightExtra}
      </div>
    </div>
  );
}
