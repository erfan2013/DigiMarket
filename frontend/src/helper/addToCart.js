// src/helper/addToCart.js
import SummaryApi from "../common";
import { authHeaders } from "../common/auth";
import { toast } from "react-toastify";

/**
 * سازگار با هر دو امضا:
 * - addToCart(e, productId)
 * - addToCart(productId, quantity?)
 */
export default async function addToCart(eOrId, maybeId, qty = 1) {
  let productId;
  let quantity = qty;

  // حالت قدیمی: (e, id)
  if (typeof eOrId === "object" && eOrId?.preventDefault) {
    eOrId.preventDefault();
    productId = maybeId;
  } else {
    // حالت جدید: (id, qty?)
    productId = eOrId;
    if (typeof maybeId === "number") quantity = maybeId;
  }

  if (!productId) {
    toast.error("No product id");
    return false;
  }

  try {
    const res = await fetch(SummaryApi.addToCart.url, {
      method: SummaryApi.addToCart.method || "POST",
      credentials: "include",
      cache: "no-store",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),               // ⭐️ لازم
      },
      body: JSON.stringify({ productId, quantity }),
    });

    const data = await res.json().catch(() => ({}));

    if (!res.ok || !data?.success) {
      if (res.status === 401) toast.error("Please login to add to cart");
      else toast.error(data?.message || "Add to cart failed");
      return false;
    }

    toast.success("Added to cart");
    return true;
  } catch (err) {
    toast.error(err.message || "Network error");
    return false;
  }
}
