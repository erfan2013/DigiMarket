// frontend/src/components/admin/AdminHomeSlider.js
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import SummaryApi from "../common"; // ✅ مسیر درست

export default function AdminHomeSlider() {
  const [images, setImages] = useState([]);
  const [files, setFiles] = useState([]);
  const user = useSelector((s) => s?.user?.user); // اگر نمی‌خوای استفاده کنی، حذفش کن

  // لیست اسلایدرها را از پابلیک می‌گیریم (ساده و کافی)
  const load = async () => {
    try {
      const res = await fetch(SummaryApi.sliderPublic.url, {
        method: SummaryApi.sliderPublic.method, // GET
        credentials: "include",
      });
      const data = await res.json();
      setImages(Array.isArray(data.images) ? data.images : []);
    } catch (err) {
      console.error("load slider error:", err);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const upload = async (e) => {
    e.preventDefault();
    const list = Array.from(files || []); // ✅ FileList → Array
    if (!list.length) return;

    const fd = new FormData();
    list.forEach((f) => fd.append("images", f));

    try {
      const res = await fetch(SummaryApi.sliderAdminUpload.url, {
        method: SummaryApi.sliderAdminUpload.method, // POST
        body: fd,
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Upload failed");
      }
      setFiles([]);
      await load();
    } catch (err) {
      console.error("upload error:", err);
    }
  };

  const saveOrder = async () => {
    try {
      const orders = images.map((it, idx) => ({
        publicId: it.publicId,
        order: idx,
      }));

      const res = await fetch(SummaryApi.sliderAdminReorder.url, {
        method: SummaryApi.sliderAdminReorder.method, // PATCH
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orders }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Reorder failed");
      }
      await load();
    } catch (err) {
      console.error("reorder error:", err);
    }
  };

  const toggleActive = async (val) => {
    try {
      const res = await fetch(SummaryApi.sliderAdminReorder.url, {
        method: SummaryApi.sliderAdminReorder.method, // PATCH
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: val }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Toggle failed");
      }
      await load();
    } catch (err) {
      console.error("toggleActive error:", err);
    }
  };

  const remove = async (publicId) => {
    try {
      // اگر در SummaryApi برای حذف نیاز به /:publicId نیست، این را تغییر بده
      const url = `${SummaryApi.sliderAdminRemove.url}/${encodeURIComponent(publicId)}`;
      const res = await fetch(url, {
        method: SummaryApi.sliderAdminRemove.method, // DELETE
        credentials: "include",
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err?.message || "Delete failed");
      }
      await load();
    } catch (err) {
      console.error("remove error:", err);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold">Home Slider</h2>

      <form onSubmit={upload} className="space-y-2">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => setFiles(e.target.files)}
        />
        <button className="px-3 py-2 rounded bg-blue-600 text-white">Upload</button>
      </form>

      <div className="flex items-center gap-3">
        <button
          onClick={() => toggleActive(true)}
          className="px-3 py-2 rounded bg-green-600 text-white"
        >
          Activate
        </button>
        <button
          onClick={() => toggleActive(false)}
          className="px-3 py-2 rounded bg-gray-600 text-white"
        >
          Deactivate
        </button>
        <button
          onClick={saveOrder}
          className="px-3 py-2 rounded bg-indigo-600 text-white"
        >
          Save Order
        </button>
      </div>

      <ul className="space-y-3">
        {images.map((img, idx) => (
          <li key={img.publicId} className="flex items-center gap-3">
            <span className="w-8 text-center">{idx + 1}</span>
            <img
              src={img.url}
              alt=""
              className="w-28 h-16 object-cover rounded"
            />
            <button
              onClick={() => {
                if (idx === 0) return;
                const copy = [...images];
                [copy[idx - 1], copy[idx]] = [copy[idx], copy[idx - 1]];
                setImages(copy);
              }}
              className="px-2 py-1 border rounded"
            >
              ↑
            </button>
            <button
              onClick={() => {
                if (idx === images.length - 1) return;
                const copy = [...images];
                [copy[idx + 1], copy[idx]] = [copy[idx], copy[idx + 1]];
                setImages(copy);
              }}
              className="px-2 py-1 border rounded"
            >
              ↓
            </button>
            <button
              onClick={() => remove(img.publicId)}
              className="ml-auto px-3 py-1 bg-red-600 text-white rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}




// // frontend/src/components/admin/AdminHomeSlider.js
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import SummaryApi from "../../src/common";

// export default function AdminHomeSlider() {
//   const [images, setImages] = useState([]);
//   const [files, setFiles] = useState([]);
//   const user = useSelector(s => s?.user?.user);

//   const base = process.env.REACT_APP_BACKEND_URL || "";

//   const load = async () => {
//     const res = await fetch(SummaryApi.sliderAdminList.url, {
//       method: SummaryApi.sliderAdminList.method,
//       credentials: "include",
//       headers: {
//         "Content-Type": "application/json",
//         // اگر توکن می‌فرستی اینجا بگذار
//       },
//     });
//     const data = await res.json();
//     setImages(Array.isArray(data.images) ? data.images : []);
//   };

//   useEffect(()=>{ load(); }, []);

//   const upload = async (e) => {
//     e.preventDefault();
//     if (!files.length) return;
//     const fd = new FormData();
//     [...files].forEach(f => fd.append("images", f));
//     await fetch(`${base}/api/admin/slider`, {
//       method:"POST",
//       body: fd,
//       credentials:"include",
//       headers: { /* اگر توکن می‌فرستی اینجا بگذار */ }
//     });
//     setFiles([]);
//     await load();
//   };

//   const saveOrder = async () => {
//     const orders = images.map((it, idx) => ({ publicId: it.publicId, order: idx }));
//     await fetch(`${base}/api/admin/slider`, {
//       method:"PATCH",
//       credentials:"include",
//       headers: { "Content-Type":"application/json" },
//       body: JSON.stringify({ orders })
//     });
//     await load();
//   };

//   const toggleActive = async (val) => {
//     await fetch(`${base}/api/admin/slider`, {
//       method:"PATCH",
//       credentials:"include",
//       headers: { "Content-Type":"application/json" },
//       body: JSON.stringify({ isActive: val })
//     });
//     await load();
//   }

//   const remove = async (publicId) => {
//     await fetch(`${base}/api/admin/slider/${publicId}`, {
//       method:"DELETE",
//       credentials:"include"
//     });
//     await load();
//   };

//   return (
//     <div className="space-y-6">
//       <h2 className="text-xl font-bold">Home Slider</h2>

//       <form onSubmit={upload} className="space-y-2">
//         <input type="file" accept="image/*" multiple onChange={e=>setFiles(e.target.files)} />
//         <button className="px-3 py-2 rounded bg-blue-600 text-white">Upload</button>
//       </form>

//       <div className="flex items-center gap-3">
//         <button onClick={()=>toggleActive(true)}  className="px-3 py-2 rounded bg-green-600 text-white">Activate</button>
//         <button onClick={()=>toggleActive(false)} className="px-3 py-2 rounded bg-gray-600 text-white">Deactivate</button>
//         <button onClick={saveOrder} className="px-3 py-2 rounded bg-indigo-600 text-white">Save Order</button>
//       </div>

//       <ul className="space-y-3">
//         {images.map((img, idx) => (
//           <li key={img.publicId} className="flex items-center gap-3">
//             <span className="w-8 text-center">{idx+1}</span>
//             <img src={img.url} alt="" className="w-28 h-16 object-cover rounded" />
//             <button onClick={()=>{
//               // جابجایی ساده بالا/پایین
//               if (idx===0) return;
//               const copy = [...images];
//               [copy[idx-1], copy[idx]] = [copy[idx], copy[idx-1]];
//               setImages(copy);
//             }} className="px-2 py-1 border rounded">↑</button>
//             <button onClick={()=>{
//               if (idx===images.length-1) return;
//               const copy = [...images];
//               [copy[idx+1], copy[idx]] = [copy[idx], copy[idx+1]];
//               setImages(copy);
//             }} className="px-2 py-1 border rounded">↓</button>
//             <button onClick={()=>remove(img.publicId)} className="ml-auto px-3 py-1 bg-red-600 text-white rounded">Delete</button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
