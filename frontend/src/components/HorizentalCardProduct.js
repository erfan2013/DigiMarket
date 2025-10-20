import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import DisplayUSDCurrency from '../helper/displayCurrency'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'
import scrollToTop from '../helper/ScrolTop'
import resolveImageUrl from '../helper/resolveImageUrl'
import ProductImage from './ui/productImage' // â¬…ï¸ Ø§Ø¶Ø§ÙÙ‡ Ø´Ø¯

const HorizentalCardProduct = ({ category, heading }) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const scrollElement = useRef()
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
  }, [])

  const scrollRight = () => (scrollElement.current.scrollLeft += 200)
  const scrollLeft = () => (scrollElement.current.scrollLeft -= 200)

  return (
    <div className="container mx-auto px-4 mt-10 my-6 relative">
      <h2 className="text-2xl font-semibold py-4 section-title">{heading}</h2>

      <div
        className="flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all"
        ref={scrollElement}
      >
        <button
          className="text-[var(--text)] rounded-full p-1 text-3xl absolute left-0 btn btn-ghost"
          onClick={scrollLeft}
        >
          <FaAngleDoubleLeft />
        </button>
        <button
          className="text-[var(--text)] rounded-full p-1 text-3xl absolute right-0 btn btn-ghost"
          onClick={scrollRight}
        >
          <FaAngleDoubleRight />
        </button>

        {loading ? (
          loadingList.map((_, index) => (
            <div
              key={index}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[var(--surface)] rounded-lg shadow flex"
            >
              {/* â¬‡ï¸ ÙÙ‚Ø· Ø¯Ø§Ø®Ù„ Ø¨Ø§Ú©Ø³ ØªØµÙˆÛŒØ± Ø±Ø§ ØªØºÛŒÛŒØ± Ø¯Ø§Ø¯Ù…Ø› Ø§Ø³ØªØ§ÛŒÙ„ Ø¨Ø§ Ø¨ÛŒØ±ÙˆÙ†ÛŒâ€ŒÙ‡Ø§ ÛŒÚ©Ø³Ø§Ù† Ù…Ø§Ù†Ø¯Ù‡ */}
              <div className="bg-[var(--surface-2)] h-full p-4 min-w-[120px] md:min-w-[145px]">
                {/* Ø§Ø³Ú©Ù„Øª Ø¨Ø§ Ù†Ø³Ø¨Øª Ø«Ø§Ø¨Øª 1:1 ØªØ§ Ø¬Ù‡Ø´ Ø§Ø±ØªÙØ§Ø¹ Ù†Ø¯Ø§Ø´ØªÙ‡ Ø¨Ø§Ø´ÛŒÙ… */}
                <div className="relative w-full overflow-hidden rounded-xl">
                  <div style={{ paddingTop: '100%' }} className="bg-[var(--surface-2)] animate-pulse" />
                </div>
              </div>

              <div className="p-4 mx-auto grid w-full gap-2">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-[var(--text)] bg-[var(--surface-2)] animate-pulse p-1 rounded-full section-title"></h2>
                <p className="capitalize text-[var(--text-muted)] p-1 bg-[var(--surface-2)] animate-pulse rounded-full"></p>
                <div className="flex gap-3 w-full">
                  <p className="text-blue-700 font-medium p-1 w-full bg-[var(--surface-2)] animate-pulse rounded-full"></p>
                  <p className="text-[var(--text-muted)] line-through p-1 w-full bg-[var(--surface-2)] animate-pulse rounded-full price-old"></p>
                </div>
                <button className="animate-pulse p-1 mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center w-full btn btn-ghost">
                  ADD TO CARD
                </button>
              </div>
            </div>
          ))
        ) : (
          (data || []).map((product, index) => (
            <Link
              key={index}
              to={'/product/' + product?._id}
              className="w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[var(--surface)] rounded-lg shadow flex"
              onClick={scrollToTop}
            >
              {/* â¬‡ï¸ Ú©Ø§Ù†ØªÛŒÙ†Ø± ØªØµÙˆÛŒØ± Ø¯Ù‚ÛŒÙ‚Ø§ Ù…Ø«Ù„ Ù‚Ø¨Ù„ Ø¨Ø§Ù‚ÛŒ Ù…Ø§Ù†Ø¯Ù‡Ø› ÙÙ‚Ø· IMG Ø±Ø§ Ø¨Ø§ ProductImage Ø¹ÙˆØ¶ Ú©Ø±Ø¯Ù… */}
              <div className="bg-[var(--surface-2)] h-full p-4 min-w-[120px] md:min-w-[145px]">
                <ProductImage
                  src={resolveImageUrl(product?.ProductImage?.[0])}
                  alt={product?.ProductName || product?.category || ''}
                  ratio="1:1"        // Ø§Ø³ØªØ§Ù†Ø¯Ø§Ø±Ø¯ Ù…Ø±Ø¨Ø¹ÛŒ Ø¨Ø±Ø§ÛŒ Ø³ØªÙˆÙ† ØªØµÙˆÛŒØ±
                  fit="contain"      // Ø¨Ø¯ÙˆÙ† Ø¨Ø±Ø´ ØªØµÙˆÛŒØ±
                  bg="bg-transparent"// Ù¾Ø³â€ŒØ²Ù…ÛŒÙ†Ù‡ Ø±Ø§ Ù‡Ù…Ø§Ù† bg ÙˆØ§Ù„Ø¯ Ù…ÛŒâ€ŒØ¯Ù‡Ø¯
                />
              </div>

              <div className="p-1 mx-auto">
                <h2 className="font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-[var(--text)] section-title">
                  {product?.ProductName}
                </h2>
                <p className="capitalize text-[var(--text-muted)]">{product?.category}</p>
                <div className="flex gap-3">
                  <p className="text-blue-700 font-medium p-1 w-full">
                    {DisplayUSDCurrency(product?.Selling)}
                  </p>
                  <p className="text-[var(--text-muted)] line-through p-1 w-full price-old">
                    {DisplayUSDCurrency(product?.Price)}
                  </p>
                </div>
                <button
                  className="mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center w-full btn btn-ghost"
                  onClick={(e) => handleAddToCart(e, product?._id)}
                >
                  ADD TO CARD
                </button>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

export default HorizentalCardProduct








// import React, { useContext, useEffect, useRef, useState } from 'react'
// import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
// import DisplayUSDCurrency from '../helper/displayCurrency'
// import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
// import { Link } from 'react-router-dom'
// import addToCart from '../helper/addToCart'
// import Context from '../context'
// import scrollToTop from '../helper/ScrolTop'
// import resolveImageUrl from '../helper/resolveImageUrl'


// const HorizentalCardProduct = ({category,heading}) => {
//   const [data,setData] = useState([])
//   const [loading,setLoading] = useState(true)
//   const loadingList = new Array(13).fill(null)

//   const [scroll,setScroll] = useState(0)
//   const scrollElement = useRef()

//   const { fetchUserAddToCart } = useContext(Context);

//   const handleAddToCart = async (e,id)=>{
//     e.preventDefault()
//     await addToCart(e,id)
//     fetchUserAddToCart()
//   }

//   const fetchData = async ()=>{
//     setLoading(true)
//     const categoryProduct = await fetchCategoryWiseProduct(category)
//    setLoading(false)

   
//     setData(Array.isArray(categoryProduct?.data) ? categoryProduct.data : []);


//   }
//   useEffect(()=>{
//     fetchData()
//   },[])
  
//   const scrollRight = ()=>{
//     scrollElement.current.scrollLeft += 200
//   }
//   const scrollLeft = ()=>{
//     scrollElement.current.scrollLeft -= 200
//   }
//   return (
//     <div className='container mx-auto px-4 mt-10 my-6 relative'>
//       <h2 className='text-2xl font-semibold py-4 section-title'>{heading}</h2>

      


//       <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
//       <button  className='text-[var(--text)] rounded-full p-1 text-3xl absolute left-0 btn btn-ghost' onClick={scrollLeft}><FaAngleDoubleLeft/></button>
//       <button  className='text-[var(--text)] rounded-full p-1 text-3xl absolute right-0 btn btn-ghost' onClick={scrollRight}><FaAngleDoubleRight/></button> 
//       {
//         loading ? (
//           loadingList.map((product,index)=>{
//             return(
  
//               <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[var(--surface)] rounded-lg shadow flex'>
//               <div className='bg-[var(--surface-2)] h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'></div>
//               <div className='p-4 mx-auto grid w-full gap-2'>
//                 <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-[var(--text)] bg-[var(--surface-2)] animate-pulse p-1 rounded-full section-title'></h2>
//                 <p className='capitalize text-[var(--text-muted)] p-1 bg-[var(--surface-2)] animate-pulse rounded-full'></p>
//                 <div className='flex gap-3 w-full'>
//                    <p className='text-blue-700 font-medium p-1 w-full bg-[var(--surface-2)] animate-pulse  rounded-full'> </p>
//                    <p className='text-[var(--text-muted)] line-through p-1 w-full bg-[var(--surface-2)] animate-pulse  rounded-full price-old'></p>
  
                   
//                 </div>
//                 <button className='animate-pulse p-1 mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center w-full btn btn-ghost'>ADD TO CARD</button>
  
//           </div>
//           </div>
//             )
  
//           })
//         ) : (
//           (data || []).map((product,index)=>{
//             return(
  
//               <Link key={index} to={'/product/' +product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-[var(--surface)] rounded-lg shadow flex' onClick={scrollToTop}>
//               <div className='bg-[var(--surface-2)] h-full p-4 min-w-[120px] md:min-w-[145px]'>
//               <img src={resolveImageUrl(product?.ProductImage?.[0])} alt={product.category} className='cursor-pointer objeect-scale-down hover:scale-110 transition-all h-full mix-blend-multiply' />
//               </div>
//               <div className='p-1 mx-auto'>
//                 <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-[var(--text)] section-title'>{product?.ProductName}</h2>
//                 <p className='capitalize text-[var(--text-muted)]'>{product.category}</p>
//                 <div className='flex gap-3'>
//                    <p className='text-blue-700 font-medium p-1 w-full '>{DisplayUSDCurrency(product?.Selling) } </p>
//                    <p className='text-[var(--text-muted)] line-through p-1 w-full price-old'>{DisplayUSDCurrency(product?.Price)} </p>
  
                   
//                 </div>
//                 <button className='mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center w-full btn btn-ghost' onClick={(e)=> handleAddToCart(e,product?._id)}>ADD TO CARD</button>
  
//           </div>
//           </Link>
//             )
  
//           })
//         )
//       }
//       </div>
//     </div>
//   )
// }

// export default HorizentalCardProduct

