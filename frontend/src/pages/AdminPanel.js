import React, { useEffect } from 'react'
import { FaUser } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import { Link, Outlet ,useNavigate } from 'react-router-dom'
import ROLE from '../common/role'

const AdminPanel = () => {
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate();

    useEffect(() => {
      if(user?.role !== ROLE.ADMIN){
        navigate("/")
        }
    },[user,navigate])



  return (
    <div className='min-h-[calc(100vh-120px)] md:flex hidden'>
      <aside className='min-h-full w-full max-w-72 custumShadow bg-[#EDF3FA] dark:bg-[#EDF3FA] border-r border-[#C6D6E6] sidebar sticky self-start p-4 rounded-xl top-[84px]'>
        <div className='h-32 flex items-center justify-center flex-col'>
        <div className='text-5xl cursor-pointer relative flex items-center justify-center py-4'>
           {user?.avatar || user?.profilePic ? (
                  <img
                    src={user?.avatar || user?.profilePic}
                    alt={user?.name}
                    className="w-16 h-16 rounded-full"
                  />
                ) : (
                  <FaUser />
                )}
           </div>
           <p className='capitalize block mb-2 text-sm font-medium text-gray-900 '>{user?.name}</p>
           <p className='capitalize block mb-2 text-sm font-sm text-gray-900'>{user?.role}</p>
        </div>
        <div>
          <nav className='grid p-4'>
            <Link to={"all-users"} className='px-2 py-1 hover:bg-stone-100'>All Users</Link>
            <Link to={"all-products"} className='px-2 py-1 hover:bg-stone-100'>Products</Link>
            <Link to={"home-slider"} className='px-2 py-1 hover:bg-stone-100'>Home Slider</Link>
          </nav>
        </div>
      </aside>

      <main className='w-full h-full p-2 page'>
            <Outlet/>
      </main>
    </div>
  )
}

export default AdminPanel



