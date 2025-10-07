import React, { useEffect, useState } from 'react'
import SummaryApi from '../common';
import { Link } from 'react-router-dom';
import resolveImageUrl from '../helper/resolveImageUrl';

const CategoryList = () => {
    const [categoryProduct, setCategoriesProduct] = useState([])
    const [Loading, setLoading] = useState(false)

    const categoryLoading = new Array(13).fill(null)
    const fetchCategoryProducts = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.categoryProduct.url);
        const dataResponse = await response.json();
        setLoading(false)
        setCategoriesProduct(Array.isArray(dataResponse?.data) ? dataResponse.data : []);
        console.log("response", dataResponse)
    }

    useEffect(() => {
        fetchCategoryProducts()
    }, [])

  return (
    <div className='container mx-auto p-5'> 
    <div className='flex items-center gap-4 justify-between overflow-scroll scrollbar-none'>
       {
        Loading ? (
            
        
                    categoryLoading.map((el,index) => {
                        return(
                            <div className='h-16 w-16 md:w-20 md:h-20 rounded-lg overflow-hidden bg-slate-200 animate-pulse' key={"category-loading-"+index}>

                            </div>
                        )
                    })
        
        ):
        (
            (categoryProduct || []).map((product,index) => (
                <Link to={'/product-category?category='+product?.category} className='cursor-pointer' key={product?.category}>
                    <div className='w-16 md:w-20 h-20 rounded-lg overflow-hidden p-4 bg-slate-200  flex items-center justify-center'>
                          <img src={resolveImageUrl(product?.ProductImage?.[0])} alt={product.category} className='w-fit object-scale-down h-full mix-blend-multiply hover:scale-125 transition-all' />
                    </div>
                    <p className='text-center text-sm md:text-base capitalize'>{product?.category}</p>
                </Link>
            ))
        )
            
       }
    </div>
    </div>
  )
}

export default CategoryList
