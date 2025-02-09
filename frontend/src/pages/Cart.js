import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import DisplayUSDCurrency from '../helper/displayCurrency'
import { MdDelete } from "react-icons/md";
import { loadStripe } from '@stripe/stripe-js';

const Cart = () => {
  const [data,setData]=useState([])
  const [loading,setLoading]=useState(false)
  const context = useContext(Context)
  const loadingcart = new Array(context.cartProductCount).fill(null)
  const fetchdata = async () => {
    
    const response = await fetch(SummaryApi.addToCartViewProduct.url,{
      method: SummaryApi.addToCartViewProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      }
    });
    // setLoading(false)
    const responseData = await response.json();

    if(responseData.success){
      setData(responseData.data)
    
    }
  }
  const handleLoading = async () => {
      await fetchdata()
  }
  useEffect(()=>{
    setLoading(true)
    handleLoading()
    setLoading(false)
  },[])
  const increaseQty = async (id,qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body : JSON.stringify(
        {
          _id : id,
          quantity : qty + 1,
        } 
        
      )
  })
  const responseData = await response.json();

  if(responseData.success){
    fetchdata()
  }
}
const decreaseQty = async (id,qty) => {
 if(qty >= 2){
  const response = await fetch(SummaryApi.updateCartProduct.url, {
    method: SummaryApi.updateCartProduct.method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(
      {
        _id : id,
        quantity : qty - 1,
      } 
      
    )
})
const responseData = await response.json();

if(responseData.success){
  fetchdata()
}
 }
}

const deleteProduct = async (id) => {
  const response = await fetch(SummaryApi.deleteAddToCartProduct.url, {
    method: SummaryApi.deleteAddToCartProduct.method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify(
      {
        _id : id,
      }

    )
})
const responseData = await response.json();

if(responseData.success){
  fetchdata()
  context.fetchUserAddToCart()
}
}
const handlePay = async () => {
  
  const stripepromis = await loadStripe(process.env.REACT_APP_PUBLIC_STRIPE_KEY)
  const response = await fetch(SummaryApi.payment.url, {
    method: SummaryApi.payment.method,
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
    body : JSON.stringify({
      cartItems : data
    })
    
  })
  const responseData = await response.json();
  if(responseData?.id){
    stripepromis.redirectToCheckout({ sessionId: responseData.id })
  }
}
const totalqty = data.reduce((previousValue,currentValue) => previousValue + currentValue.quantity,0)
const totalPrice = data.reduce((previousValue,currentValue) => previousValue + (currentValue.quantity * currentValue?.productId?.Selling),0)


  
  return (
    <div className='container mx-auto'>
     <div className='text-center text-lg my-3'>
     {
        data.length === 0 && !loading && (
          <p className='bg-white py-5'>No Data</p>
        )
      }
     </div>



     <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>

        <div className='w-full max-w-3xl'>
          {
            loading ? (
              loadingcart.map((el,index) => {
                return (
                  <div key={el+ "Add to Cart Loading" + index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'></div>
                )
              })

            ) : (
              data.map((product,index) => {
                return (
                  <div key={product?._id + "Add to Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]'>
                    <div className='w-32 h-32 bg-slate-200'>
                      <img src={product?.productId?.ProductImage[0]} className='w-full h-full object-cover mix-blend-multiply' />

                    </div>
                    <div className='px-4 py-2 relative'>
                      <div className='absolute -right-0 cursor-pointer text-2xl text-rose-700 hover:text-rose-300 p-2 ' onClick={()=> deleteProduct(product?._id)}>
                      <MdDelete className='' onClick={()=> deleteProduct(product?._id)}/>
                      </div>
                      <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 '>{product?.productId?.ProductName}</h2>
                      <p className='capitalize text-slate-500'>{product?.productId?.category}</p>
                      <div className='flex justify-between items-center'>
                      <p className='text-red-600 font-medium text-lg'>{DisplayUSDCurrency(product?.productId?.Selling)}</p>
                      <p className='text-slate-600 font-semibold text-lg'>{DisplayUSDCurrency(product?.productId?.Selling * product?.quantity)}</p>
                        </div>
                      <div className='flex items-center gap-3 mt-1'>
                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-lg' onClick={()=> decreaseQty(product?._id,product?.quantity)}>-</button>
                        <span>{product?.quantity}</span>
                        <button className='border border-black text-black hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded-lg' onClick={() => increaseQty(product?._id,product?.quantity)}>+</button>
                      </div>
                    </div>
                  </div>
                )
              })

            )
          }
        </div>
        
          {
            data[0] && (
              <div className='mt-5 lg:mt-0 w-full max-w-sm'>
      {
            loading ? (
              <div className='h-36 bg-slate-200 border-slate-300 animate-pulse'>
          ToTal
        </div>

            ) : 
            (
              <div className='h-36 bg-slate-200'>
          <h2 className='text-white bg-blue-600 px-4 py-1'>Summary</h2>
          <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
            <p>Quantity</p>
            <p>{totalqty}</p>
          </div>

          <div className='flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600'>
            <p>Total</p>
            <p>{DisplayUSDCurrency(totalPrice)}</p>
          </div>
          <div className=''>
            <button className=' w-full text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2' onClick={handlePay}>Payment</button>
          </div>
        </div>

            )
          }
      </div>

            )
          }
      
        
     </div>
    </div>
  )
}

export default Cart
