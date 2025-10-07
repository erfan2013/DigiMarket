// src/components/AdminEditProduct.js
import React, { useEffect, useMemo, useState } from "react";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { authHeaders } from "../common/auth";

export default function AdminEditProduct({ productData, onClose, fetchdata }) {
  const original = useMemo(() => productData || {}, [productData]);
  const [saving, setSaving] = useState(false);

  // فرم ساده
  const [form, setForm] = useState({
    ProductName: "",
    BrandName: "",
    category: "",
    Selling: "",
    Price: "",
    Description: "",
  });

  // عکس‌های موجود که می‌خوای نگه‌داری
  const [keptUrls, setKeptUrls] = useState([]);
  // فایل‌های جدیدی که کاربر انتخاب می‌کنه
  const [newFiles, setNewFiles] = useState([]);
  const [previews, setPreviews] = useState([]);

  useEffect(() => {
    setForm({
      ProductName: original?.ProductName || "",
      BrandName: original?.BrandName || "",
      category: original?.category || "",
      Selling: original?.Selling ?? "",
      Price: original?.Price ?? "",
      Description: original?.Description || "",
    });
    setKeptUrls(Array.isArray(original?.ProductImage) ? [...original.ProductImage] : []);
    // پاکسازی پیش‌نمایش‌ها در آن‌ماونت
    return () => previews.forEach((u) => URL.revokeObjectURL(u));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [original]);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  // انتخاب فایل‌های جدید
  const onPickFiles = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setNewFiles((curr) => [...curr, ...files]);
    const pv = files.map((f) => URL.createObjectURL(f));
    setPreviews((curr) => [...curr, ...pv]);
  };

  // حذف یکی از فایل‌های جدید
  const removeNewFile = (idx) => {
    setNewFiles((curr) => curr.filter((_, i) => i !== idx));
    setPreviews((curr) => {
      const url = curr[idx];
      URL.revokeObjectURL(url);
      return curr.filter((_, i) => i !== idx);
    });
  };

  // حذف یکی از URLهای قدیمی
  const removeKeptUrl = (idx) => {
    setKeptUrls((curr) => curr.filter((_, i) => i !== idx));
  };

  // آپلود فایل‌های جدید به /api/upload/images
  const uploadSelectedFiles = async () => {
    if (!newFiles.length) return [];
    const fd = new FormData();
    // نکته: اسم فیلد باید دقیقا "images" باشه
    newFiles.forEach((f) => fd.append("images", f));

    const res = await fetch(SummaryApi.uploadImages.url, {
      method: SummaryApi.uploadImages.method, // "POST"
      credentials: "include",
      body: fd, // هدر Content-Type نذار
    });

    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `Upload failed (${res.status})`);
    }
    // انتظار: { success: true, urls: [ ... ] }
    return json.urls || [];
  };

  // تلاش برای PATCH /api/product/:id
  async function tryUpdateParam(id, payload) {
    const url = `${SummaryApi.updateProductById.url}/${id}`; // مثلا /api/product/:id
    const res = await fetch(url, {
      method: SummaryApi.updateProductById.method || "PATCH",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify(payload),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `Update failed (${res.status})`);
    }
    return json;
  }

  // فُلبک: POST /api/update-product  (بدنه شامل _id)
  async function tryUpdateBody(id, payload) {
    const res = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method || "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json", ...authHeaders() },
      body: JSON.stringify({ _id: id, ...payload }),
    });
    const json = await res.json().catch(() => ({}));
    if (!res.ok || !json?.success) {
      throw new Error(json?.message || `Update failed (${res.status})`);
    }
    return json;
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!original?._id) return toast.error("Invalid product id");

    try {
      setSaving(true);

      // 1) اگر فایل جدید داریم، اول آپلود کن
      let uploaded = [];
      if (newFiles.length) {
        uploaded = await uploadSelectedFiles(); // ← Cloudinary باید صحیح کانفیگ شده باشد
      }

      // 2) مجموعه نهایی عکس‌ها (قدیمی‌هایی که نگه داشتی + جدیدها)
      const finalImages = [...keptUrls, ...uploaded];

      // 3) ساخت payload
      const payload = {
        ProductName: form.ProductName.trim(),
        BrandName: form.BrandName.trim(),
        category: form.category.trim(),
        Selling: Number(form.Selling) || 0,
        Price: Number(form.Price) || 0,
        Description: form.Description,
        ProductImage: finalImages, // ⭐️ کلید درست: ProductImage (آرایه URL)
      };

      // 4) آپدیت
      try {
        await tryUpdateParam(original._id, payload);
      } catch {
        await tryUpdateBody(original._id, payload);
      }

      toast.success("Product updated");

      // پاک‌سازی فایل‌های جدید (پیش‌نمایش‌ها رو هم آزاد کن)
      previews.forEach((u) => URL.revokeObjectURL(u));
      setNewFiles([]);
      setPreviews([]);

      fetchdata?.();
      onClose?.();
    } catch (e1) {
      toast.error(e1?.message || "Update failed");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-2xl rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-200 p-4">
          <h3 className="text-lg font-semibold">Edit product</h3>
          <button
            onClick={onClose}
            className="rounded-lg border border-slate-200 px-3 py-1 text-sm hover:bg-slate-50"
          >
            Close
          </button>
        </div>

        {/* Body */}
        <form onSubmit={onSubmit} className="grid gap-4 p-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Product name</span>
              <input
                name="ProductName"
                value={form.ProductName}
                onChange={onChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Brand</span>
              <input
                name="BrandName"
                value={form.BrandName}
                onChange={onChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Category</span>
              <input
                name="category"
                value={form.category}
                onChange={onChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Selling price</span>
              <input
                type="number"
                min="0"
                name="Selling"
                value={form.Selling}
                onChange={onChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-1">
              <span className="text-sm text-slate-700">Original price</span>
              <input
                type="number"
                min="0"
                name="Price"
                value={form.Price}
                onChange={onChange}
                className="rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>

            <label className="grid gap-1 md:col-span-2">
              <span className="text-sm text-slate-700">Description</span>
              <textarea
                name="Description"
                value={form.Description}
                onChange={onChange}
                rows={3}
                className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
              />
            </label>
          </div>

          {/* تصاویر قبلی (kept) */}
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 text-sm font-medium text-slate-700">Current images</div>
            {keptUrls.length === 0 && (
              <div className="text-xs text-slate-500">No images kept.</div>
            )}
            <div className="flex flex-wrap gap-3">
              {keptUrls.map((u, idx) => (
                <div key={idx} className="relative">
                  <img
                    src={u}
                    alt=""
                    className="h-20 w-20 rounded-lg object-cover border border-slate-200"
                  />
                  <button
                    type="button"
                    onClick={() => removeKeptUrl(idx)}
                    className="absolute -right-2 -top-2 rounded-full bg-white border border-slate-200 px-2 py-0.5 text-xs text-rose-600 shadow-sm hover:bg-rose-50"
                    title="Remove"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* انتخاب فایل‌های جدید */}
          <div className="rounded-xl border border-slate-200 p-3">
            <div className="mb-2 text-sm font-medium text-slate-700">Add new images</div>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={onPickFiles}
              className="block w-full text-sm file:mr-3 file:rounded-lg file:border file:border-slate-300 file:bg-white file:px-3 file:py-2 file:text-sm file:hover:bg-slate-50"
            />
            {previews.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-3">
                {previews.map((p, idx) => (
                  <div key={p} className="relative">
                    <img
                      src={p}
                      alt=""
                      className="h-20 w-20 rounded-lg object-cover border border-slate-200"
                    />
                    <button
                      type="button"
                      onClick={() => removeNewFile(idx)}
                      className="absolute -right-2 -top-2 rounded-full bg-white border border-slate-200 px-2 py-0.5 text-xs text-rose-600 shadow-sm hover:bg-rose-50"
                      title="Remove"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* اکشن‌ها */}
          <div className="flex items-center justify-end gap-2 pt-2 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-200 px-4 py-2 text-sm hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800 disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
