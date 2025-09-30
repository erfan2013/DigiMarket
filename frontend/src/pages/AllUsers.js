import React, { useEffect, useState } from 'react'
import SummaryApi from '../common'
import { toast } from 'react-toastify'
import moment from 'moment'
import { MdEdit } from "react-icons/md";
import ChengeUserRool from '../components/ChengeUserRole';
import { authHeaders } from '../common/auth';
const AllUsers = () => {
    const [allUser, setAllUsers] = useState([]);
    const [openUpdateRole, setOpenUpdateRole] = useState(false);
    const [updateUserDetails, setUpdateUserDetails] = useState({
        email: "",
        name: "",
        role: "",
        _id: "",
        userId: "",
        

    })
    const fetchAllUsers = async() => {
        const res = await fetch(SummaryApi.allUser.url,{
            method: SummaryApi.allUser.method,
            credentials: "include",
            headers: {
         ...authHeaders(),                // ⭐️ هدر Bearer       },
         cache: "no-cache",
       },
        })

        const dataResponse = await res.json()
        if (res.status === 401) {
       toast.error('Unauthorized. Please login as admin.');
       return;
     }
        if(dataResponse.success){
            setAllUsers(dataResponse.data)
        }

        if(dataResponse.error){
            toast.error(dataResponse.massage)
        }
        if (dataResponse.error) {
            toast.error(dataResponse.message || 'Failed to load users');
        }
    }

    useEffect(() => {
        fetchAllUsers()
    },[])
  return (
    <div className='bg-white pb-4'>
        <table className='w-full userTable'>
            <thead>
               <tr className="bg-slate-600 text-white">
                <th>sr.</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Created date</th>
                <th>Action</th>
                
               </tr>
            </thead>
            <tbody>
                {
                    allUser.map((el, index) => {
                        return(
                            <tr key={el?._id}>
                                <td>{index+1}</td>
                                <td>{el?.name}</td>
                                <td>{el?.email}</td>
                                <td>{el?.role}</td>
                                <td>{moment(el?.createdAt).format('LL')}</td>
                                <td>
                                    <button className='bg-green-100 p-2 rounded-full hover:bg-green-500 hover:text-white' 
                                    onClick={()=>{
                                        setUpdateUserDetails(el)
                                        setOpenUpdateRole(true)
                                    
                                    }
                                    
                                    }
                                    
                                    >
                                    <MdEdit />
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>

        {
            openUpdateRole && (
                <ChengeUserRool onclose={()=> setOpenUpdateRole(false)} 
                name={updateUserDetails.name}
                email={updateUserDetails.email}
                role={updateUserDetails.role}
                userId={updateUserDetails._id}
                callfunc={fetchAllUsers}
                />
            )
        }
    </div>
  )
}

export default AllUsers
