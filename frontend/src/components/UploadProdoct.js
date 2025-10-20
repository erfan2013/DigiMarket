import React, { useState } from 'react'
import { IoMdCloseCircle } from 'react-icons/io';
import ProductCategory from '../helper/ProductCategory';
import { IoIosCloudUpload } from "react-icons/io";
import uploadImage from '../helper/UploadImage';
import DisplayImage from './DisplayImage';
import { AiFillDelete } from "react-icons/ai";
import { toast } from 'react-toastify';
import SummaryApi from '../common';


const UploadProdoct = ({
    onClose,
    fetchData,
}) => {
    const [data,setData] = useState({
        ProductName : "",
        BrandName : "",
        category : "",
        ProductImage : [],
        Price : "",
        Description : "",
        Selling : "",
    })
    const [openFulllScreenImage,setOpenFullScreenImage] = useState(false)
    const [FullScreenImage,setFullScreenImage] = useState("")

    const handleOnChenge =  (e) => {
        const {name,value} = e.target
        setData((prev)=> {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0]

        const uploadImageCloudinary = await uploadImage(file)
        setData((prev)=> {
            return {
                ...prev,
                ProductImage : [ ...prev.ProductImage , uploadImageCloudinary.url]
        }
        })
    }

    const handleDeleteImage = async (index) => {
        const newProdouctImage = [...data.ProductImage]
        newProdouctImage.splice(index,1)
        

        setData((prev) => {
            return {
                ...prev,
                ProductImage : [...newProdouctImage]
            }
        })
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch(SummaryApi.uploadProduct.url,{
            method : SummaryApi.uploadProduct.method,
            credentials : "include",
            headers : {
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(data)

        })
        const ResponseData = await response.json()
        if(ResponseData.success){
            toast.success(ResponseData?.message)
            onClose()
            fetchData()
        }
        if(ResponseData.error){
            toast.error(ResponseData?.message)
        }
        console.log(ResponseData);
        
    }



  return (
    <div className='fixed inset-0 z-[9999] w-full h-full bg-[var(--surface-2)] bg-opacity-35 top-0 left-0 right-0 bottom-0 flex items-center justify-center'>
      <div className='bg-[var(--surface)] p-4 rounded-lg w-full max-w-xl h-full max-h-[82%] overflow-hidden'>

        <div className='flex items-center justify-between'>
            <h2 className='font-bold text-lg section-title'>Upload Product</h2>
            <div className='w-fit ml-auto text-3xl cursor-pointer hover:text-red-500 mb-2' onClick={onClose}>
            <IoMdCloseCircle />
            </div>
        </div>

        <form className='grid p-4 overflow-y-scroll h-full' onSubmit={handleSubmit}>
            <div>
            <label htmlFor="productname" className='block mb-2 text-sm font-medium text-gray-900 '>Product Name :</label>
            <input name='ProductName' value={data.ProductName} onChange={handleOnChenge} type="text" id="productname" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Product Name' required />
            <label htmlFor="Brandname" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Brand Name :</label>
            <input name='BrandName' value={data.BrandName} onChange={handleOnChenge} type="text" id="brandname" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Brand Name' required />
            <label htmlFor="category" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Category :</label>
            <select name='category' value={data.category} onChange={handleOnChenge} type="text" id="category" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Category' required>
            <option value={""}>Select Category</option>
                {
                    ProductCategory.map((el,index) => {
                        
                        return (
                            <option key={el.value+index} value={el.value}>{el.label}</option>
                        )
                    })
                }
            </select>
            <label htmlFor="ProductImage" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Product Image :</label>
            <label htmlFor='uploadImageInput'>
            <div className='p-2 border rounded-lg h-32 w-full mb-4 flex justify-center items-center cursor-pointer ui-toolbar' >
               <div className='flex flex-col justify-center items-center gap-2'>
                <span className='text-4xl'><IoIosCloudUpload /></span>
                <p className='text-sm'>UploadProdoct Image</p>
                <input type="file" id='uploadImageInput' className='hidden' onChange={handleUploadProduct} />
                </div>
            </div>
            </label>
            <div className='mb-4'>
                {
                    data?.ProductImage[0] ? (
                    <div className='flex gap-2 items-center cursor-pointer overflow-x-scroll p-3 flex-wrap'>
                        {
                            data.ProductImage.map((el,index) => {
                                return (
                                    <div key={index} className='relative group'>
                                        <img src={el} alt={el} width={80} height={80} className='bg-[var(--surface-2)] border rounded-lg' onClick={() =>{
                                        setOpenFullScreenImage(true)
                                        setFullScreenImage(el)
                                    }} />
                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-500 rounded-lg hidden group-hover:block cursor-pointer' onClick={() => handleDeleteImage(index)}>
                                    <AiFillDelete />
                                    </div >
                                    </div>
                                    
                                )
                            })
                        }
                    </div>
                    ) : (
                        <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                    )
                }
                
            </div>

            <label htmlFor="Price" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Price :</label>
            <input name='Price' value={data.Price} onChange={handleOnChenge} type="number" id="Price" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Price' required />

            <label htmlFor="Selling" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Selling :</label>
            <input name='Selling' value={data.Selling} onChange={handleOnChenge} type="number" id="Selling" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Selling' required />

            <label htmlFor="Description" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Description :</label>
            <textarea rows={5} name='Description' value={data.Description} onChange={handleOnChenge} type="text" id="Description" className='resize-none bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Enter Your Description' required />

            {/* <input name='ProductImage' value={data.ProductImage} onChange={handleOnChenge} type="text" id="ProductImage" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Product Image' required />
            <label htmlFor="Price" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Price :</label>
            <input name='Price' value={data.Price} onChange={handleOnChenge} type="text" id="Price" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Price' required />
            <label htmlFor="Description" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Description :</label>
            <input name='Description' value={data.Description} onChange={handleOnChenge} type="text" id="Description" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Description' required />
            <label htmlFor="Selling" className='block mb-2 text-sm font-medium text-gray-900 mt-2 '>Selling :</label>
            <input name='Selling' value={data.Selling} onChange={handleOnChenge} type="text" id="Selling" className='bg-gray-50 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 ui-input' placeholder='Selling' required /> */}
            </div>
            <div className='my-5'>
            <button type='submit' className='w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600 btn btn-ghost'>Upload Product</button>
            </div>
        </form>



        
     </div>

{
    openFulllScreenImage && (
        <DisplayImage imageUrl={FullScreenImage} onClose={()=> setOpenFullScreenImage(false)} />
    )
}
    </div>
  )
}

export default UploadProdoct

