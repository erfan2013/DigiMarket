// src/pages/Cart.js
import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import { loadStripe } from "@stripe/stripe-js";
import CartView from "../components/cartVeiw";
import { authHeaders } from "../common/auth";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);

  const fetchdata = async () => {
    try {
      setLoading(true);
      const res = await fetch(SummaryApi.addToCartViewProduct.url, {
        method: SummaryApi.addToCartViewProduct.method, // مثلا "GET"
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
      });
      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success) {
        setData(json.data || []);
      } else {
        setData([]);
      }
    } catch (e) {
      console.error(e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchdata();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const increaseQty = async (id, qty) => {
    try {
      const res = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method, // مثلا "PATCH"
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ _id: id, quantity: Number(qty || 0) + 1 }),
      });
      const json = await res.json();
      if (res.ok && json?.success) {
        await fetchdata();
        context.fetchUserAddToCart?.();
      }
    } catch {}
  };

  const decreaseQty = async (id, qty) => {
    if (qty < 2) return;
    try {
      const res = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ _id: id, quantity: Number(qty || 0) - 1 }),
      });
      const json = await res.json();
      if (res.ok && json?.success) {
        await fetchdata();
        context.fetchUserAddToCart?.();
      }
    } catch {}
  };

  const deleteProduct = async (id) => {
    try {
      const res = await fetch(SummaryApi.deleteAddToCartProduct.url, {
        method: SummaryApi.deleteAddToCartProduct.method, // مثلا "DELETE"
        credentials: "include",
        cache: "no-store",
        headers: {
          "Content-Type": "application/json",
          ...authHeaders(),
        },
        body: JSON.stringify({ _id: id }),
      });
      const json = await res.json();
      if (res.ok && json?.success) {
        await fetchdata();
        context.fetchUserAddToCart?.();
      }
    } catch {}
  };

  const handlePay = async () => {
    const stripePromise = await loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY);
    const res = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method, // "POST"
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
      body: JSON.stringify({ cartItems: data }),
    });
    const json = await res.json().catch(() => ({}));
    if (json?.id && stripePromise) {
      stripePromise.redirectToCheckout({ sessionId: json.id });
    }
  };

  // تبدیل ساختار بک‌اند به ساختار قابل استفاده در UI
  const items = (data || []).map((it) => ({
    ...it,
    ProductName: it?.productId?.ProductName,
    Price: it?.productId?.Selling,
    ProductImage: it?.productId?.ProductImage,
    qty: it?.quantity,
  }));

  const subtotal = items.reduce(
    (s, it) => s + Number(it?.Price || 0) * Number(it?.qty || 1),
    0
  );
  const shipping = 0;
  const tax = 0;
  const grandTotal = subtotal + shipping + tax;

  return (
    <div className="container mx-auto p-4">
      {!data?.length && !loading && (
        <p className="bg-[var(--surface)] py-5 text-center rounded-2xl">No Data</p>
      )}

      <CartView
        items={items}
        subtotal={subtotal}
        shipping={shipping}
        tax={tax}
        grandTotal={grandTotal}
        onInc={(it) => increaseQty(it?._id, it?.qty || 1)}
        onDec={(it) => decreaseQty(it?._id, it?.qty || 1)}
        onRemove={(it) => deleteProduct(it?._id)}
        onCheckout={handlePay}
        loading={loading}
      />
    </div>
  );
};

export default Cart;
