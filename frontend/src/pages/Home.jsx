import React, { useContext, useMemo } from "react";
import Context from "../context";
import addToCart from "../helper/addToCart";
import productCategory from "../helper/ProductCategory";

import HeroCarousel from "../components/ui/HeroCarousel";
import CategoryStrip from "../components/ui/CategoryStrip";
import ProductRail from "../components/ui/ProductRail";

export default function Home() {
  const { fetchUserAddToCart } = useContext(Context);

  // نگاشت امن برای اسلاگ دسته‌ها
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

  const handleAdd = async (p) => {
    // addToCart(e,id) → ایونت ساده
    await addToCart({ preventDefault(){}, stopPropagation(){} }, p?._id);
    fetchUserAddToCart?.();
  };

  return (
    <div className="pb-12 min-h-screen
     bg-slate-50 [background:radial-gradient(80%_50%_at_10%_0%,rgba(99,102,241,.08),transparent_60%),radial-gradient(70%_40%_at_100%_100%,rgba(34,211,238,.10),transparent_60%)]">
      {/* نوار دسته‌بندی افقی با فلش */}
      <CategoryStrip items={productCategory} />

      {/* هیرو با اسلایدها؛ اگر عکس نداری، همون گرادیِنت/پترن رندر میشه */}
      <div className="mt-4">
        <HeroCarousel
          autoPlay
          interval={5000}
          slides={[
            { src: "/banners/slide1.jpg", title: "Big Summer Sale", subtitle: "Up to 40% off • Free shipping" },
            { src: "/banners/slide2.jpg", title: "New Arrivals", subtitle: "Phones • Laptops • Audio" },
            { src: "/banners/slide3.jpg", title: "Accessories Deals", subtitle: "Headphones, Mice, Keyboards" },
          ]}
        />
      </div>

      {/* ریل‌های افقی محصولات */}
      <div className="mx-auto max-w-7xl px-4 space-y-12 mt-8 ">
        <ProductRail title="Top Airpods" category={CAT.airpodes || CAT.airpods || "airpodes"} onAdd={handleAdd} />
        <ProductRail title="Mobiles"      category={CAT.mobiles || CAT.mobile || "mobiles"} onAdd={handleAdd} />
        <ProductRail title="Earphones"    category={CAT.earphones || "earphones"} onAdd={handleAdd} />
        <ProductRail title="Camera"       category={CAT.camera || "camera"} onAdd={handleAdd} />
        <ProductRail title="Mouse"        category={CAT.mouse || "mouse"} onAdd={handleAdd} />
      </div>
    </div>
  );
}
