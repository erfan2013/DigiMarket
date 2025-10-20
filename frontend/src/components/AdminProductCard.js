import React, { useState } from "react";
import { toast } from "react-toastify";
import AdminEditProduct from "./AdminEditProduct";
import SummaryApi from "../common";
import resolveImageUrl from "../helper/resolveImageUrl";
import DisplayUSDCurrency from "../helper/displayCurrency";
import { LuPencil, LuTrash2 } from "react-icons/lu";
import { authHeaders } from "../common/auth";
import ProductImage from "./ui/productImage";

export default function AdminProductCard({ data, fetchdata }) {
  const [openEdit, setOpenEdit] = useState(false);
  const id = data?._id;

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

  const onEdit = () => setOpenEdit(true);

  return (
    <>
      <div className="group relative rounded-2xl p-3 hover:shadow-md transition ui-card">
        {/* Ø§Ú©Ø´Ù†â€ŒÙ‡Ø§ */}
        <div className="absolute right-3 top-3 z-10 flex gap-1">
          <button
            title="Edit"
            onClick={onEdit}
            className="rounded-full p-2 text-[var(--text-muted)] hover:bg-[var(--surface-2)] ui-card btn btn-ghost hover:bg-yellow-300"
          >
            <LuPencil className="h-4 w-4" />
          </button>
          <button
            title="Delete"
            onClick={onDelete}
            className="rounded-full p-2 text-rose-600 ui-card btn btn-ghost hover:bg-red-500"
          >
            <LuTrash2 className="h-4 w-4" />
          </button>
        </div>

        {/* ØªØµÙˆÛŒØ± */}
        <div className="w-full overflow-hidden rounded-xl bg-[var(--surface-2)]">
          <ProductImage
            src={resolveImageUrl(data?.ProductImage?.[0])}
            alt={data?.ProductName || ""}
            ratio="1:1"                  // ðŸ‘ˆ Ø§Ø±ØªÙØ§Ø¹ ÛŒÚ©Ø¯Ø³Øª
            fit="contain"                // ðŸ‘ˆ Ø¨Ø¯ÙˆÙ† Ø¨Ø±Ø´ ØªØµÙˆÛŒØ±
            bg="bg-transparent"          // Ù¾Ø³â€ŒØ²Ù…ÛŒÙ†Ù‡ Ø§Ø² ÙˆØ§Ù„Ø¯ (bg-[var(--surface-2)]) Ù…ÛŒØ§Ø¯
            className="transition-transform duration-200 group-hover:scale-105"
          />
        </div>

        {/* Ø§Ø·Ù„Ø§Ø¹Ø§Øª */}
        <div className="pt-3">
          <div className="line-clamp-1 text-sm font-medium text-[var(--text)]">
            {data?.ProductName}
          </div>
          <div className="mt-1 text-xs text-[var(--text-muted)] capitalize">
            {data?.category}
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm">
            <div className="font-semibold text-[var(--text)]">
              {DisplayUSDCurrency(data?.Selling)}
            </div>
            {data?.Price ? (
              <div className="text-[var(--text-muted)] line-through price-old">
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

