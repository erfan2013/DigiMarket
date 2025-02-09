import React from 'react'
import { Link } from 'react-router-dom';
import LOGO from '../assest/LOGO.png'

const Footer = () => {
  return (

<footer className="bg-gray-300 rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <Link to="/">
            <img src={LOGO} alt="Logo" className='w-21 h-5 '/>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                <li>
                    <Link to={"/About"} className="hover:underline me-4 md:me-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white">About</Link>
                </li>
                <li>
                    <Link to={"/privacy-policy"} className="hover:underline me-4 md:me-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white">PrivacyPolicy</Link>
                </li>
                <li>
                    <Link to={"/licensing"} className="hover:underline me-4 md:me-6 block mb-2 text-sm font-medium text-gray-900 dark:text-white">License</Link>
                </li>
                <li>
                    <Link to={"/contact"} className="hover:underline block mb-2 text-sm font-medium text-gray-900 dark:text-white">Contact</Link>
                </li>
            </ul>
        </div>
        <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
        <span className="block mb-2 text-sm font-medium text-gray-900 dark:text-white sm:text-center">© 2024 <Link to="/" className="hover:underline">DigiMarket™</Link>. All Rights Reserved.</span>
    </div>
</footer>


  )
}

export default Footer
