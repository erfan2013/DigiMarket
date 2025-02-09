import { Outlet } from 'react-router-dom';
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



function App() {
  const dispatch = useDispatch()
  const [cartProductCount, setCartProductCount] = useState(0);


  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: 'include',
     
    })
    const dataApi = await dataResponse.json();

    if (dataApi.success) {
      dispatch(setUserDetails(dataApi.data))
    }

    
  }

  const fetchUserAddToCart = async () => {
    const dataResponse = await fetch(SummaryApi.countAddToCart.url, {
      method: SummaryApi.countAddToCart.method,
      credentials: 'include',
    })

    const dataApi = await dataResponse.json();
    setCartProductCount(dataApi?.data?.count)
  }
    

  useEffect(() => {
    fetchUserDetails()
    fetchUserAddToCart()
    }
   , )
  return (
    <>
    <Context.Provider value={{
      fetchUserDetails, // User Details Fetch
      cartProductCount, // current user add to cart count
      fetchUserAddToCart // current user add to cart count
    }}>
    <ToastContainer
    position='top-left'
    autoClose={1000}
    />
    <Header />
    <main className='min-h-[calc(100vh- 110px)] pt-20 '>
      <Outlet/>
    </main>    
    <Footer />
    </Context.Provider>
    </>
  );
}

export default App;
