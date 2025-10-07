import React, { useContext, useState } from 'react';
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
import Button from './ui/Button';

export default function Header() {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchinput = useLocation();
  const URLSerach = new URLSearchParams(searchinput?.search);
  const serachQuery = URLSerach.get("q") || "";
  const [search, setSearch] = useState(serachQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    } else {
      toast.error(data.message || "Logout failed");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) navigate(`/search?q=${value}`);
    else navigate(`/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
            <span className="font-bold text-slate-900">DigiMarket</span>
          </Link>
        </div>

        {/* Middle: Search */}
        <div className="hidden md:flex items-center w-full max-w-md">
          <div className="flex items-center w-full rounded-2xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-400 bg-white">
            <input
              type="text"
              placeholder="Search products…"
              className="w-full h-10 px-3 rounded-l-2xl bg-transparent outline-none text-sm"
              onChange={handleSearch}
              value={search}
            />
            <div className="px-3 text-xl">
              <BiSearchAlt />
            </div>
          </div>
        </div>

        {/* Right: User / Cart */}
        <div className="flex items-center gap-4">
          {user?._id && (
            <Link to="/cart" className="relative">
              <FaCartShopping className="text-2xl text-slate-800" />
              <div className="absolute -right-2 -top-2 h-5 min-w-[20px] rounded-full bg-blue-600 text-white text-xs flex items-center justify-center px-1">
                {context?.cartProductCount || 0}
              </div>
            </Link>
          )}

          {user?._id ? (
            <div className="relative">
              <button
                className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50"
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic
                  ? <img src={user?.profilePic} alt={user?.name || "avatar"} className="h-full w-full object-cover" />
                  : <FaUser className="m-auto text-slate-600" />
                }
              </button>

              {menuDisplay && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white shadow-xl p-2">
                  <nav className="grid">
                    <Link
                      to="/profile"
                      className="px-3 py-2 rounded-xl hover:bg-slate-100"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Profile
                    </Link>

                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="px-3 py-2 rounded-xl hover:bg-slate-100"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin panel
                      </Link>
                    )}

                    <Button
                      variant="secondary"
                      className="mt-1"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login">
              <Button>Sign in</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}






// import React, { useContext, useEffect, useRef, useState } from "react";
// import LOGO from "../assest/LOGO.png";
// import { BiSearchAlt } from "react-icons/bi";
// import { FaUser } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import SummaryApi from "../common";
// import { toast } from "react-toastify";
// import { setUserDetails } from "../Store/UserSlice";
// import ROLE from "../common/role";
// import Context from "../context";
// import { authHeaders } from "../common/auth";

// const Header = () => {
//   const user = useSelector((state) => state?.user?.user);
//   const dispatch = useDispatch();
//   const [menuDisplay, setMenuDisplay] = useState(false);
//   const context = useContext(Context);
//   const navigate = useNavigate();

//   const searchinput = useLocation();
//   const URLSearch = new URLSearchParams(searchinput?.search);
//   const searchQuery = URLSearch.get("q") || ""; // ← به جای getAll
//   const [search, setSearch] = useState(searchQuery);

//   // بستن منو با کلیک خارج
//   const menuRef = useRef(null);
//   useEffect(() => {
//     const handler = (e) => {
//       if (menuRef.current && !menuRef.current.contains(e.target)) {
//         setMenuDisplay(false);
//       }
//     };
//     document.addEventListener("click", handler);
//     return () => document.removeEventListener("click", handler);
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const res = await fetch(SummaryApi.logout_user.url, {
//         method: SummaryApi.logout_user.method,
//         credentials: "include",
//         headers: { ...authHeaders() }, // بی‌ضرر، اگر بک‌اند لازم ندارد حذفش کن
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success(data.message || "Signed out");
//         dispatch(setUserDetails(null));
//         navigate("/");
//       } else {
//         toast.error(data.message || "Sign out failed");
//       }
//     } catch (e) {
//       toast.error(e?.message || "Network error");
//     }
//   };

//   const handleSearch = (e) => {
//     const { value } = e.target;
//     setSearch(value);

//     if (value) {
//       navigate(`/search?q=${encodeURIComponent(value)}`);
//     } else {
//       navigate(`/`); // ← تایپو "searrch" اصلاح شد
//     }
//   };

//   return (
//     <header className="h-16 bg-gray-300 border fixed w-full z-50">
//       <div className="container h-full mx-auto flex justify-between items-center">
//         {/* Logo */}
//         <div>
//           <Link to={"/"}>
//             <img src={LOGO} alt="Logo" className="w-22 h-5" />
//           </Link>
//         </div>

//         {/* Search */}
//         <div className="hidden lg:flex items-center border rounded-full w-full justify-between max-w-sm focus-within:shadow">
//           <div className="hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow pl-2 border-2 border-slate-500">
//             <input
//               type="text"
//               placeholder="Search"
//               className="w-full outline-none border-none rounded-full bg-transparent"
//               onChange={handleSearch}
//               value={search}
//             />
//             <div className="cursor-pointer text-2xl min-w-[50px] h-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 flex items-center justify-center rounded-r-full text-white">
//               <BiSearchAlt />
//             </div>
//           </div>
//         </div>

//         {/* Right side */}
//         <div className="flex gap-4 items-center">
//           {/* User menu */}
//           {user?._id && (
//             <div className="relative flex justify-center" ref={menuRef}>
//               <div
//                 className="text-3xl cursor-pointer"
//                 onClick={() => setMenuDisplay((prev) => !prev)}
//               >
//                 {user?.avatar || user?.profilePic ? (
//                   <img
//                     src={user?.avatar || user?.profilePic}
//                     alt={user?.name}
//                     className="w-8 h-8 rounded-full"
//                   />
//                 ) : (
//                   <FaUser />
//                 )}
//               </div>

//               {menuDisplay && (
//                 <div className="absolute bg-white top-11 right-0 h-fit p-2 shadow-lg rounded min-w-40">
//                   <nav className="flex flex-col">
//                     {/* همیشه Profile را نشان بده */}
//                     <Link
//                       to={"/profile"}
//                       className="whitespace-nowrap hover:bg-slate-100 p-2"
//                       onClick={() => setMenuDisplay(false)}
//                     >
//                       Profile
//                     </Link>

//                     {/* فقط برای ادمین‌ها، Admin panel */}
//                     {user?.role === ROLE.ADMIN && (
//                       <Link
//                         to={"/admin-panel/all-products"}
//                         className="whitespace-nowrap hover:bg-slate-100 p-2"
//                         onClick={() => setMenuDisplay(false)}
//                       >
//                         Admin panel
//                       </Link>
//                     )}
//                   </nav>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Cart */}
//           {user?._id && (
//             <Link to={"/cart"} className="text-3xl cursor-pointer relative">
//               <span>
//                 <FaCartShopping />
//               </span>
//               <div className="bg-blue-600 h-4 text-white w-4 flex items-center justify-center rounded-full absolute -right-1 -top-1">
//                 <p className="text-sm text-white">
//                   {Number(context?.cartProductCount || 0)}
//                 </p>
//               </div>
//             </Link>
//           )}

//           {/* Auth button */}
//           <div className="flex gap-2 items-center">
//             {user?._id ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 Sign Out
//               </button>
//             ) : (
//               <Link
//                 to={"/login"}
//                 className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
//               >
//                 Sign In
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;












// import React, { useContext, useState } from 'react';
// import LOGO from '../assest/LOGO.png'
// import { BiSearchAlt } from "react-icons/bi";
// import { FaUser } from "react-icons/fa";
// import { FaCartShopping } from "react-icons/fa6";
// import { Link, useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import { setUserDetails } from '../Store/UserSlice';
// import ROLE from '../common/role';
// import Context from '../context';
// const Header = () => {
//   const user = useSelector(state => state?.user?.user)
//   const dispatch = useDispatch()
//   const [menuDisplay, setMenuDisplay] = useState(false);
//   const context = useContext(Context)
//   const navigate = useNavigate()
//   const searchinput = useLocation()
//   const URLSerach = new URLSearchParams(searchinput?.search)
//   const serachQuery = URLSerach.getAll("q")
//   const [search, setSearch] = useState(serachQuery)
//   const handleLogout = async() => {
//     const fetchData = await fetch(SummaryApi.logout_user.url,{
//       method: SummaryApi.logout_user.method,
//       credentials: "include",
//     })

//     const data = await fetchData.json() 

//     if(data.success){
//       toast.success(data.message)
//       dispatch(setUserDetails(null))
//       navigate('/')
//     }
//     if(data.error){
//       toast.error(data.message)
//     }
//   };
//   const handleSearch = (e) => {
//     const {value} = e.target
//     setSearch(value)

//     if(value){
//       navigate(`/search?q=${value}`)

//     }else{
//       navigate(`searrch`)
//     }

    
//     if(!value){
//       navigate(`/`)
//     }

    
//   }
//   return (
//    <header className='h-16 bg-gray-300 border fixed w-full z-50'>
//     <div className='container h-full mx-auto flex justify-between items-center'>
//         <div className=''>
//           <Link to={"/"}>
//           <img src={LOGO} alt="Logo" className='w-22 h-5'/>
//           </Link>
//         </div> 
//         <div className='hidden lg:flex items-center border rounded-full w-full justify-between max-w-sm focus-within:shadow'>
//           <div className='hidden lg:flex items-center w-full justify-between max-w-sm rounded-full focus-within:shadow pl-2 border-2 border-slate-500'>
//             <input type="text" placeholder='Search' className='w-full outline-none border-none rounded-full bg-transparent' onChange={handleSearch} value={search}/>
//             <div className='cursor-pointer text-2xl min-w-[50px] h-8 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 flex items-center justify-center rounded-r-full text-white'>
//               <BiSearchAlt/>
//             </div>
//           </div>
          
          
          
//         </div>
//         <div className='flex gap-4 items-center'> 
          

//            <div className='relative flex justify-center'>
//             {
//               user?._id && (
//                 <div className='text-3xl cursor-pointer' onClick={() => setMenuDisplay(preve => ! preve)}>
//            {
//               user?.profilePic ? (
//                 <img src={user?.profilePic} alt={user?.name} className='w-8 h-8 rounded-full' />
//               ) : (
//                 <FaUser />
//               )
//             }
//            </div>
//               )
//             }
            
           

            
//               {
//                 menuDisplay && (
//                   <div className='absolute bg-white bottom-0 top-11 h-fit p-2 shadow-lg rounded'>
//                   <nav>
//                     {
//                       user?.role === ROLE.ADMIN && (
//                         <Link to={'/admin-panel/all-products'} className='whitespace-nowrap hidden md:block hover:bg-slate-100 p-2' onClick={() => setMenuDisplay(preve => ! preve)}>Admin panel</Link>

//                       )  
//                    }


//               </nav>
//               </div>
//                 )
//               }
              
            
          
          
//           </div>
//           {
//             user?._id && (
//               <Link to={'/cart'} className='text-3xl cursor-pointer relative'>
//               <span><FaCartShopping /></span>
//               <div className='bg-blue-600 h-4 text-white w-4 flex items-center justify-center rounded-full absolute -right-1 -top-1'>
//                 <p className='text-sm text-white'>{context?.cartProductCount}</p>
//               </div>
//               </Link>

//             )
//           }
//           <div className='flex gap-2 items-center'>
//             {
//               user?._id ? (
//                 <button onClick={handleLogout} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign Out</button>
//               ):(
//                 <Link to={"/login"} className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</Link>
//               ) 
//             }
            

            
//           </div>
//           </div>

         
//     </div>
//    </header>
//   )
// }
// export default Header
