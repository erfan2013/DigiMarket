import React, { useContext, useEffect, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import DisplayUSDCurrency from '../helper/displayCurrency'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'
import scrollToTop from '../helper/ScrolTop'
import resolveImageUrl from '../helper/resolveImageUrl'
import ProductImage from "./ui/productImage";

const CategoryWiseProductDisplay = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(12).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    const ok = await addToCart(e, id)
    if (ok) fetchUserAddToCart?.()
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const categoryProduct = await fetchCategoryWiseProduct(category)
      setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : [])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category])

  return (
    <div className="container mx-auto px-4 mt-10 my-6">
      <h2 className="text-2xl font-semibold py-4 section-title">{heading}</h2>

      <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {loading ? (
          loadingList.map((_, i) => (
            <div
              key={i}
              className="rounded-2xl bg-[var(--surface)] p-3 ring-1 ring-slate-200 shadow-sm"
            >
              <div className="rounded-xl bg-[var(--surface-2)] overflow-hidden">
                <div className="w-full" style={{ paddingTop: '100%' }} />
              </div>
              <div className="mt-3 space-y-2">
                <div className="h-4 w-3/4 bg-[var(--surface-2)] rounded animate-pulse" />
                <div className="h-3 w-1/2 bg-[var(--surface-2)] rounded animate-pulse" />
                <div className="h-4 w-1/3 bg-[var(--surface-2)] rounded animate-pulse" />
              </div>
            </div>
          ))
        ) : (
          (data || []).map((p) => (
            <Link
              key={p?._id}
              to={`/product/${p?._id}`}
              onClick={scrollToTop}
              className={[
                "group rounded-2xl bg-[var(--surface)] p-3 ring-1 ring-slate-200 shadow-sm",
                "transition-transform duration-200 ease-out hover:scale-[1.02] hover:shadow-lg"
              ].join(" ")}
            >
              <div className="rounded-xl bg-[var(--surface-2)] overflow-hidden">
                <ProductImage
                  src={resolveImageUrl(p?.ProductImage?.[0])}
                  alt={p?.ProductName || p?.category || ""}
                  ratio="1:1"
                  fit="contain"
                />
              </div>

              <div className="mt-3">
                <h3 className="text-sm md:text-base font-medium text-[var(--text)] line-clamp-1">
                  {p?.ProductName}
                </h3>
                <p className="text-xs md:text-sm text-[var(--text-muted)] capitalize">
                  {p?.category}
                </p>

                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-sm md:text-base font-semibold text-[var(--text)]">
                    {DisplayUSDCurrency(p?.Selling)}
                  </span>
                  {!!p?.Price && Number(p?.Price) > Number(p?.Selling) && (
                    <span className="text-xs text-[var(--text-muted)] line-through price-old">
                      {DisplayUSDCurrency(p?.Price)}
                    </span>
                  )}
                </div>

                <button
                  className="mt-3 w-full rounded-lg px-3 py-2 text-sm font-medium text-white transition-transform duration-200 ease-out hover:scale-[1.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 btn btn-ghost"
                  onClick={(e) => handleAddToCart(e, p?._id)}
                >
                  Add to cart
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay

// import React, { useContext, useEffect, useState } from 'react'
// import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
// import DisplayUSDCurrency from '../helper/displayCurrency'
// import { Link } from 'react-router-dom'
// import addToCart from '../helper/addToCart'
// import Context from '../context'
// import scrollToTop from '../helper/ScrolTop'
// import resolveImageUrl from '../helper/resolveImageUrl'
// import ProductImage from "./ui/productImage";

// const CategoryWiseProductDisplay = ({ category, heading }) => {
//   const [data, setData] = useState([])
//   const [loading, setLoading] = useState(false)
//   const loadingList = new Array(13).fill(null)
//   const { fetchUserAddToCart } = useContext(Context)

//   const handleAddToCart = async (e, id) => {
//     e.preventDefault()
//     await addToCart(e, id)
//     fetchUserAddToCart()
//   }

//   const fetchData = async () => {
//     setLoading(true)
//     const categoryProduct = await fetchCategoryWiseProduct(category)
//     setLoading(false)
//     setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : [])
//   }

//   useEffect(() => {
//     fetchData()
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [])

//   return (
//     <div className="container mx-auto px-4 mt-10 my-6 relative">
//       <h2 className="text-2xl font-semibold py-4 section-title">{heading}</h2>

//       <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
//         {loading ? (
//           loadingList.map((_, index) => (
//             <div
//               key={index}
//               className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-[var(--surface)] rounded-lg shadow"
//             >
//               {/* Ø§Ø³Ú©Ù„Øª ØªØµÙˆÛŒØ± Ø¨Ø§ Ù†Ø³Ø¨Øª Ø«Ø§Ø¨Øª 1:1 */}
//               <div className="p-4">
//                 <div className="relative w-full overflow-hidden rounded-xl bg-[var(--surface-2)]">
//                   <div style={{ paddingTop: '100%' }} className="animate-pulse" />
//                 </div>
//               </div>

//               <div className="p-4 mx-auto gap-3">
//                 <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-[var(--text)] p-1 animate-pulse rounded-full py-2 section-title" aria-busy="true">
//                   Loading product name...
//                 </h2>
//                 <p className="capitalize text-[var(--text-muted)] p-1 animate-pulse rounded-full py-2"></p>
//                 <div className="flex gap-3">
//                   <p className="text-blue-700 font-medium p-1 animate-pulse rounded-full py-2"></p>
//                   <p className="text-[var(--text-muted)] line-through p-1 animate-pulse rounded-full py-2 price-old"></p>
//                 </div>
//                 <div className="flex justify-center">
//                   <button className="p-1 animate-pulse mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center btn btn-ghost"></button>
//                 </div>
//               </div>
//             </div>
//           ))
//         ) : (
//           (data || []).map((product) => (
//             <Link
//               key={product?._id}
//               to={'/product/' + product?._id}
//               className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-[var(--surface)] rounded-lg shadow"
//               onClick={scrollToTop}
//             >
//               {/* ÙÙ‚Ø· paddingØ› Ø§Ø±ØªÙØ§Ø¹ Ø«Ø§Ø¨Øª Ø¨Ù‡ ÙˆØ§Ù„Ø¯ Ù†Ù…ÛŒâ€ŒØ¯ÛŒÙ… */}
//               <div className="p-4">
//                 <ProductImage
//                   src={resolveImageUrl(product?.ProductImage?.[0])}
//                   alt={product?.ProductName || product?.category || ''}
//                   ratio="1:1"          // Ø§Ú¯Ø± Ù…Ø³ØªØ·ÛŒÙ„ÛŒ Ù…ÛŒâ€ŒØ®ÙˆØ§ÛŒ: "4:3"
//                   fit="contain"
//                   bg="bg-[var(--surface-2)]"
//                   className="transition-transform duration-200 hover:scale-[1.02]"
//                 />
//               </div>

//               <div className="p-4 mx-auto gap-3">
//                 <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-[var(--text)] section-title">
//                   {product?.ProductName}
//                 </h2>
//                 <p className="capitalize text-[var(--text-muted)]">{product?.category}</p>
//                 <div className="flex gap-3">
//                   <p className="text-blue-700 font-medium">{DisplayUSDCurrency(product?.Selling)}</p>
//                   <p className="text-[var(--text-muted)] line-through price-old">{DisplayUSDCurrency(product?.Price)}</p>
//                 </div>
//                 <div className="flex justify-center">
//                   <button
//                     className="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center btn btn-ghost"
//                     onClick={(e) => handleAddToCart(e, product?._id)}
//                   >
//                     ADD TO CARD
//                   </button>
//                 </div>
//               </div>
//             </Link>
//           ))
//         )}
//       </div>
//     </div>
//   )
// }

// export default CategoryWiseProductDisplay

