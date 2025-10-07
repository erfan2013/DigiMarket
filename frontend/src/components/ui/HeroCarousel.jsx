import React, { useEffect, useRef, useState } from "react";

export default function HeroCarousel({
  slides = [],        // [{src,title,subtitle}]
  autoPlay = true,
  interval = 5000,
  className = "",
}) {
  const [idx, setIdx] = useState(0);
  const timer = useRef(null);
  const safeSlides = Array.isArray(slides) ? slides.filter(Boolean) : [];

  const next = React.useCallback(
    () => setIdx(i => (i + 1) % Math.max(safeSlides.length, 1)),
    [safeSlides.length]
  );
  const prev = () => setIdx(i => (i - 1 + Math.max(safeSlides.length, 1)) % Math.max(safeSlides.length, 1));

  useEffect(() => {
    if (!autoPlay || safeSlides.length < 2) return;
    clearInterval(timer.current);
    timer.current = setInterval(next, interval);
    return () => clearInterval(timer.current);
  }, [autoPlay, interval, safeSlides.length, next]);

  return (
    <div className={["relative mx-auto max-w-7xl px-4", className].join(" ")}>
      <div className="relative overflow-hidden rounded-2xl bg-slate-900/5">
        {/* Track */}
        <div
          className="flex transition-transform duration-500"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {(safeSlides.length ? safeSlides : [null, null, null]).map((s, i) => (
            <Slide key={i} slide={s} />
          ))}
        </div>

        {/* Arrows */}
        {safeSlides.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
              aria-label="Previous"
            >
              <span className="block h-4 w-4 rotate-180 border-r-2 border-t-2 border-slate-700" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white"
              aria-label="Next"
            >
              <span className="block h-4 w-4 border-r-2 border-t-2 border-slate-700" />
            </button>
          </>
        )}

        {/* Dots */}
        {safeSlides.length > 1 && (
          <div className="absolute bottom-3 left-0 right-0 flex items-center justify-center gap-2">
            {safeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                className={[
                  "h-2.5 w-2.5 rounded-full transition",
                  i === idx ? "bg-white shadow" : "bg-white/60 hover:bg-white",
                ].join(" ")}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Slide({ slide }) {
  if (!slide?.src) {
    // حالت بدون تصویر: گرادیِنت تمیز
    return (
      <div className="min-h-[320px] w-full flex-shrink-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-700 text-white grid md:grid-cols-2">
        <div className="p-10 md:p-14 flex flex-col justify-center">
          <div className="text-2xl md:text-4xl font-semibold">Welcome to DigiMarket</div>
          <div className="mt-2 text-slate-200">Best tech deals • Fast delivery • Secure checkout</div>
        </div>
        <div className="hidden md:block" />
      </div>
    );
  }
  return (
    <div className="min-h-[320px] w-full flex-shrink-0 grid md:grid-cols-2 bg-white">
      <div className="p-8 md:p-14 flex flex-col justify-center">
        <div className="text-2xl md:text-4xl font-semibold text-slate-900">{slide.title}</div>
        <div className="mt-2 text-slate-600">{slide.subtitle}</div>
      </div>
      <div className="relative">
        <img
          src={slide.src}
          alt={slide.title || "Slide"}
          className="h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
