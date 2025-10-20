import React from 'react';
import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/LoginPage';
import ForgotPassword from '../pages/ForgotPaasword';
import SignUp from '../pages/SignUp';
import About from '../components/About';
import PrivacyPolicy from '../components/PrivacyPolicy';
import Licensing from '../components/Licence';
import Contact from '../components/Contact';
import AdminPanel from '../pages/AdminPanel';
import AllUsers from '../pages/AllUsers';
import AllProducts from '../pages/AllProducts';
import CategoryProduct from '../pages/CategoryProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../pages/Cart';
import SearchProduct from '../pages/SearchProduct';
import ProtectedRoute from './ProtectedRoute';
import Profile from '../pages/Profile';
import AdminRoute from './AdminRoute';
import ResetPassword from '../pages/ResetPasswords';
import AdminHomeSlider from '../components/AdminHomeSlider';

const router = createBrowserRouter([
        {
            path: '/',
            element: <App/>,
            children: [
                {
                    path: "",
                    element: <Home/>
                },
                {
                    path: "login",
                    element: <Login/>
                },
                {
                    path: "forgot-password",
                    element: <ForgotPassword/>
                },
                {
                    path: "sign-up",
                    element: <SignUp/>
                },
                {
                    path: "about",
                    element: <About/>
                },
                {
                    path: "privacy-policy",
                    element: <PrivacyPolicy/>
                },
                {
                    path: "licensing",
                    element: <Licensing/>
                },
                {
                    path: "contact",
                    element: <Contact/>
                },
                {
                 path: "product-category",
                 element: <CategoryProduct/>
                },
                {
                    path: "product/:id",
                    element: <ProductDetails/>
                },
                {
                    path: "cart",
                    element: <Cart />  
                },
                {
                    path: "search",
                    element: <SearchProduct/>
                },
            {
                path: "profile",
                element: <ProtectedRoute><Profile /></ProtectedRoute>
            },
            {
                path: "reset-password",
                element: <ResetPassword />
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />
            },
            {
                path: "admin-panel",
                element: 
                    <AdminRoute>
                    <AdminPanel/>
                    </AdminRoute>,
                children : 
                    [
                        {
                            path: "all-users",
                            element: <AllUsers/>
                        },
                        {
                            path: "all-products",
                            element: <AllProducts/>
                        },
                        {
                            path: "home-slider",
                            element: <AdminHomeSlider/>
                        },
                    ]

                        
                    
                },
            ]
        }
    
])
export default router;
