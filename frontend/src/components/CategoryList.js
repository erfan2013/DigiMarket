// src/components/CategoryList.js
import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import resolveImageUrl from '../helper/resolveImageUrl';
import ProductImage from './ui/productImage';

const CategoryList = () => {
  const [categoryProduct, setCategoriesProduct] = useState([])
  const [Loading, setLoading] = useState(false)

  const categoryLoading = new Array(13).fill(null)

  const fetchCategoryProducts = async () => {
    setLoading(true)
    const response = await fetch(SummaryApi.categoryProduct.url);
    const dataResponse = await response.json();
    setLoading(false)
    setCategoriesProduct(Array.isArray(dataResponse?.data) ? dataResponse.data : []);
  }

  useEffect(() => { fetchCategoryProducts() }, [])

  return (
    <div className="container mx-auto p-5">
      <div className="flex items-center gap-4 justify-between overflow-x-auto scrollbar-none">
        {Loading ? (
          categoryLoading.map((_, index) => (
            <div
              key={'category-loading-' + index}
              className="h-16 w-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-[#E9EEF6] ring-1 ring-[#D5DEE8] animate-pulse"
            />
          ))
        ) : (
          (categoryProduct || []).map((product) => (
            <Link
              to={'/product-category?category=' + product?.category}
              className="cursor-pointer"
              key={product?.category}
            >
              <div className="w-16 md:w-20 h-20 rounded-lg overflow-hidden p-4 bg-[#E9EEF6] ring-1 ring-[#D5DEE8] flex items-center justify-center transition-transform duration-200 hover:scale-105">
                <ProductImage
                  src={resolveImageUrl(product?.ProductImage?.[0])}
                  alt={product?.category || ''}
                  ratio="1:1"
                  fit="contain"
                  bg="bg-transparent"
                />
              </div>
              <p className="text-center text-sm md:text-base capitalize mt-1">
                {product?.category}
              </p>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryList






// import React, { useEffect, useState } from 'react'
// import SummaryApi from '../common';
// import { Link } from 'react-router-dom';
// import resolveImageUrl from '../helper/resolveImageUrl';
// import ProductImage from './ui/productImage';

// const CategoryList = () => {
//   const [categoryProduct, setCategoriesProduct] = useState([])
//   const [Loading, setLoading] = useState(false)

//   const categoryLoading = new Array(13).fill(null)

//   const fetchCategoryProducts = async () => {
//     setLoading(true)
//     const response = await fetch(SummaryApi.categoryProduct.url);
//     const dataResponse = await response.json();
//     setLoading(false)
//     setCategoriesProduct(Array.isArray(dataResponse?.data) ? dataResponse.data : []);
//     console.log("response", dataResponse)
//   }

//   useEffect(() => {
//     fetchCategoryProducts()
//   }, [])

//   return (
//     <div className='container mx-auto p-5'>
//       <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
//         {
//           Loading ? (
//             categoryLoading.map((_, index) => (
//               <div
//                 key={'category-loading-' + index}
//                 className='h-16 w-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-[var(--surface-2)] animate-pulse'
//               />
//             ))
//           ) : (
//             (categoryProduct || []).map((product) => (
//               <Link
//                 to={'/product-category?category=' + product?.category}
//                 className='cursor-pointer'
//                 key={product?.category}
//               >
//                 {/* ظرف بیرونی مثل قبل می‌مونه؛ فقط محتواش ProductImage استاندارد می‌شه */}
//                 <div className='w-16 md:w-20 h-20 rounded-lg overflow-hidden p-4 bg-[var(--surface-2)] flex items-center justify-center'>
//                   <ProductImage
//                     src={resolveImageUrl(product?.ProductImage?.[0])}
//                     alt={product?.category || ''}
//                     ratio="1:1"            // مربع استاندارد برای آیکن دسته‌بندی
//                     fit="contain"          // تصویر بدون برش داخل کادر
//                     bg="bg-transparent"    // پس‌زمینهٔ خاکستریِ والد دیده بشه
//                     className="transition-transform hover:scale-110"
//                   />
//                 </div>
//                 <p className='text-center text-sm md:text-base capitalize'>
//                   {product?.category}
//                 </p>
//               </Link>
//             ))
//           )
//         }
//       </div>
//     </div>
//   )
// }

// export default CategoryList
