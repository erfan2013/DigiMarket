import React from 'react'
import { IoIosCloudUpload, IoMdCloseCircle } from "react-icons/io";

const DisplayImage = ({
    imageUrl,
    onClose
}) => {
    
  return (
    <div className='fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center'>

        <div className='bg-white shadow-lg rounded-lg max-w-5xl mx-auto'>
        <div className='w-fit ml-auto text-3xl cursor-pointer hover:text-red-500 p-2' onClick={onClose}>
            <IoMdCloseCircle />
            </div>


        <div className='flex justify-center p-4 max-w-[80vh] max-h-[80vh]'>
        <img src={imageUrl} alt="image" className='w-full h-full' />
        
      </div>

        </div>
      
    </div>
  )
}

export default DisplayImage
