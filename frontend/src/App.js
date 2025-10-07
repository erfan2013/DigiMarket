import { Outlet, useLocation } from 'react-router-dom';
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

function App() {
  const dispatch = useDispatch();
  const [cartProductCount, setCartProductCount] = useState(0);

  // 👇 مسیر فعلی برای تصمیم‌گیری نمایش/عدم نمایش هدر/فوتر
  const { pathname } = useLocation();
  const HIDE_CHROME_ON = ['/login', '/signup'];
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
