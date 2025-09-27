import React, { useContext, useEffect, useRef, useState } from 'react'
import fetchCategoryWiseProduct from '../helper/fetchCategoryWiseProduct'
import DisplayUSDCurrency from '../helper/displayCurrency'
import { FaAngleDoubleLeft, FaAngleDoubleRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import addToCart from '../helper/addToCart'
import Context from '../context'
import scrollToTop from '../helper/ScrolTop'


const HorizentalCardProduct = ({category,heading}) => {
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(true)
  const loadingList = new Array(13).fill(null)

  const [scroll,setScroll] = useState(0)
  const scrollElement = useRef()

  const { fetchUserAddToCart } = useContext(Context);

  const handleAddToCart = async (e,id)=>{
    e.preventDefault()
    await addToCart(e,id)
    fetchUserAddToCart()
  }

  const fetchData = async ()=>{
    setLoading(true)
    const categoryProduct = await fetchCategoryWiseProduct(category)
   setLoading(false)

   
    setData(categoryProduct?.data)

  }
  useEffect(()=>{
    fetchData()
  },[])
  
  const scrollRight = ()=>{
    scrollElement.current.scrollLeft += 200
  }
  const scrollLeft = ()=>{
    scrollElement.current.scrollLeft -= 200
  }
  return (
    <div className='container mx-auto px-4 mt-10 my-6 relative'>
      <h2 className='text-2xl font-semibold py-4'>{heading}</h2>

      


      <div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>
      <button  className='text-black bg-white rounded-full p-1 text-3xl absolute left-0' onClick={scrollLeft}><FaAngleDoubleLeft/></button>
      <button  className='text-black bg-white rounded-full p-1 text-3xl absolute right-0' onClick={scrollRight}><FaAngleDoubleRight/></button> 
      {
        loading ? (
          loadingList.map((product,index)=>{
            return(
  
              <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex '>
              <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse '></div>
              <div className='p-4 mx-auto grid w-full gap-2 '>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                <div className='flex gap-3 w-full '>
                   <p className='text-blue-700 font-medium p-1 w-full bg-slate-200 animate-pulse  rounded-full'> </p>
                   <p className='text-slate-500 line-through p-1 w-full bg-slate-200 animate-pulse  rounded-full'></p>
  
                   
                </div>
                <button className=' animate-pulse p-1 mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center bg-slate-200 w-full '>ADD TO CARD</button>
  
          </div>
          </div>
            )
  
          })
        ) : (
          data.map((product,index)=>{
            return(
  
              <Link key={index} to={'/product/' +product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-lg shadow flex' onClick={scrollToTop}>
              <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px]'>
              <img src={product.ProductImage[0]} alt={product.category} className='cursor-pointer objeect-scale-down hover:scale-110 transition-all h-full mix-blend-multiply' />
              </div>
              <div className='p-1 mx-auto'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black'>{product?.ProductName}</h2>
                <p className='capitalize text-slate-500'>{product.category}</p>
                <div className='flex gap-3  '>
                   <p className='text-blue-700 font-medium p-1 w-full '>{DisplayUSDCurrency(product?.Selling) } </p>
                   <p className='text-slate-500 line-through p-1 w-full'>{DisplayUSDCurrency(product?.Price)} </p>
  
                   
                </div>
                <button className='mt-2 text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg md:text-sm text-xs md:px-5 md:py-2.5 px-3 py-2.5 text-center bg-slate-200 w-full' onClick={(e)=> handleAddToCart(e,product?._id)}>ADD TO CARD</button>
  
          </div>
          </Link>
            )
  
          })
        )
      }
      </div>
    </div>
  )
}

export default HorizentalCardProduct
