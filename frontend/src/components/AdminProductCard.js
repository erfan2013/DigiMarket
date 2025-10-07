import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common";
import resolveImageUrl from "../helper/resolveImageUrl";
import DisplayUSDCurrency from "../helper/displayCurrency";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { authHeaders } from "../common/auth";

export default function AdminProductCard({ data, fetchdata }) {
  const [openEdit, setOpenEdit] = useState(false);
  const id = data?._id;

  // -------- Delete (همون که الان درست شده؛ نگه می‌داریم) ----------
  async function tryDeleteParam() {
    const url = `${SummaryApi.deleteProduct.url}/${id}`;
    const res = await fetch(url, {
      method: SummaryApi.deleteProduct.method || "DELETE",
      credentials: "include",
      headers: { ...authHeaders() },
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `Delete failed (${res.status})`);
    }
    return json;
  }
  async function tryDeleteBody() {
    const res = await fetch(SummaryApi.deleteProduct.url, {
      method: SummaryApi.deleteProduct.method || "DELETE",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ _id: id }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `Delete failed (${res.status})`);
    }
    return json;
  }
  const onDelete = async () => {
    if (!id) return toast.error("Invalid product id");
    if (!window.confirm("Delete this product?")) return;
    try {
      try {
        await tryDeleteParam();
      } catch {
        await tryDeleteBody();
      }
      toast.success("Product deleted");
      fetchdata?.();
    } catch (e) {
      toast.error(e?.message || "Delete failed");
    }
  };

  // -------- Edit ----------
  const onEdit = () => setOpenEdit(true);

  return (
    <>
      <div className="group relative rounded-2xl border border-slate-200 bg-white p-3 hover:shadow-md transition">
        {/* اکشن‌ها: فقط یک Edit و یک Delete */}
        <div className="absolute right-3 top-3 z-10 flex gap-1">
          <button
            title="Edit"
            onClick={onEdit}
            className="rounded-full border border-slate-200 bg-white p-2 text-slate-700 hover:bg-slate-50"
          >
            <LuPencil className="h-4 w-4" />
          </button>
          <button
            title="Delete"
            onClick={onDelete}
            className="rounded-full border border-slate-200 bg-white p-2 text-rose-600 hover:bg-rose-50"
          >
            <LuTrash2 className="h-4 w-4" />
          </button>
        </div>

        {/* تصویر */}
        <div className="h-40 w-full overflow-hidden rounded-xl bg-slate-50">
          <img
            src={resolveImageUrl(data?.ProductImage?.[0])}
            alt={data?.ProductName || ""}
            className="h-full w-full object-contain mix-blend-multiply transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* اطلاعات */}
        <div className="pt-3">
          <div className="line-clamp-1 text-sm font-medium text-slate-900">
            {data?.ProductName}
          </div>
          <div className="mt-1 text-xs text-slate-500 capitalize">
            {data?.category}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="font-semibold text-slate-900">
              {DisplayUSDCurrency(data?.Selling)}
            </div>
            {data?.Price ? (
              <div className="text-slate-400 line-through">
                {DisplayUSDCurrency(data?.Price)}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      {openEdit && (
        <AdminEditProduct
          productData={data}
          onClose={() => setOpenEdit(false)}
          fetchdata={fetchdata}
        />
      )}
    </>
  );
}
