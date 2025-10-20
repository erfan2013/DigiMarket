import React from 'react'
import { IoIosCloudUpload, IoMdCloseCircle } from "react-icons/io";
// اگر فایل ProductImage تو مسیر دیگه‌ایه، همین رو با مسیر درست خودت عوض کن
import ProductImage from './ui/productImage';

const DisplayImage = ({ imageUrl, onClose }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 top-0 flex items-center justify-center">
      <div className="bg-[var(--surface)] shadow-lg rounded-lg max-w-5xl mx-auto">
        <div
          className="w-fit ml-auto text-3xl cursor-pointer hover:text-red-500 p-2"
          onClick={onClose}
        >
          <IoMdCloseCircle />
        </div>

        <div className="flex justify-center p-4 max-w-[80vh] max-h-[80vh]">
          {/* نکته: اینجا height ندیم؛ فقط width می‌تونه full باشه */}
          <ProductImage
            src={imageUrl}
            alt="image"
            ratio="1:1"      // اگر مستطیلی می‌خوای: "4:3"
            fit="contain"
            className="w-full"
            bg="bg-[var(--surface)]"
          />
        </div>
      </div>
    </div>
  );
};

export default DisplayImage;
