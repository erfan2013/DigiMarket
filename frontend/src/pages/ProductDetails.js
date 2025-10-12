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