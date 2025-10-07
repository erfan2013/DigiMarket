import React, { useEffect, useMemo, useRef, useState } from "react";
import ProductCard from "./productCard";
import SummaryApi from "../../common";

export default function ProductRail({
  title = "Products",
  category,           // مثل: "mobiles" | "airpodes" | ...
  onAdd,              // (اختیاری) کلیک روی Add to cart
  limit = 12,         // چند آیتم بگیریم
}) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const railRef = useRef(null);
  const [showNav, setShowNav] = useState(false);

  // fetch
  useEffect(() => {
    let ac = new AbortController();
    const run = async () => {
      try {
        setLoading(true);
        const res = await fetch(SummaryApi.filterProduct.url, {
          method: SummaryApi.filterProduct.method, // POST
          headers: { "Content-Type": "application/json" },
          signal: ac.signal,
          body: JSON.stringify({ category: [category] }), // API فعلی تو داری
        });
        const json = await res.json();
        const list = Array.isArray(json?.data) ? json.data.slice(0, limit) : [];
        setItems(list);
      } catch (e) {
        if (e.name !== "AbortError") setItems([]);
      } finally {
        setLoading(false);
      }
    };
    run();
    return () => ac.abort();
  }, [category, limit]);

  // کنترل نمایش فلش‌ها
  useEffect(() => {
    const check = () => {
      const el = railRef.current;
      if (!el) return;
      setShowNav(el.scrollWidth > el.clientWidth + 8);
    };
    check();
    const ro = new ResizeObserver(check);
    if (railRef.current) ro.observe(railRef.current);
    return () => ro.disconnect();
  }, [items, loading]);

  // اسکرول
  const scrollBy = (dir = 1) => {
    const el = railRef.current;
    if (!el) return;
    const step = el.clientWidth * 0.9; // تقریبا یک صفحه
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const skeletons = useMemo(() => new Array(6).fill(0), []);

  return (
    <section className="py-6">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="relative">
        {/* اسکرول‌ویو */}
        <div
          ref={railRef}
          className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2 scrollbar-none"
        >
          {(loading ? skeletons : items).map((p, idx) =>
            loading ? (
              <Skeleton key={idx} />
            ) : (
              <div key={p?._id || idx} className="snap-start shrink-0 w-[220px] md:w-[240px]">
                <ProductCard data={p} onAdd={onAdd} compact />
              </div>
            )
          )}
        </div>

        {/* فلش‌ها */}
        {showNav && (
          <>
            <NavBtn side="left" onClick={() => scrollBy(-1)} />
            <NavBtn side="right" onClick={() => scrollBy(1)} />
            {/* گرادیان لبه‌ها */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white" />
          </>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="snap-start shrink-0 w-[220px] md:w-[240px]">
      <div className="rounded-2xl border border-slate-200 bg-white p-3">
        <div className="h-40 w-full rounded-xl bg-slate-200 animate-pulse" />
        <div className="mt-3 h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
        <div className="mt-2 h-3 w-1/2 rounded bg-slate-200 animate-pulse" />
        <div className="mt-3 h-9 w-full rounded-lg bg-slate-200 animate-pulse" />
      </div>
    </div>
  );
}

function NavBtn({ side = "left", onClick }) {
  const isLeft = side === "left";
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? "Prev" : "Next"}
      className={[
        "absolute top-1/2 -translate-y-1/2 z-10",
        isLeft ? "left-0 -translate-x-1/2" : "right-0 translate-x-1/2",
        "rounded-full border border-slate-200 bg-white/90 p-2 shadow hover:bg-white",
      ].join(" ")}
    >
      <svg
        viewBox="0 0 24 24"
        className="h-5 w-5 text-slate-700"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {isLeft ? (
          <path d="M15 18l-6-6 6-6" />
        ) : (
          <path d="M9 6l6 6-6 6" />
        )}
      </svg>
    </button>
  );
}
