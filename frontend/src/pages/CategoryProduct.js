import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helper/ProductCategory'
import VerticalCartProduct from '../components/verticalCartProduct'
import SummaryApi from '../common'

const CategoryProduct = () => {
    const params = useParams()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const URLSearch = new URLSearchParams(location.search)
    const urlCategoryListArray = URLSearch.getAll("category")
    const urlCategoryListObject = {}
    urlCategoryListArray.forEach(el => {
      urlCategoryListObject[el] = true
    })
    const [selectedCatgory,setSelectedCatgory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])
    const [sort,setSort] = useState("")

    const fetchdata = async () => {
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers: {
          "Content-Type": "application/json"
        },

        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
    }

    const handleSelectCategory = (e) => {
      const {name,value , checked} = e.target ;
      setSelectedCatgory((preve)=> {
        return {
          ...preve,
          [value] : checked
        }
      })
    }
    useEffect(()=> {
      fetchdata()
    },[filterCategoryList])
    useEffect(()=> {
      const arrayofCategory = Object.keys(selectedCatgory).map(categoryKeyName => {
        if(selectedCatgory[categoryKeyName]){
          return categoryKeyName
        }
        return null

      }).filter(el => el)

      setFilterCategoryList(arrayofCategory)
      const urlformat = arrayofCategory.map((el ,index) => {
        if((arrayofCategory.length - 1) === index ){
          return `/category=${el}`
        }

        return `category=${el}&&`
      })
      navigate('/product-category?' + urlformat.join(""))
    },[selectedCatgory])

    const handleOnchengeSortBy = (e) => {
      const {value} = e.target
      setSort(value)
      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=> a.Selling - b.Selling))
      }
      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=> b.Selling - a.Selling))
      }
    }
    useEffect(()=>{

    },[sort])

   
  return (
    <div className='container mx-auto p-4'>

      <div className=' hidden lg:grid grid-cols-[200px,1fr] rele'>
            <div className='bg-white p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
              <div className=''>
                <h3 className='text-base capitalize font-medium text-slate-500 border-b pb-1 border-slate-300'>Sort By</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                      <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sort === 'asc'} value={'asc'} onChange={handleOnchengeSortBy}/>
                        <label>Price Low To high</label>
                      </div>
                      <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sort === 'dsc'} value={'dsc'} onChange={handleOnchengeSortBy}/>
                        <label>Price high To low</label>
                      </div>
                </form>
                </div>
                {/**filterby */}
                <div className=''>
                <h3 className='text-base capitalize font-medium text-slate-500 border-b pb-1 border-slate-300'>Category</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                     {
                      productCategory.map((categoryName,index)=> {
                        return (
                          <div className='flex items-center gap-3 font-semibold'>
                            <input type='checkbox' name={'category'} id={categoryName?.value} checked={selectedCatgory[categoryName?.value]} value={categoryName?.value} onChange={handleSelectCategory} />
                            <label htmlFor={categoryName?.value}>{categoryName?.label}</label>
                          </div>
                        )
                      })
                     }
                </form>
                </div>
            </div>
            <div className='px-4 '>
              <p className='font-semibold my-2 text-slate-800 text-lg'>Search Results : {data.length}</p>
             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
             {
               data.length !== 0 &&(
                <VerticalCartProduct data={data} loading={loading}/>
               )
              }
             </div>
            </div>
      </div>
     
    </div>
  )
}

export default CategoryProduct
