import React, { useContext, useState } from 'react';
import LOGO from '../assest/LOGO.png'
import { BiSearchAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../Store/UserSlice';
import ROLE from '../common/role';
import Context from '../context';
const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context)
  const navigate = useNavigate()
  const searchinput = useLocation()
  const URLSerach = new URLSearchParams(searchinput?.search)
  const serachQuery = URLSerach.getAll("q")
  const [search, setSearch] = useState(serachQuery)
  const handleLogout = async() => {
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method: SummaryApi.logout_user.method,
      credentials: "include",
    })

    const data = await fetchData.json() 

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate('/')
    }
    if(data.error){
      toast.error(data.message)
    }
  };
  const handleSearch = (e) => {
    const {value} = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)

    }else{
      navigate(`searrch`)
    }

    
    if(!value){
      navigate(`/`)
    }

    
  }
  return (
   <header className='h-16 bg-gray-300 border fixed w-full z-50'>
    <div className='container h-full mx-auto flex justify-between items-center'>
        <div className=''>
          <Link to={"/"}>
          <img src={LOGO} alt="Logo" className='w-22 h-5'/>
          </Link>
        </div> 
        <div className='hidden lg:flex items-center border rounded-full w-full justify-between max-w-sm focus-within:shadow'>
          <div className='hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow pl-2 border-2 border-slate-500'>
            <input type="text" placeholder='Search' className='w-full outline-none border-none rounded-full bg-transparent' onChange={handleSearch} value={search}/>
            <div className='cursor-pointer text-2xl min-w-[50px] h-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 flex items-center justify-center rounded-r-full text-white'>
              <BiSearchAlt/>
            </div>
          </div>
          
          
          
        </div>
        <div className='flex gap-4 items-center'> 
          

           <div className='relative flex justify-center'>
            {
              user?._id && (
                <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(preve => ! preve)}>
           {
              user?.profilePic ? (
                <img src={user?.profilePic} alt={user?.name} className='w-8 h-8 rounded-full' />
              ) : (
                <FaUser />
              )
            }
           </div>
              )
            }
            
           

            
              {
                menuDisplay && (
                  <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
                  <nav>
                    {
                      user?.role === ROLE.ADMIN && (
                        <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => ! preve)}>Admin panel</Link>

                      )  
                   }


              </nav>
              </div>
                )
              }
              
            
          
          
          </div>
          {
            user?._id && (
              <Link to={'/cart'} className='text-3xl cursor-pointer relative'>
              <span><FaCartShopping /></span>
              <div className='bg-blue-600 h-4 text-white w-4 flex items-center justify-center rounded-full absolute -right-1 -top-1'>
                <p className='text-sm text-white'>{context?.cartProductCount}</p>
              </div>
              </Link>

            )
          }
          <div className='flex gap-2 items-center'>
            {
              user?._id ? (
                <button onClick={handleLogout} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Out</button>
              ):(
                <Link to={"/login"} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</Link>
              ) 
            }
            

            
          </div>
          </div>

         
    </div>
   </header>
  )
}
export default Header
