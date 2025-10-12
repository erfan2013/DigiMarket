import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import DisplayUSDCurrency from '../helper/displayCurrency'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'
import scrollToTop from '../helper/ScrolTop'
import resolveImageUrl from '../helper/resolveImageUrl'
import ProductImage from './ui/productImage'

const VerticalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(false)
  const loadingList = new Array(13).fill(null)
  const { fetchUserAddToCart } = useContext(Context)
  const scrollElement = useRef()

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

  useEffect(() => { fetchData() }, [])

  const scrollRight = () => (scrollElement.current.scrollLeft += 200)
  const scrollLeft  = () => (scrollElement.current.scrollLeft  -= 200)

  return (
    <div className="container mx-auto px-4 mt-10 my-6 relative">
      <h2 className="text-2xl font-semibold py-4">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-x-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button className="text-black bg-white rounded-full p-1 text-3xl absolute left-0" onClick={scrollLeft}>
          <FaAngleDoubleLeft />
        </button>
        <button className="text-black bg-white rounded-full p-1 text-3xl absolute right-0" onClick={scrollRight}>
          <FaAngleDoubleRight />
        </button>

        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow"
            >
              {/* اسکلت تصویر با نسبت ثابت (۱:۱) */}
              <div className="p-4">
                <div className="relative w-full overflow-hidden rounded-xl bg-slate-200">
                  <div style={{ paddingTop: '100%' }} className="animate-pulse" />
                </div>
              </div>

              <div className="p-4 mx-auto gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 animate-pulse rounded-full py-2"></h2>
                <p className="capitalize text-slate-500 p-1 animate-pulse rounded-full py-2"></p>
                <div className="flex gap-3">
                  <p className="text-blue-700 font-medium p-1 animate-pulse rounded-full py-2"></p>
                  <p className="text-slate-500 line-through p-1 animate-pulse rounded-full py-2"></p>
                </div>
                <div className="flex justify-center">
                  <button className="p-1 animate-pulse mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5"></button>
                </div>
              </div>
            </div>
          ))
        ) : (
          (data || []).map((product, index) => (
            <Link
              key={index}
              to={'/product/' + product?._id}
              className="group w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] bg-white rounded-lg shadow"
              onClick={scrollToTop}
            >
              {/* فقط padding؛ ارتفاع/فلکس نمی‌دیم. نسبت را ProductImage می‌سازد */}
              <div className="p-4">
                <ProductImage
                  src={resolveImageUrl(product?.ProductImage?.[0])}
                  alt={product?.ProductName || product?.category || ''}
                  ratio="1:1"           // اگر مستطیلی می‌خوای: "4:3"
                  fit="contain"
                  bg="bg-slate-100"
                  className="transition-transform duration-200 group-hover:scale-[1.02]"
                />
              </div>

              <div className="p-4 mx-auto gap-3">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black">
                  {product?.ProductName}
                </h2>
                <p className="capitalize text-slate-500">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-blue-700 font-medium">
                    {DisplayUSDCurrency(product?.Selling)}
                  </p>
                  <p className="text-slate-500 line-through">
                    {DisplayUSDCurrency(product?.Price)}
                  </p>
                </div>
                <div className="flex justify-center">
                  <button
                    className="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5"
                    onClick={(e) => handleAddToCart(e, product?._id)}
                  >
                    Add to cart
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

export default VerticalCardProduct