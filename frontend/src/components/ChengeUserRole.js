import React, { useState } from 'react'
import ROLE from '../common/role'
import { IoMdCloseCircle } from "react-icons/io";
import SummaryApi from '../common';
import { toast } from 'react-toastify';

const ChengeUserRool = ({
    name,
    email,
    role,
    userId,
    onclose,
    callfunc,
}) => {

    const [userRole,setUserRole] = useState(role);



    const handleOnChengeSelected = (e) => {
            setUserRole(e.target.value)


    }

    const updateUserRole = async() => {
       const fetchResponse = await fetch(SummaryApi.updateUser.url,{
        method: SummaryApi.updateUser.method,
        credentials : "include",
        headers: {
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            userId : userId,
            role : userRole
        })
       })

       const responseData = await fetchResponse.json()

       if(responseData.success){
        toast.success(responseData.message)
        onclose()
        callfunc()

    }

       console.log("role updated",responseData);
       
    }
  return (
    <div className='fixed top-0 left-0 bottom-0 right-0 w-full h-full z-10 flex justify-between items-center bg-[var(--surface-2)] bg-opacity-60'>
      <div className='mx-auto bg-[var(--surface)] shadow-md p-4 w-full max-w-sm'>


        <button className='text-2xl block ml-auto btn btn-ghost' onClick={onclose}>
        <IoMdCloseCircle />
        </button>






        <h1 className='pb-4 text-lg font-md'>chenge roll</h1>
        <p> Name : {name}</p>
        <p> Email : {email}</p>
        <div className='flex items-center justify-between my-4'>
        <p>Role :</p>
        <select className='px-4 py-1 ui-input' value={userRole} onChange={handleOnChengeSelected}>
    {
        Object.values(ROLE).map(el => {

            return (
                <option value={el} key={el}>{el}</option>
            )
        })
    }
        </select>
        </div>
        <button className='w-fit mx-auto block text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center btn btn-ghost' onClick={updateUserRole}>Chenge roll</button>
      </div>
    </div>
  )
}

export default ChengeUserRool
