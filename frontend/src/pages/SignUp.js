import React from 'react'
import { useState } from 'react';
import UserImage from '../assest/signin.gif'
import { FaEye , FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from '../helper/imageTobase64';
import SummaryApi from '../common';
import { toast } from 'react-toastify';



const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const[data,setData] =useState({
    email:"",
    password:"",
    confirmPassword:"",
    name:"",
    profilePic:"",
  })
  const navigate = useNavigate();
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const imagePic = await imageTobase64(file);
    setData((prev)=>{
      return{
        ...prev,
        profilePic: imagePic
      }
    })
  }
  const handleSubmit =  async(e) => {
    e.preventDefault();

    if(data.password === data.confirmPassword){
      const dataResponse = await fetch(SummaryApi.SignUp.url, {
        method : SummaryApi.SignUp.method,
        headers : {
          "Content-Type" : "application/json"
        },
        body : JSON.stringify(data)
      })
      const dataApi = await dataResponse.json();

       console.log("data",dataApi);



      if(dataApi.success){
        toast.success(dataApi.message);
        navigate("/login");
      }
      if(dataApi.error){
        toast.error(dataApi.message);
      }

       
    }else {
      toast.error("Password and confirm password does not match");
    }
  }
  console.log("data login",data);
  return (
    <section id='sign-up'>
        <div className='mx-auto container p-4' >

            <div className='bg-gray-600 p-5 w-full max-w-sm mx-auto rounded-lg'>
            <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
            <div>
               <img src={data.profilePic || UserImage} alt='UserImage' />
              </div>
              <form>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                <div className='text-xs bg-opacity-80 bg-slate-200 pb-5 pt-0.1 text-center absolute bottom-0 w-full cursor-pointer'>
                Upload Photo
              </div>
                  <input type="file" name='profilePic' className='hidden' onChange={handleUploadPic} />
                </label>
              
              </form>
            </div>
            
            <form onSubmit={handleSubmit} className='pt-6 flex flex-col gap-4'>
            <div className='grid'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Name :</label>
                <div className='border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white text-black border-black'>
                  <input
                  onChange={handleOnChange}
                  required
                  value={data.name}
                  name='name'
                   type="text" placeholder='Enter your Name' className='w-full h-full outline-none bg-transparent'/>
                   
                </div>
                
              </div>
              <div className='grid'>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Email :</label>
                <div className='border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white text-black border-black'>
                  <input
                  onChange={handleOnChange}
                  required
                  value={data.email}
                  name='email'
                   type="email" placeholder='Enter your email' className='w-full h-full outline-none bg-transparent'/>
                </div>
                
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Password :</label>
                <div className='flex items-center border rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-white text-black border-black'>
                <input
                 onChange={handleOnChange}
                 required
                 value={data.password}
                 name='password'
                type={showPassword ? "text" : "password"} placeholder='Enter your Password' className='w-full h-full outline-none bg-transparent'/>
                
                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                </div>
              </div>
              <div>
                <label className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>Confirm Password :</label>
                <div className='flex items-center border rounded-lg focus:ring-primary-600 focus:border-primary-600  w-full p-2.5 bg-white text-black border-black'>
                <input
                 onChange={handleOnChange}
                 required
                 value={data.confirmPassword}
                 name='confirmPassword'
                type={showConfirmPassword ? "text" : "password"} placeholder='Enter your Password' className='w-full h-full outline-none bg-transparent'/>
                
                <div className='cursor-pointer text-xl' onClick={()=>setShowConfirmPassword((prev)=>!prev)}>
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                </div>
              </div>

              <button className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 mt-2'>Sign Up</button>
            </form>
            <p className='font-medium mt-3 text-slate-300'>Have an Account ? <Link to={"/login"} className='hover:text-blue-600 hover:underline'>Log in</Link></p>


            </div>

        </div>
    </section>
  )
}

export default SignUp