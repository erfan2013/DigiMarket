import React, { useState } from 'react'
import { AiFillEdit } from "react-icons/ai";
import AdminEditProduct from './AdminEditProduct';
import DisplayUSDCurrency from '../helper/displayCurrency';

const AdminProductCard = ({
    data,
    fetchdata
}) => {
    const [editProduct , setEditProduct] = useState(false)
  return (

      <div className='bg-white p-4 rounded'>
                <div className='w-44'>
                    <div className=' h-32 flex items-center justify-center'>
                    <img src={data?.ProductImage[0]} alt="" width={120} height={120} className='mx-auto border-b object-fill h-full' />
                    </div>
                <h1 className='text-ellipsis line-clamp-2'>{data?.ProductName}</h1>
                <div>

                    <p>
                        {    
                            DisplayUSDCurrency(data.Price)
                        }
                    </p>

                <div className='w-fit ml-auto p-2 bg-green-400 rounded-lg text-white cursor-pointer hover:bg-green-600' onClick={()=>setEditProduct(true)}>
                <AiFillEdit />
                
                </div>


                </div>

                
                </div>

                {
                    editProduct && (
                        <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata} />
                    )
                }
              </div>

   
  )
}

export default AdminProductCard
