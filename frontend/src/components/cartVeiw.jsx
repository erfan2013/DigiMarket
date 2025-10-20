import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import DisplayUSDCurrency from "../helper/displayCurrency";
import {
  FiTrash2,
  FiMinus,
  FiPlus,
  FiTag,
  FiShield,
  FiTruck,
} from "react-icons/fi";

export default function CartView({
  items = [],
  subtotal = 0,
  shipping = 0,
  tax = 0,
  grandTotal = 0,
  onInc,
  onDec,
  onRemove,
  onCheckout,
  onApplyCoupon, // Ø§Ø®ØªÛŒØ§Ø±ÛŒ
  loading = false,
}) {
  const [coupon, setCoupon] = useState("");

  const isEmpty = !loading && (!items || items.length === 0);
  const totals = useMemo(
    () => ({
      subtotal: Number(subtotal || 0),
      shipping: Number(shipping || 0),
      tax: Number(tax || 0),
      grand: Number(grandTotal || 0),
    }),
    [subtotal, shipping, tax, grandTotal]
  );

  if (loading) {
    return (
      <div className="grid gap-6 md:grid-cols-[1fr,360px]">
        {/* list skeleton */}
        <div className="space-y-3">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl p-4 animate-pulse ui-card"
            >
              <div className="flex gap-4">
                <div className="h-20 w-20 rounded-xl bg-[var(--surface-border)]" />
                <div className="flex-1 space-y-3">
                  <div className="h-4 bg-[var(--surface-border)] rounded w-2/3" />
                  <div className="h-4 bg-[var(--surface-border)] rounded w-1/3" />
                  <div className="h-8 bg-[var(--surface-border)] rounded w-24" />
                </div>
              </div>
            </div>
          ))}
        </div>
        {/* summary skeleton */}
        <div className="rounded-2xl p-4 h-max animate-pulse ui-card">
          <div className="h-5 bg-[var(--surface-border)] rounded w-1/2 mb-4" />
          <div className="space-y-2">
            <div className="h-4 bg-[var(--surface-border)] rounded" />
            <div className="h-4 bg-[var(--surface-border)] rounded" />
            <div className="h-4 bg-[var(--surface-border)] rounded" />
          </div>
          <div className="h-10 bg-[var(--surface-border)] rounded mt-4" />
        </div>
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div className="rounded-2xl p-10 text-center ui-card">
        <div className="text-2xl font-semibold text-[var(--text)]">
          Your cart is empty
        </div>
        <p className="text-[var(--text-muted)] mt-2">
          Add some products and come back to checkout.
        </p>
        <Link
          to="/"
          className="inline-flex items-center justify-center mt-6 rounded-xl bg-[var(--surface-2)] px-5 py-2.5 text-white hover:bg-[var(--surface-2)]"
        >
          Continue shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-[1fr,360px]">
      {/* list */}
      <div className="space-y-3">
        {items.map((it) => {
          const img =
            Array.isArray(it?.ProductImage) && it.ProductImage.length
              ? it.ProductImage[0]
              : it?.ProductImage || "/no-image.png";
        const qty = Number(it?.qty || 1);
          const unitPrice = Number(it?.Price || 0);
          const lineTotal = unitPrice * qty;

          return (
            <div
              key={it?._id}
              className="rounded-2xl p-4 ui-card"
            >
              <div className="flex gap-4">
                {/* image */}
                <Link
                  to={`/product/${it?.productId?._id || it?.productId || ""}`}
                  className="h-24 w-24 shrink-0 rounded-xl bg-[var(--surface-border)] border border-[var(--surface-border)] overflow-hidden"
                >
                  <img
                    src={img}
                    alt={it?.ProductName || "product"}
                    className="h-full w-full object-cover"
                  />
                </Link>

                {/* info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="text-sm font-semibold text-[var(--text)] truncate">
                        {it?.ProductName || "Product"}
                      </h3>
                      <div className="mt-1 text-sm text-[var(--text-muted)]">
                        {DisplayUSDCurrency(unitPrice)} <span className="text-[var(--text-muted)]">/ each</span>
                      </div>
                    </div>
                    <button
                      onClick={() => onRemove?.(it)}
                      className="text-rose-600 hover:text-rose-700 rounded-lg p-2 hover:bg-rose-50"
                      title="Remove"
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>

                  {/* qty & line total */}
                  <div className="mt-3 flex items-center justify-between">
                    <div className="inline-flex items-center rounded-xl border border-[var(--surface-border)]">
                      <button
                        onClick={() => qty > 1 && onDec?.(it)}
                        className={`p-2 ${qty > 1 ? "hover:bg-[var(--surface-2)] text-[var(--text-muted)]" : "text-[var(--text-muted)] cursor-not-allowed"}`}
                        aria-label="Decrease quantity"
                        disabled={qty <= 1}
                      >
                        <FiMinus />
                      </button>
                      <span className="w-10 text-center text-sm font-medium select-none">
                        {qty}
                      </span>
                      <button
                        onClick={() => onInc?.(it)}
                        className="p-2 hover:bg-[var(--surface-2)] text-[var(--text-muted)]"
                        aria-label="Increase quantity"
                      >
                        <FiPlus />
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-sm text-[var(--text-muted)]">Subtotal</div>
                      <div className="font-semibold text-[var(--text)]">
                        {DisplayUSDCurrency(lineTotal)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* perks */}
        <div className="grid sm:grid-cols-3 gap-3">
          <div className="flex items-center gap-3 border rounded-2xl p-3 ui-toolbar">
            <div className="rounded-xl bg-[var(--surface-2)] text-white p-2.5">
              <FiTruck />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-[var(--text)]">Fast delivery</div>
              <div className="text-[var(--text-muted)]">2â€“5 business days</div>
            </div>
          </div>
          <div className="flex items-center gap-3 border rounded-2xl p-3 ui-toolbar">
            <div className="rounded-xl bg-[var(--surface-2)] text-white p-2.5">
              <FiShield />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-[var(--text)]">Secure payment</div>
              <div className="text-[var(--text-muted)]">Stripe checkout</div>
            </div>
          </div>
          <div className="flex items-center gap-3 border rounded-2xl p-3 ui-toolbar">
            <div className="rounded-xl bg-[var(--surface-2)] text-white p-2.5">
              <FiTag />
            </div>
            <div className="text-sm">
              <div className="font-semibold text-[var(--text)]">No hidden fees</div>
              <div className="text-[var(--text-muted)]">Clear pricing</div>
            </div>
          </div>
        </div>
      </div>

      {/* summary */}
      <aside className="md:sticky md:top-24 h-max sidebar top-[84px] self-start p-4 rounded-xl top-[84px]">
        <div className="rounded-2xl p-4 shadow-sm ui-card">
          {/* coupon */}
          <div className="flex gap-2 mb-3">
            <input
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              placeholder="Coupon code"
              className="flex-1 rounded-xl border border-[var(--surface-border)] px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-200"
            />
            <button
              onClick={() => onApplyCoupon?.(coupon)}
              className="rounded-xl bg-[var(--surface-2)] px-3 py-2 text-sm text-white hover:bg-[var(--surface-2)]"
            >
              Apply
            </button>
          </div>

          {/* totals */}
          <div className="space-y-2 text-sm">
            <Row label="Subtotal" value={DisplayUSDCurrency(totals.subtotal)} />
            <Row label="Shipping" value={totals.shipping ? DisplayUSDCurrency(totals.shipping) : "Free"} />
            <Row label="Tax" value={DisplayUSDCurrency(totals.tax)} />
            <div className="border-t border-[var(--surface-border)] my-3" />
            <Row
              label={<span className="font-semibold text-[var(--text)]">Total</span>}
              value={<span className="font-semibold text-[var(--text)]">{DisplayUSDCurrency(totals.grand)}</span>}
            />
          </div>

          <button
            onClick={onCheckout}
            className="mt-4 w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-4 py-2.5 text-white font-semibold shadow-sm hover:from-blue-700 hover:to-indigo-700 btn btn-ghost"
          >
            Checkout
          </button>

          <p className="text-[11px] text-[var(--text-muted)] mt-3">
            By placing your order you agree to our Terms and Privacy Policy.
          </p>
        </div>
      </aside>
    </div>
  );
}

function Row({ label, value }) {
  return (
    <div className="flex items-center justify-between">
      <div className="text-[var(--text-muted)]">{label}</div>
      <div className="text-[var(--text)]">{value}</div>
    </div>
  );
}



