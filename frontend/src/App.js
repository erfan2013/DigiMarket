import { Outlet, useLocation ,Link } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from 'react';
import SummaryApi from './common';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './Store/UserSlice';
import { authHeaders } from './common/auth';
import { MdOutlineHome } from "react-icons/md";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // 👇 مسیر فعلی برای تصمیم‌گیری نمایش/عدم نمایش هدر/فوتر
  const { pathname } = useLocation();
  const HIDE_CHROME_ON = ['/login', '/sign-up'];
  const hideChrome = HIDE_CHROME_ON.some(
    p => pathname === p || pathname.startsWith(p + '/')
  );

  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
      cache: 'no-store',
      headers: { ...authHeaders() },
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data));
    }
  };

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCart.url, {
      method: SummaryApi.countAddToCart.method,
      credentials: 'include',
      cache: 'no-store',
      headers: { 'Content-Type': 'application/json', ...authHeaders() },
    });
    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count || 0);
  };

  useEffect(() => {
    fetchUserDetails();
    fetchUserAddToCart();
  }, []);

  return (
    <Context.Provider
      value={{
        fetchUserDetails,
        cartProductCount,
        fetchUserAddToCart,
      }}
    >
      <div className="min-h-screen flex flex-col">
        <ToastContainer position="top-left" autoClose={1000} />

        {/* فقط وقتی auth page نیست هدر رو نشون بده */}
        {!hideChrome && <Header />}

        {
          hideChrome && (
            <Link to="/" 
            className=" ml-5 fixed left-4 top-4 z-50 inline-flex items-center gap-2 rounded-xl
                      px-3 py-1.5 text-sm font-medium
                      bg-white/10 text-white ring-1 ring-white/20 backdrop-blur
                      hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white/40"
           aria-label="Back to home">
              {/* Add content inside the Link, e.g. a home icon or text */}
              <span>
                <MdOutlineHome className='text-white text-5xl' />
              </span>
            </Link>
          )
        }

        {/* اگر هدر داریم، فاصله‌ی بالای مین رو بذاریم؛
            Header ارتفاع h-16 (4rem) داره، پس pt-16 دقیقا فیت می‌شه */}
        <main className={`flex-1 ${hideChrome ? '' : 'pt-16'}`}>
          <Outlet />
        </main>

        {/* فوتر هم روی صفحات ورود/ثبت‌نام مخفی بشه */}
        {!hideChrome && <Footer />}
      </div>
    </Context.Provider>
  );
}

export default App;




// import { Outlet } from 'react-router-dom';
// import './App.css';
// import Header from './components/Header';
// import Footer from './components/Footer';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useEffect, useState } from 'react';
// import SummaryApi from './common';
// import Context from './context';
// import { useDispatch } from 'react-redux';
// import { setUserDetails } from './Store/UserSlice';
// import { authHeaders } from './common/auth';


// function App() {
//   const dispatch = useDispatch()
//   const [cartProductCount, setCartProductCount] = useState(0);
  

//   const fetchUserDetails = async () => {
//     const dataResponse = await fetch(SummaryApi.current_user.url, {
//       method: SummaryApi.current_user.method,
//       credentials: 'include',
//       cache: 'no-store',
//       headers: {
//         ...authHeaders(),
//       },

//     })
    
//     const dataApi = await dataResponse.json();

//     if (dataApi.success) {
//       dispatch(setUserDetails(dataApi.data))
//     }

    
//   }

//   const fetchUserAddToCart = async () => {
//     const dataResponse = await fetch(SummaryApi.countAddToCart.url, {
//       method: SummaryApi.countAddToCart.method,
//       credentials: 'include',
//       cache: 'no-store',
//       headers: {
//        'Content-Type': 'application/json',
//        ...authHeaders(),
//      },
//     })

//     const dataApi = await dataResponse.json();
//     setCartProductCount(dataApi?.data?.count)
//   }
    

//   useEffect(() => {
//     fetchUserDetails()
//     fetchUserAddToCart()
//   }, []);
//   return (
//     <>
//     <Context.Provider value={{
//       fetchUserDetails, // User Details Fetch
//       cartProductCount, // current user add to cart count
//       fetchUserAddToCart // current user add to cart count
//     }}>
//       <div className='min-h-screen flex flex-col'>
//         <ToastContainer
//     position='top-left'
//     autoClose={1000}
//     />
//     <Header />
//     <main className='flex-1 pt-20'>
//       <Outlet/>
//     </main>    
//     <Footer />
//       </div>
//     </Context.Provider>
//     </>
//   );
// }

// export default App;
