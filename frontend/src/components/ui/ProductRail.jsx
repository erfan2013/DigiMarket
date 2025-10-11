import React, { useEffect, useRef, useState } from "react";
import SummaryApi from "../../common";
import ProductCard from "./productCard";
import { useNavigate } from "react-router-dom";

export default function ProductRail({ title, category, onAdd, limit = 16 }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const railRef = useRef(null);
  const [showNav, setShowNav] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    let ac = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(SummaryApi.filterProduct.url, {
          method: SummaryApi.filterProduct.method,
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ category: [category] }),
          signal: ac.signal,
        });
        const json = await res.json();
        setItems(Array.isArray(json?.data) ? json.data.slice(0, limit) : []);
      } catch {}
      finally { setLoading(false); }
    })();
    return () => ac.abort();
  }, [category, limit]);

  useEffect(() => {
    const check = () => {
      const el = railRef.current; if (!el) return;
      setShowNav(el.scrollWidth > el.clientWidth + 8);
    };
    check();
    const ro = new ResizeObserver(check);
    if (railRef.current) ro.observe(railRef.current);
    return () => ro.disconnect();
  }, [items, loading]);

  const scrollBy = (dir = 1) => {
    const el = railRef.current; if (!el) return;
    const step = el.clientWidth * 0.9;
    el.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  // فقط وقتی واقعاً افقی حرکت می‌کنیم preventDefault بزن
  const onWheel = (e) => {
    const el = railRef.current; if (!el) return;
    const canScrollX = el.scrollWidth > el.clientWidth;
    if (!canScrollX) return; // پاس بده به اسکرول صفحه

    // اجازه بده deltaX (تاچ‌پد) native کار کنه
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;

    // deltaY را به افقی ترجمه کن
    const before = el.scrollLeft;
    el.scrollBy({ left: e.deltaY, behavior: "auto" });
    const moved = el.scrollLeft !== before;

    if (moved) e.preventDefault(); // فقط اگر حرکت کردیم
  };

  const skeletons = new Array(6).fill(0);

  return (
    <section className="relative">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">{title}</h2>
      </div>

      <div className="relative">
        <div
          ref={railRef}
          onWheel={onWheel}
          className="rail-scroll flex flex-nowrap gap-4 overflow-x-auto overflow-y-visible pb-3 scroll-smooth snap-x snap-mandatory"
        >
          {(loading ? skeletons : items).map((p, idx) =>
            loading ? (
              <Skeleton key={idx} />
            ) : (
              <div key={p?._id || idx} className="snap-start shrink-0">
                <ProductCard data={p} onAdd={onAdd} inRail onClick={() => navigate(`/product/${p?._id}`)} />
              </div>
            )
          )}
        </div>

        {showNav && (
          <>
            <NavBtn side="left"  onClick={() => scrollBy(-1)} />
            <NavBtn side="right" onClick={() => scrollBy(1)} />
            {/* گرادیان نرم دو طرف */}
            <div className="pointer-events-none absolute inset-y-0 left-0 w-10 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l from-slate-50 to-transparent" />
          </>
        )}
      </div>
    </section>
  );
}

function Skeleton() {
  return (
    <div className="min-w-[260px] sm:min-w-[300px] xl:min-w-[320px] rounded-2xl bg-white p-3 ring-1 ring-slate-200 shadow-sm">
      <div className="h-56 md:h-64 w-full rounded-xl bg-slate-200 animate-pulse" />
      <div className="mt-3 h-4 w-3/4 rounded bg-slate-200 animate-pulse" />
      <div className="mt-2 h-3 w-1/2 rounded bg-slate-200 animate-pulse" />
      <div className="mt-3 h-9 w-full rounded-lg bg-slate-200 animate-pulse" />
    </div>
  );
}

function NavBtn({ side="left", onClick }) {
  const isLeft = side === "left";
  return (
    <button
      onClick={onClick}
      aria-label={isLeft ? "Prev" : "Next"}
      className={[
        "absolute top-1/2 -translate-y-1/2 z-10",
        isLeft ? "left-2" : "right-2",
        "rounded-full border border-slate-200 bg-white/95 p-2 shadow hover:bg-white"
      ].join(" ")}
    >
      <svg viewBox="0 0 24 24" className="h-5 w-5 text-slate-700" fill="none" stroke="currentColor" strokeWidth="1.8">
        {isLeft ? <path d="M15 18l-6-6 6-6" /> : <path d="M9 6l6 6-6 6" />}
      </svg>
    </button>
  );
}
