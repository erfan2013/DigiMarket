import React, { useContext } from 'react'
import { useState } from 'react';
import UserImage from '../assest/signin.gif'
import { FaEye , FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import Context from '../context';



const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const[data,setData] =useState({
    email:"",
    password:""
  })
  const navigate = useNavigate();
  const { fetchUserDetails,fetchUserAddToCart } = useContext(Context);
  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev)=>{
      return{
        ...prev,
        [name]:value
      }
    })
  }
  const handleSubmit = async(e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.signIN.url, {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      cache: 'no-cache',
    });


    const dataApi = await dataResponse.json();

   if (dataApi.success) {
   toast.success(dataApi.message);
   // فالبک برای زمانی که کوکی third-party ارسال نشه
   if (dataApi.data) {
     localStorage.setItem('jwt', dataApi.data);
   }
   await fetchUserDetails();   // اول پروفایل بیاد
   await fetchUserAddToCart();
   navigate("/");
   }
    
    if(dataApi.error){
      toast.error(dataApi.message);
    }


  }
  return (
    <section id='login'>
        <div className='mx-auto container p-6' >

            <div className='bg-gray-600 p-5 w-full max-w-sm mx-auto rounded-lg'>
            <div className='w-20 h-20 mx-auto rounded-full overflow-hidden'>
               <img src={UserImage} alt='UserImage' />  
            </div>
            <form onSubmit={handleSubmit} className='pt-6 flex flex-col gap-5'>
              <div className='grid'>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email :</label>
                <div className='border rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-white text-black border-black'>
                  <input
                  onChange={handleOnChange}
                  value={data.email}
                  name='email'
                   type="email" placeholder='Enter your email' className='w-full h-full outline-none bg-transparent'/>
                </div>
                
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password :</label>
                <div className='flex items-center border rounded-lg focus:ring-primary-600 focus:border-primary-600 w-full p-2.5 bg-white text-black border-black'>
                <input
                 onChange={handleOnChange}
                 value={data.password}
                 name='password'
                type={showPassword ? "text" : "password"} placeholder='Enter your Password' className='w-full h-full outline-none bg-transparent'/>
                
                <div className='cursor-pointer text-xl' onClick={()=>setShowPassword((prev)=>!prev)}>
                  <span>
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
                </div>
                <Link to={'/Forgot-Password'} className='text-sm font-medium text-slate-200 block w-fit my-4 ml-auto hover:underline hover:text-blue-600'>Forgot Password ?</Link>
              </div>

              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Sign In</button>
            </form>
            <p className='font-medium text-slate-200 mt-2'>Dont Have an Account ? <Link to={"/sign-up"} className='hover:text-blue-600 hover:underline'>Sign Up</Link></p>


            </div>

        </div>
    </section>
  )
}
export default LoginPage
