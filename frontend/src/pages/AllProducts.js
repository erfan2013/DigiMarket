import React, { useEffect, useMemo, useState } from "react";
import UploadProdoct from "../components/UploadProdoct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";

export default function AllProducts() {
  const [openUpload, setOpenUpload] = useState(false);
  const [all, setAll] = useState([]);
  const [loading, setLoading] = useState(false);
  const [q, setQ] = useState("");

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const res = await fetch(SummaryApi.allProduct.url, { cache: "no-store" });
      const json = await res.json();
      setAll(Array.isArray(json?.data) ? json.data : []);
    } catch (e) {
      console.error(e);
      setAll([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // فیلتر سریع سمت کلاینت
  const filtered = useMemo(() => {
    if (!q.trim()) return all;
    const s = q.toLowerCase();
    return all.filter(
      (p) =>
        p?.ProductName?.toLowerCase().includes(s) ||
        p?.BrandName?.toLowerCase().includes(s) ||
        p?.category?.toLowerCase().includes(s)
    );
  }, [all, q]);

  return (
    <div className="p-4">
      {/* هدر و اکشن‌ها */}
      <div className="rounded-2xl p-3 md:p-4 shadow-sm bg-[#EDF3FA] dark:bg-[#EDF3FA] border border-[#C6D6E6]">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-semibold">All Products</div>

          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative">
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search by name / brand / category…"
                className="w-full sm:w-72 rounded-xl border border-[var(--surface-border)] bg-[var(--surface)] px-3 py-2 text-sm outline-none focus:border-[var(--surface-border)] focus:ring-2 focus:ring-slate-200"
              />
              <svg
                viewBox="0 0 24 24"
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-3.5-3.5" />
              </svg>
            </div>

            <button
              onClick={() => setOpenUpload(true)}
              className="rounded-xl bg-[var(--surface-2)] px-4 py-2 text-sm font-medium text-white hover:bg-[var(--surface-2)]"
            >
              Upload product
            </button>
          </div>
        </div>
      </div>

      {/* گرید محصولات */}
      <div className="mt-4">
        {loading ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {filtered.map((p) => (
              <AdminProductCard key={p?._id} data={p} fetchdata={fetchProducts} />
            ))}
            {!filtered.length && (
              <div className="col-span-full rounded-2xl p-6 text-center text-[var(--text-muted)] ui-card">
                No product found.
              </div>
            )}
          </div>
        )}
      </div>

      {openUpload && (
        <UploadProdoct onClose={() => setOpenUpload(false)} fetchData={fetchProducts} />
      )}
    </div>
  );
}

function SkeletonCard() {
  return (
    <div className="rounded-2xl p-3 ui-card">
      <div className="h-40 w-full rounded-xl bg-[var(--surface-2)] animate-pulse" />
      <div className="mt-3 h-4 w-3/4 rounded bg-[var(--surface-2)] animate-pulse" />
      <div className="mt-2 h-3 w-1/2 rounded bg-[var(--surface-2)] animate-pulse" />
      <div className="mt-3 h-8 w-full rounded-lg bg-[var(--surface-2)] animate-pulse" />
    </div>
  );
}
