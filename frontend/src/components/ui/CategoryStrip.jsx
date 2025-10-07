import React, { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

/**
 * items:  [{ label: "Mobiles", value: "mobile", image?: "url (اختیاری)" }, ...]
 * onSelect?: (value) => void   (اختیاری؛ اگر ندی خودش به روت /product-category می‌بره)
 */
export default function CategoryStrip({ items = [], onSelect }) {
  const scroller = useRef(null);
  const navigate = useNavigate();
  const { search } = useLocation();
  const active = new URLSearchParams(search).get("category") || "";

  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const updateArrows = () => {
    const el = scroller.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft < max - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scroller.current;
    if (!el) return;
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);
    return () => {
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const scrollBy = (dir = 1) => {
    const el = scroller.current;
    if (!el) return;
    const amount = Math.max(260, el.clientWidth - 120);
    el.scrollBy({ left: dir * amount, behavior: "smooth" });
  };

  const handleClick = (cat) => {
    if (onSelect) return onSelect(cat);
    navigate(`/product-category?category=${encodeURIComponent(cat)}`);
  };

  return (
    <div className="relative mx-auto max-w-7xl px-4">
      {/* سایه‌های لبه برای حس اسکرول */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent" />

      {/* دکمه‌های چپ/راست */}
      <button
        aria-label="scroll left"
        onClick={() => scrollBy(-1)}
        className={[
          "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-sm",
          "transition disabled:opacity-40 disabled:cursor-not-allowed",
        ].join(" ")}
        disabled={!canLeft}
      >
        <LuChevronLeft className="h-5 w-5 text-slate-700" />
      </button>

      <button
        aria-label="scroll right"
        onClick={() => scrollBy(1)}
        className={[
          "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-slate-200 bg-white p-2 shadow-sm",
          "transition disabled:opacity-40 disabled:cursor-not-allowed",
        ].join(" ")}
        disabled={!canRight}
      >
        <LuChevronRight className="h-5 w-5 text-slate-700" />
      </button>

      {/* لیست افقی */}
      <div
        ref={scroller}
        className="no-scrollbar flex gap-3 overflow-x-auto scroll-smooth py-3"
      >
        {items.map((c) => {
          const isActive = active.toLowerCase() === String(c.value || "").toLowerCase();

          return (
            <button
              key={c.value}
              onClick={() => handleClick(c.value)}
              className={[
                "group flex shrink-0 items-center gap-3 rounded-2xl border px-3 py-2",
                "transition hover:border-slate-300 hover:bg-slate-50",
                isActive
                  ? "border-slate-900 bg-slate-900 text-white"
                  : "border-slate-200 bg-white text-slate-700",
              ].join(" ")}
              title={c.label}
            >
              {/* آواتار/آیکن اختیاری */}
              <span className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                {c.image ? (
                  <img
                    src={c.image}
                    alt=""
                    className="h-full w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className={isActive ? "text-white" : "text-slate-600"}>
                    {String(c.label || "?").charAt(0)}
                  </span>
                )}
              </span>

              <span className="whitespace-nowrap text-sm font-medium">
                {c.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

