import React, { useState } from 'react'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import AdminEditProduct from './AdminEditProduct';
import DisplayUSDCurrency from '../helper/displayCurrency';
import { toast } from 'react-toastify';
import SummaryApi from '../common';
import { authHeaders } from '../common/auth';
import resolveImageUrl from '../helper/resolveImageUrl';

const AdminProductCard = ({ data, fetchdata }) => {
  const [editProduct, setEditProduct] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const onDelete = async () => {
    if (!window.confirm("Delete this product?")) return;
    setIsDeleting(true);
    try {
      // از SummaryApi یک origin مطمئن برای بک‌اند دربیار؛ fallback هم برای لوکال
      const API_BASE = (() => {
        try {
          const u = new URL(SummaryApi?.SignUp?.url);  // مثلا http://localhost:8080/api/signup
          return `${u.origin}/api`;                    // → http://localhost:8080/api
        } catch {
          const base = process.env.REACT_APP_BASE_URL || "http://localhost:8080";
          return `${base}/api`;
        }
      })();

      const res = await fetch(`${API_BASE}/product/${data?._id}`, {
        method: "DELETE",
        credentials: "include",
        headers: { ...authHeaders() },
      });

      const json = await res.json().catch(() => ({}));
      if (res.ok && json?.success) {
        toast.success("Product deleted");
        fetchdata && fetchdata(); // لیست را تازه کن
      } else {
        toast.error(json?.message || `Delete failed (${res.status})`);
      }
    } catch (e) {
      toast.error(e.message || "Network error");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className='bg-white p-4 rounded'>
      <div className='w-44'>
        <div className='h-32 flex items-center justify-center'>
          <img
            src={resolveImageUrl(data?.ProductImage?.[0])}
            alt={data?.ProductName || "product"}
            width={120}
            height={120}
            className='mx-auto border-b object-fill h-full'
          />
        </div>

        <h1 className='text-ellipsis line-clamp-2'>{data?.ProductName}</h1>

        <div className='flex items-center justify-between mt-2'>
          <p>{DisplayUSDCurrency(data?.Price)}</p>

          <div className='flex items-center gap-2'>
            <button
              className='px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700'
              onClick={() => setEditProduct(true)}
              title="Edit"
            >
              <AiFillEdit />
            </button>

            <button
              className='px-3 py-1 rounded bg-red-600 text-white hover:bg-red-700 disabled:opacity-50'
              onClick={onDelete}
              disabled={isDeleting}
              title="Delete"
            >
              <AiFillDelete />
            </button>
          </div>
        </div>
      </div>

      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchdata={fetchdata}
        />
      )}
    </div>
  );
};

export default AdminProductCard;









// import React, { useState } from 'react'
// import { AiFillEdit } from "react-icons/ai";
// import AdminEditProduct from './AdminEditProduct';
// import DisplayUSDCurrency from '../helper/displayCurrency';

// const AdminProductCard = ({
//     data,
//     fetchdata
// }) => {
//     const [editProduct , setEditProduct] = useState(false)
//   return (

//       <div className='bg-white p-4 rounded'>
//                 <div className='w-44'>
//                     <div className=' h-32 flex items-center justify-center'>
//                     <img src={data?.ProductImage[0]} alt="" width={120} height={120} className='mx-auto border-b object-fill h-full' />
//                     </div>
//                 <h1 className='text-ellipsis line-clamp-2'>{data?.ProductName}</h1>
//                 <div>

//                     <p>
//                         {    
//                             DisplayUSDCurrency(data.Price)
//                         }
//                     </p>

//                 <div className='w-fit ml-auto p-2 bg-green-400 rounded-lg text-white cursor-pointer hover:bg-green-600' onClick={()=>setEditProduct(true)}>
//                 <AiFillEdit />
                
//                 </div>


//                 </div>

                
//                 </div>

//                 {
//                     editProduct && (
//                         <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata} />
//                     )
//                 }
//               </div>

   
//   )
// }

// export default AdminProductCard
