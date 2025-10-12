
import React, { useContext, useMemo } from "react";
import Context from "../context";
import addToCart from "../helper/addToCart";
import productCategory from "../helper/ProductCategory";
import CategoryList from "../components/CategoryList";
import ProductRail from "../components/ui/ProductRail";

export default function Home() {
  const { fetchUserAddToCart } = useContext(Context);

  // نقشهٔ امن برای نام دسته‌ها
  const CAT = useMemo(() => {
    const map = {};
    (productCategory || []).forEach(c => {
      if (!c) return;
      const v = String(c.value || "").toLowerCase();
      const l = String(c.label || "").toLowerCase();
      if (v) map[v] = c.value;
      if (l) map[l] = c.value;
    });
    return map;
  }, []);

  const handleAdd = async (id) => {
    if (!id) return;
    await addToCart(id);
    fetchUserAddToCart();
  };

  return (
    <div className="w-full">
      {/* --- Category strip همیشه بالاتر از همه --- */}
      <div className="sticky top-[68px] z-20 bg-[#D9E6F0]/80 backdrop-blur supports-[backdrop-filter]:bg-[#D9E6F0]/60">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <CategoryList />
        </div>
      </div>

      {/* --- محتوای صفحهٔ اصلی --- */}
      <div className="mx-auto max-w-7xl px-4 space-y-12 mt-6 bg-[#CFDDEA] py-6">
        <ProductRail title="Top Airpods" category={CAT.airpodes || CAT.airpods || "airpodes"} onAdd={handleAdd} />
        <ProductRail title="Mobiles"      category={CAT.mobiles || CAT.mobile || "mobiles"} onAdd={handleAdd} />
        <ProductRail title="Earphones"    category={CAT.earphones || "earphones"} onAdd={handleAdd} />
        <ProductRail title="Camera"       category={CAT.camera || "camera"} onAdd={handleAdd} />
        <ProductRail title="Mouse"        category={CAT.mouse || "mouse"} onAdd={handleAdd} />
      </div>
    </div>
  );
}
