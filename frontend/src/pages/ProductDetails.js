import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import SummaryApi from '../common'
import CategoryWiseProductDisplay from '../components/CategoruWiseProductDisplay'
import addToCart from '../helper/addToCart'
import Context from '../context'
import ProductDetailsView from '../components/ProductDetailsView'

const ProductDeatails = () => {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const params = useParams()
  const navigate = useNavigate()
  const { fetchUserAddToCart } = useContext(Context)

  const fetchProductdetails = async () => {
    try {
      setLoading(true)
      const response = await fetch(SummaryApi.ProductDetails.url, {
        method: SummaryApi.ProductDetails.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId: params?.id })
      })
      const dataResponse = await response.json()
      setData(dataResponse?.data || null)
    } catch (e) {
      console.error(e)
      setData(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProductdetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id])

  const handleAddToCart = async (e, id) => {
    const ok = await addToCart(e, id)
    if (ok) {
      fetchUserAddToCart?.()
    }
  }

  const handleBuyProduct = async (e, id) => {
    const ok = await addToCart(e, id)
    if (ok) {
      fetchUserAddToCart?.()
    }
    navigate("/cart")
  }

  // برای هم‌خوانی با ProductDetailsView: قیمت اصلی = Selling ، قیمت خط‌خورده = Price
  const viewProduct = data
    ? { ...data, Price: data?.Selling, Discount: Math.max(0, Number(data?.Price || 0) - Number(data?.Selling || 0)) }
    : null

  return (
    <div className='container mx-auto p-4'>
      {loading ? (
        <div className="p-4">in the proccess...</div>
      ) : !data ? (
        <div className="p-4">not found</div>
      ) : (
        <ProductDetailsView
          product={viewProduct}
          onAddToCart={( ) => handleAddToCart({ preventDefault(){ } }, data?._id)}
          onBuyNow={( ) => handleBuyProduct({ preventDefault(){ } }, data?._id)}
        />
      )}

      {data?.category && (
        <div className="mt-8">
          <CategoryWiseProductDisplay
            category={data?.category}
            heading={"Recomended"}
          />
        </div>
      )}
    </div>
  )
}

export default ProductDeatails






// import React, { useCallback, useContext, useEffect, useState } from 'react'
// import { useNavigate, useParams } from 'react-router-dom'
// import SummaryApi from '../common'
// import { FaStar } from "react-icons/fa";
// import { FaStarHalfAlt } from "react-icons/fa";
// import DisplayUSDCurrency from '../helper/displayCurrency';
// import CategoryWiseProductDisplay from '../components/CategoruWiseProductDisplay';
// import addToCart from '../helper/addToCart';
// import Context from '../context';



// const ProductDeatails = () => {
//   const [data,setData] = useState({
//     ProductName : "",
//     BrandName : "",
//     category : "",
//     ProductImage : [],
//     Price : "",
//     Description : "",
//     Selling : ""
//   })

//   const params = useParams()
//   const [loading,setLoading] = useState(false)
//   const productImageListLoading = new Array(4).fill(null)
//   const [activeImage,setActiveImage] = useState("")
//   const [zoomImage,setZoomImage] = useState({x:0,y:0})
//   const [zoomImageEnabled,setZoomImageEnabled] = useState(false)
//   const {fetchUserAddToCart } = useContext(Context);
//   const navigate = useNavigate()
//   const fetchProductdetails = async () => {
//     setLoading(true)
//     const response = await fetch(SummaryApi.ProductDetails.url,{
//       method : SummaryApi.ProductDetails.method,
//       headers : {
//         "Content-Type" : "application/json"
//       },
//       body : JSON.stringify({
//         productId : params?.id
//       })
      
//     })
//     setLoading(false)
//     const dataResponse = await response.json()


//     setData(dataResponse?.data)
//     setActiveImage(dataResponse?.data?.ProductImage[0])

//   }

//   useEffect(() => {
//     fetchProductdetails()
//   },[params])

//   const handleImageClick = (imageURL) => {
//     setActiveImage(imageURL)
//   }
//   const handleZoomImage = useCallback((e) => {
//     setZoomImageEnabled(true);
//     const { left, top, width, height } = e.target.getBoundingClientRect();
//     const x = (e.clientX - left) / width;
//     const y = (e.clientY - top) / height;
//     setZoomImage({ x, y });
    
//   },[zoomImage]);  
//   const handleZoomImageEnd = useCallback(() => {
//     setZoomImageEnabled(false);
//   }, []);
//   console.log("DAta category",data.category)
//   const handleAddToCart = async (e,id) => {
//       await addToCart(e,id)
//       fetchUserAddToCart()
//   }
//   const handleBuyProduct = async (e,id) => {
//     await addToCart(e,id)
//     fetchUserAddToCart()
//     navigate("/cart")
//   }
//   return (
//     <div className='container mx-auto p-4'> 
//       <div className='min-h-[200px] flex flex-col lg:flex-row gap-4'>
//         <div className='h-96 flex flex-col lg:flex-row-reverse gap-4'>

//           <div className='h-[300px] w-full lg:h-96 lg:w-96 bg-slate-200 relative p-2'>
//             <img src={activeImage} alt={data.ProductName} className='h-full w-full object-scale-down mix-blend-multiply' onMouseMove={handleZoomImage} onMouseLeave={handleZoomImageEnd} />
//           {
//             zoomImageEnabled && (
//               <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] p-1 bg-slate-200 -right-[510px] top-0'>
//               <div className='w-full h-full min-h-[400px] min-w-[500px] mix-blend-multiply'
//               style={{
//                 backgroundImage : `url(${activeImage})`,
//                 backgroundRepeat : "no-repeat",
//                 backgroundPosition : `${zoomImage.x * 100}% ${zoomImage.y * 100}%`,
//               }}>
//               </div>
//               </div>

//             )
//           }
//           </div>

           

//           <div className='h-full'>
//             {
//               loading ? (
//                   <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
//                     {
//                           productImageListLoading.map((el,index)=> {
//                             return (
//                               <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"imageLoading" + index}>
          
//                               </div>
//                             )
//                           })
//                     }
//                   </div>
               
//               ) : (
//                 <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
//                 {
//                       data?.ProductImage?.map((imgUrl, index)=> {
//                         return (
//                           <div className='h-20 w-20 bg-slate-200 rounded p-1' key={imgUrl}>
//                             <img src={imgUrl} alt="" className='h-full w-full object-scale-down mix-blend-multiply cursor-pointer' onMouseEnter={()=> handleImageClick(imgUrl)} onClick={()=> handleImageClick(imgUrl)}/>
      
//                           </div>
//                         )
//                       })
//                 }
//               </div>
//               )
//             }
//           </div>


          
//         </div>
        

//         {
//           loading ? (
//             <div className='grid w-full gap-1'>
//             <p className='bg-slate-200 animate-pulse h-6 lg:h-10 rounded-full inline-block w-full'></p>
//             <h2 className='text-2xl lg:text4xl font-medium h-6 lg:h-10 bg-slate-200 animate-pulse w-full'></h2>
//             <p className='capitalize text-slate-400 bg-slate-200 lg:h-10 min-w-[100px] animate-pulse h-6 w-full'></p>

//             <div className='text-blue-600 bg-slate-200 h-6 animate-pulse lg:h-10 flex items-center gap-1 w-full'>
//             </div>

//             <div className='flex items-center gap-2 text-1xl lg:h-10 lg:text-2xl font-medium my-1 h-6 animate-pulse w-full'>
//               <p className='text-blue-600 bg-slate-200 lg:h-10 w-full'></p>
//               <p className='text-slate-400 line-through bg-slate-200 w-full lg:h-10'></p>
//             </div>

//             <div className='flex items-center gap-3 lg:h-10 my-2 w-full'>
//               <button className='h-6 bg-slate-200 rounded animate-pulse w-full lg:h-10'>Add to Cart</button>
//               <button className='h-6 bg-slate-200 rounded animate-pulse w-full lg:h-10'>Buy</button>

//             </div>
//             <div className='w-full'>
//               <p className='text-slate-400 font-medium my-1 h-6 bg-slate-200 rounded animate-pulse w-full lg:h-10'></p>
//               <p className='text-slate-400 font-medium my-1 h-10 bg-slate-200 rounded animate-pulse w-full lg:h-10'></p>
//             </div>
//         </div>
//           ) : 
//         (
//           <div className='flex flex-col gap-1 py-7 lg:p-0'>
//           <p className='bg-red-200 text-red-600 px-2 rounded-full inline-block w-fit'>{data?.BrandName}</p>
//           <h2 className='text-2xl lg:text4xl font-medium'>{data?.ProductName}</h2>
//           <p className='capitalize text-slate-400'>{data?.category}</p>

//           <div className='text-blue-600 flex items-center gap-1'>
//             <FaStar />
//             <FaStar />
//             <FaStar />
//             <FaStar />
//             <FaStarHalfAlt />
//           </div>

//           <div className='flex items-center gap-2 text-1xl lg:text-2xl font-medium my-1'>
//             <p className='text-blue-600'>{DisplayUSDCurrency(data?.Selling)}</p>
//             <p className='text-slate-400 line-through'>{DisplayUSDCurrency(data?.Price)}</p>
//           </div>

//           <div className='flex items-center gap-3 my-2'>
//             <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={(e)=> handleAddToCart(e,data?._id)}>Add to Cart</button>
//             <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={(e)=>handleBuyProduct(e,data?._id)}>Buy</button>

//           </div>
//           <div>
//             <p className='text-black font-medium my-1'>Description :</p>
//             <p className='text-slate-400 font-medium my-1'>{data?.Description}</p>
//           </div>
//       </div>
//         )
//         }
//       </div>

//         {
//           data?.category && (
//             <CategoryWiseProductDisplay category ={data?.category}  heading={"Recomended"} />
//           ) 
//         }
//     </div>
//   )
// }

// export default ProductDeatails
