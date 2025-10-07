import React, { useContext } from "react";
import ProductGrid from "./ui/ProductGrid";
import Context from "../context";
import addToCart from "../helper/addToCart";

export default function VerticalCartProduct({
  data = [],
  loading = false,
  onAdd, // اختیاری؛ اگر ندی خودمون هندل می‌کنیم
}) {
  const { fetchUserAddToCart } = useContext(Context);

  const handleAdd = async (p) => {
    if (onAdd) return onAdd(p);
    await addToCart(new Event("click"), p?._id);
    fetchUserAddToCart?.();
  };

  return (
    <ProductGrid
      items={data}
      loading={loading}
      onAdd={handleAdd}
      // onClickItem هم اگر لازم داری، موقع صدا زدن این کامپوننت بده
    />
  );
}
