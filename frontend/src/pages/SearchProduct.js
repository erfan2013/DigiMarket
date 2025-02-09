import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCartProduct from '../components/verticalCartProduct'

const SearchProduct = () => {
    const query = useLocation()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const fetchProduct = async() => {
      setLoading(true)
        const respnse = await fetch(SummaryApi.searchProduct.url + query.search)
        const dataResponse = await respnse.json()
        setLoading(false)
        setData(dataResponse.data)
    }

    useEffect(() => {
        fetchProduct()
    },[query])
  return (
    <div className='container mx-auto p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading...</p>
        )
      }
      
      <p className='text-lg font-semibold my-3'>Search result :  {data.length}</p>

      {
        data.length === 0 && !loading && (
          <p className='text-lg text-center p-4 bg-white'>No data found...</p>
        )

      }

      {
        data.length !== 0 && !loading && (
         
              <VerticalCartProduct loading={loading} data={data} />
          
        )
      }
    </div>
  )
}

export default SearchProduct
