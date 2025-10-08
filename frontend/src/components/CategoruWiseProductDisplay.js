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
  const loadingList = new Array(13).fill(null)
  const { fetchUserAddToCart } = useContext(Context)

  const handleAddToCart = async (e, id) => {
    e.preventDefault()
    await addToCart(e, id)
    fetchUserAddToCart()
  }

  const fetchData = async () => {
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
    setLoading(false)
    setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : [])
  }

  useEffect(() => {
    fetchData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="container mx-auto px-4 mt-10 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,320px))] justify-between md:gap-6 overflow-x-scroll scrollbar-none transition-all">
        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow"
            >
              {/* اسکلت تصویر با نسبت ثابت 1:1 */}
              <div className="p-4">
                <div className="relative w-full overflow-hidden rounded-xl bg-slate-200">
                  <div style={{ paddingTop: '100%' }} className="animate-pulse" />
                </div>
              </div>

              <div className="p-4 mx-auto gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 animate-pulse rounded-full py-2" aria-busy="true">
                  Loading product name...
                </h2>
                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full py-2"></p>
                <div className="flex gap-3">
                  <p className="text-blue-700 font-medium p-1 animate-pulse rounded-full py-2"></p>
                  <p className="text-slate-500 line-through p-1 animate-pulse rounded-full py-2"></p>
                </div>
                <div className="flex justify-center">
                  <button className="p-1 animate-pulse mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center"></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          (data || []).map((product) => (
            <Link
              key={product?._id}
              to={'/product/' + product?._id}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow"
              onClick={scrollToTop}
            >
              {/* فقط padding؛ ارتفاع ثابت به والد نمی‌دیم */}
              <div className="p-4">
                <ProductImage
                  src={resolveImageUrl(product?.ProductImage?.[0])}
                  alt={product?.ProductName || product?.category || ''}
                  ratio="1:1"          // اگر مستطیلی می‌خوای: "4:3"
                  fit="contain"
                  bg="bg-slate-100"
                  className="transition-transform duration-200 hover:scale-[1.02]"
                />
              </div>

              <div className="p-4 mx-auto gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.ProductName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-blue-700 font-medium">{DisplayUSDCurrency(product?.Selling)}</p>
                  <p className="text-slate-500 line-through">{DisplayUSDCurrency(product?.Price)}</p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    ADD TO CARD
                  </button>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default CategoryWiseProductDisplay
