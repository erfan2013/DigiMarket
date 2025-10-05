import React, { useState } from 'react';
import UserImage from '../assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helper/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input';
import 'react-phone-number-input/style.css';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    profilePic: "",
    phone: "",        // ⭐️ شماره به فرمت E.164 (مثل +98912...)
    address: "",
  });

  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const imagePic = await imageTobase64(file);
    setData(prev => ({ ...prev, profilePic: imagePic }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ولیدیشن ساده
    if (data.password !== data.confirmPassword) {
      toast.error("Password and confirm password does not match");
      return;
    }
    if (!data.phone || !isValidPhoneNumber(data.phone)) {
      toast.error("Please enter a valid phone number");
      return;
    }
    if (!data.address.trim()) {
      toast.error("Please enter your address");
      return;
    }

    const payload = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      password: data.password,
      profilePic: data.profilePic,     // اگر سمت سرور ذخیره‌اش می‌کنی
      phone: data.phone,               // مثل +98912...
      address: data.address.trim(),
      // countryCode لازم نیست بفرستی؛ بکند خودش از phone استخراج می‌کند
    };

    try {
      const res = await fetch(SummaryApi.SignUp.url, {
        method: SummaryApi.SignUp.method, // POST
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();

      if (json.success) {
        toast.success(json.message || "Account created");
        navigate("/login");
      } else {
        toast.error(json.message || "Sign up failed");
      }
    } catch (err) {
      toast.error("Network error");
    }
  };

  return (
    <section id='sign-up'>
      <div className='mx-auto container p-4'>
        <div className='bg-gray-600 p-5 w-full max-w-sm mx-auto rounded-lg'>
          <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
              <img src={data.profilePic || UserImage} alt='UserImage' />
            </div>
            <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              <div className='text-xs bg-opacity-80 bg-slate-200 pb-5 pt-0.1 text-center absolute bottom-0 w-full cursor-pointer'>
                Upload Photo
              </div>
              <input type="file" name='profilePic' className='hidden' onChange={handleUploadPic} />
            </label>
          </div>

          <form onSubmit={handleSubmit} className='pt-6 flex flex-col gap-4'>
            {/* Name */}
            <div className='grid'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name :</label>
              <div className='border rounded-lg block w-full p-2.5 bg-white text-black border-black'>
                <input
                  onChange={handleOnChange}
                  required
                  value={data.name}
                  name='name'
                  type="text"
                  placeholder='Enter your Name'
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Email */}
            <div className='grid'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email :</label>
              <div className='border rounded-lg block w-full p-2.5 bg-white text-black border-black'>
                <input
                  onChange={handleOnChange}
                  required
                  value={data.email}
                  name='email'
                  type="email"
                  placeholder='Enter your email'
                  className='w-full h-full outline-none bg-transparent'
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password :</label>
              <div className='flex items-center border rounded-lg w-full p-2.5 bg-white text-black border-black'>
                <input
                  onChange={handleOnChange}
                  required
                  value={data.password}
                  name='password'
                  type={showPassword ? "text" : "password"}
                  placeholder='Enter your Password'
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowPassword(p => !p)}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password :</label>
              <div className='flex items-center border rounded-lg w-full p-2.5 bg-white text-black border-black'>
                <input
                  onChange={handleOnChange}
                  required
                  value={data.confirmPassword}
                  name='confirmPassword'
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder='Enter your Password'
                  className='w-full h-full outline-none bg-transparent'
                />
                <div className='cursor-pointer text-xl' onClick={() => setShowConfirmPassword(p => !p)}>
                  {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            {/* Phone (react-phone-number-input) */}
            <div className='grid'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Phone :</label>
              <div className='border rounded-lg block w-full p-2 bg-white text-black border-black'>
                <PhoneInput
                  international
                  defaultCountry="IR"
                  value={data.phone}
                  onChange={(val) => setData(prev => ({ ...prev, phone: val || "" }))}
                  placeholder="e.g. +98 912 123 4567"
                />
              </div>
              {data.phone && !isValidPhoneNumber(data.phone) && (
                <p className='text-xs text-red-200 mt-1'>Invalid phone number</p>
              )}
            </div>

            {/* Address */}
            <div className='grid'>
              <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Address :</label>
              <div className='border rounded-lg block w-full p-2.5 bg-white text-black border-black'>
                <textarea
                  onChange={handleOnChange}
                  required
                  value={data.address}
                  name='address'
                  placeholder='Street, No, Unit...'
                  rows={3}
                  className='w-full h-full outline-none bg-transparent resize-none'
                />
              </div>
            </div>

            <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2'>
              Sign Up
            </button>
          </form>

          <p className='font-medium mt-3 text-slate-300'>
            Have an Account ? <Link to={"/login"} className='hover:text-blue-600 hover:underline'>Log in</Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;






// import React from 'react'
// import { useState } from 'react';
// import UserImage from '../assest/signin.gif'
// import { FaEye , FaEyeSlash } from "react-icons/fa";
// import { Link, useNavigate } from 'react-router-dom';
// import imageTobase64 from '../helper/imageTobase64';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import PhoneInput, { isValidPhoneNumber } from 'react-phone-number-input'


// const SignUp = () => {
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const[data,setData] =useState({
//     email:"",
//     password:"",
//     confirmPassword:"",
//     name:"",
//     profilePic:"",
//     phone:"",
//     address:"",
//     countryCode:"+98"  
//   })
//   const navigate = useNavigate();
//   const handleOnChange = (e) => {
//     const { name, value } = e.target;

//     setData((prev)=>{
//       return{
//         ...prev,
//         [name]:value
//       }
//     })
//   }
//   const handleUploadPic = async (e) => {
//     const file = e.target.files[0];
//     const imagePic = await imageTobase64(file);
//     setData((prev)=>{
//       return{
//         ...prev,
//         profilePic: imagePic
//       }
//     })
//   }
//   const handleSubmit =  async(e) => {
//     e.preventDefault();

//     if(data.password === data.confirmPassword){
//       const dataResponse = await fetch(SummaryApi.SignUp.url, {
//         method : SummaryApi.SignUp.method,
//         headers : {
//           "Content-Type" : "application/json"
//         },
//         body : JSON.stringify(data)
//       })
//       const dataApi = await dataResponse.json();

//        console.log("data",dataApi);



//       if(dataApi.success){
//         toast.success(dataApi.message);
//         navigate("/login");
//       }
//       if(dataApi.error){
//         toast.error(dataApi.message);
//       }

       
//     }else {
//       toast.error("Password and confirm password does not match");
//     }
//   }
//   console.log("data login",data);
//   return (
//     <section id='sign-up'>
//         <div className='mx-auto container p-4' >

//             <div className='bg-gray-600 p-5 w-full max-w-sm mx-auto rounded-lg'>
//             <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
//             <div>
//                <img src={data.profilePic || UserImage} alt='UserImage' />
//               </div>
//               <form>
//                 <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
//                 <div className='text-xs bg-opacity-80 bg-slate-200 pb-5 pt-0.1 text-center absolute bottom-0 w-full cursor-pointer'>
//                 Upload Photo
//               </div>
//                   <input type="file" name='profilePic' className='hidden' onChange={handleUploadPic} />
//                 </label>
              
//               </form>
//             </div>
            
//             <form onSubmit={handleSubmit} className='pt-6 flex flex-col gap-4'>
//             <div className='grid'>
//                 <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name :</label>
//                 <div className='border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white text-black border-black'>
//                   <input
//                   onChange={handleOnChange}
//                   required
//                   value={data.name}
//                   name='name'
//                    type="text" placeholder='Enter your Name' className='w-full h-full outline-none bg-transparent'/>
                   
//                 </div>
                
//               </div>
//               <div className='grid'>
//                 <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email :</label>
//                 <div className='border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white text-black border-black'>
//                   <input
//                   onChange={handleOnChange}
//                   required
//                   value={data.email}
//                   name='email'
//                    type="email" placeholder='Enter your email' className='w-full h-full outline-none bg-transparent'/>
//                 </div>
                
//               </div>
//               <div>
//                 <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password :</label>
//                 <div className='flex items-center border rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-white text-black border-black'>
//                 <input
//                  onChange={handleOnChange}
//                  required
//                  value={data.password}
//                  name='password'
//                 type={showPassword ? "text" : "password"} placeholder='Enter your Password' className='w-full h-full outline-none bg-transparent'/>
                
//                 <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
//                   <span>
//                     {showPassword ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>
//                 </div>
//               </div>
//               <div>
//                 <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password :</label>
//                 <div className='flex items-center border rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 bg-white text-black border-black'>
//                 <input
//                  onChange={handleOnChange}
//                  required
//                  value={data.confirmPassword}
//                  name='confirmPassword'
//                 type={showConfirmPassword ? "text" : "password"} placeholder='Enter your Password' className='w-full h-full outline-none bg-transparent'/>
                
//                 <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
//                   <span>
//                     {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
//                   </span>
//                 </div>
//                 </div>
//               </div>
              


//               <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2'>Sign Up</button>
//             </form>
//             <p className='font-medium mt-3 text-slate-300'>Have an Account ? <Link to={"/login"} className='hover:text-blue-600 hover:underline'>Log in</Link></p>


//             </div>

//         </div>
//     </section>
//   )
// }

// export default SignUp