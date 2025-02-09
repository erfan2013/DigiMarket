import React, { useEffect, useState } from 'react'
import UploadProdoct from '../components/UploadProdoct'
import SummaryApi from '../common'
import AdminProductCard from '../components/AdminProductCard'

const AllProducts = () => {
  const [uploadProducts, setUploadProducts] = useState(false)
  const [allproducts, setAllProducts] = useState([])

  const fetchProducts = async () => {
    const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()
      setAllProducts(dataResponse?.data || [])
    }

    useEffect(() => {
      fetchProducts()
    }, [])
  return (
    <div>
      <div className='bg-white py-2 px-4 flex justify-between items-center'>
        <h2 className='font-bold text-lg '>All Products</h2>
        <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center' onClick={()=>setUploadProducts(true)}>Upload Product</button>
      </div>


      <div className='flex items-center gap-5 py-4 flex-wrap overflow-y-scroll'>
        {
          allproducts.map((product,index)=> {
            return (
              <AdminProductCard data={product} key={index+ "allProduct"}  fetchdata={fetchProducts} />
            )
          })
        }
      </div>
      {
        uploadProducts && (
          <UploadProdoct onClose = {() => setUploadProducts(false)} fetchData={fetchProducts} />
        )
      }
      
    </div>
  )
}

export default AllProducts

