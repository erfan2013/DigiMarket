// src/pages/AllUsers.jsx
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import moment from 'moment';
import { MdDelete, MdEdit } from "react-icons/md";
import ChangeUserRole from '../components/ChengeUserRole';
import { authHeaders } from '../common/auth';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { LuSearch } from 'react-icons/lu';

function useDebounce(value, delay = 400) {
  const [v, setV] = useState(value);
  useEffect(() => { const id = setTimeout(()=>setV(value), delay); return ()=>clearTimeout(id); }, [value, delay]);
  return v;
}

export default function AllUsers() {
  const me = useSelector(s => s?.user?.user);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);

  const [openUpdateRole, setOpenUpdateRole] = useState(false);
  const [u, setU] = useState(null); // کاربر انتخابی برای ادیت

  const [q, setQ] = useState("");
  const dq = useDebounce(q, 400);

  const fetchAllUsers = async () => {
    try {
      setLoading(true);
      const url = SummaryApi.allUser.url + (dq ? `?q=${encodeURIComponent(dq)}` : "");
      const res = await fetch(url, {
        method: SummaryApi.allUser.method, credentials: "include",
        headers: { ...authHeaders(), "cache-control": "no-cache" },
      });
      const data = await res.json();
      if (res.status === 401 || !data.success) {
        setRows([]); toast.error(data.message || "Unauthorized"); return;
      }
      setRows(data.data || []);
    } catch (e) {
      toast.error(e.message || "Network error"); setRows([]);
    } finally { setLoading(false); }
  };

  useEffect(() => { fetchAllUsers(); /* eslint-disable-next-line */ }, [dq]);

  const handleDeleteUser = async (userId) => {
    if (!userId) return;
    if (String(userId) === String(me?._id)) { toast.error("You can't delete your own account"); return; }
    if (!window.confirm("Delete this user?")) return;
    try {
      const res = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
        method: SummaryApi.deleteUser.method, credentials: "include",
        headers: { ...authHeaders(), "cache-control": "no-cache" },
      });
      const data = await res.json();
      if (data.success) { toast.success("User deleted"); fetchAllUsers(); }
      else toast.error(data.message || "Failed to delete user");
    } catch (e) { toast.error(e.message || "Network error"); }
  };

  const roleColor = (role) => role === "ADMIN" ? "purple" : role === "GENERAL" ? "amber" : "green";

  return (
    <div className="p-4">
      <Card>
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-3">
            <CardTitle>All Users</CardTitle>
            <div className="text-sm text-slate-500">{rows.length} users</div>
          </div>
          <div className="relative w-full max-w-md">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              placeholder="Search by first/last name or email…"
              value={q} onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
            />
          </div>
        </CardHeader>

        <CardContent>
          <div className="overflow-auto rounded-2xl border border-slate-100">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-700">
                <tr>
                  <th className="px-4 py-3">#</th>
                  <th className="px-4 py-3">firstName</th>
                  <th className="px-4 py-3">lastName</th>
                  <th className="px-4 py-3">Email</th>
                  <th className="px-4 py-3">Role</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading && Array.from({ length: 6 }).map((_, i) => (
                  <tr key={i} className="border-t">
                    <td className="px-4 py-3"><div className="h-4 w-6 bg-slate-200 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-slate-200 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-slate-200 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-40 bg-slate-200 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-16 bg-slate-200 animate-pulse rounded-full" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-28 bg-slate-200 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-8 w-28 bg-slate-200 animate-pulse rounded-xl" /></td>
                  </tr>
                ))}

                {!loading && rows.map((el, index) => (
                  <tr key={el?._id} className="border-t last:border-b-0 hover:bg-slate-50/60">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{el?.firstName || ""}</td>
                    <td className="px-4 py-3">{el?.lastName  || ""}</td>
                    <td className="px-4 py-3">{el?.email}</td>
                    <td className="px-4 py-3">
                      <Badge color={roleColor(el?.role)}>{el?.role || "USER"}</Badge>
                    </td>
                    <td className="px-4 py-3">{el?.createdAt ? moment(el.createdAt).format('LL') : "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-100 text-green-800 hover:bg-green-200"
                          onClick={() => { setU(el); setOpenUpdateRole(true); }}
                          title="Edit role"
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-50"
                          onClick={() => handleDeleteUser(el?._id)}
                          disabled={String(el?._id) === String(me?._id)}
                          title="Delete user"
                        >
                          <MdDelete /> Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}

                {!loading && rows.length === 0 && (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-500">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {openUpdateRole && u && (
        <ChangeUserRole
          onclose={() => { setOpenUpdateRole(false); setU(null); }}
          userId={u._id}
          firstName={u.firstName}
          lastName={u.lastName}
          email={u.email}
          role={u.role}
          callfunc={fetchAllUsers}
        />
      )}
    </div>
  );
}




// // src/pages/AllUsers.jsx
// import React, { useEffect, useState } from 'react';
// import { useSelector } from 'react-redux';
// import SummaryApi from '../common';
// import { toast } from 'react-toastify';
// import moment from 'moment';
// import { MdDelete, MdEdit } from "react-icons/md";
// import ChangeUserRole from '../components/ChengeUserRole';
// import { authHeaders } from '../common/auth';
// import Badge from '../components/ui/Badge';
// import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
// import { LuSearch } from 'react-icons/lu';

// function useDebounce(value, delay = 400) {
//   const [v, setV] = useState(value);
//   useEffect(() => {
//     const id = setTimeout(() => setV(value), delay);
//     return () => clearTimeout(id);
//   }, [value, delay]);
//   return v;
// }

// export default function AllUsers() {
//   const me = useSelector(s => s?.user?.user);

//   const [rows, setRows] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const [openUpdateRole, setOpenUpdateRole] = useState(false);
//   const [updateUserDetails, setUpdateUserDetails] = useState({
//     email: "", name: "", role: "", _id: ""
//   });

//   const [q, setQ] = useState("");
//   const dq = useDebounce(q, 400);

//   const fetchAllUsers = async () => {
//     try {
//       setLoading(true);
//       const url = SummaryApi.allUser.url + (dq ? `?q=${encodeURIComponent(dq)}` : "");
//       const res = await fetch(url, {
//         method: SummaryApi.allUser.method,
//         credentials: "include",
//         headers: { ...authHeaders(), "cache-control": "no-cache" },
//       });

//       if (res.status === 401) {
//         toast.error("Unauthorized. Please login as admin.");
//         setRows([]);
//         return;
//       }

//       const data = await res.json();
//       if (data.success) setRows(data.data || []);
//       else {
//         toast.error(data.message || "Failed to load users");
//         setRows([]);
//       }
//     } catch (e) {
//       toast.error(e.message || "Network error");
//       setRows([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // ✅ این تابع اینجاست و در JSX استفاده می‌شود
//   const handleDeleteUser = async (userId) => {
//     if (!userId) return;
//     if (String(userId) === String(me?._id)) {
//       toast.error("You can't delete your own account");
//       return;
//     }
//     if (!window.confirm("Delete this user?")) return;

//     try {
//       const res = await fetch(`${SummaryApi.deleteUser.url}/${userId}`, {
//         method: SummaryApi.deleteUser.method, // DELETE
//         credentials: "include",
//         headers: { ...authHeaders(), "cache-control": "no-cache" },
//       });
//       const data = await res.json();
//       if (data.success) {
//         toast.success("User deleted");
//         fetchAllUsers();
//       } else {
//         toast.error(data.message || "Failed to delete user");
//       }
//     } catch (e) {
//       toast.error(e.message || "Network error");
//     }
//   };

//   useEffect(() => { fetchAllUsers(); /* eslint-disable-next-line */ }, [dq]);

//   const roleColor = (role) =>
//     role === "ADMIN" ? "purple" :
//     role === "manager" ? "amber" :
//     "green";

//   return (
//     <div className="p-4">
//       <Card>
//         <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
//           <div className="flex items-center gap-3">
//             <CardTitle>All Users</CardTitle>
//             <div className="text-sm text-slate-500">{rows.length} users</div>
//           </div>

//           <div className="relative w-full max-w-md">
//             <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
//             <input
//               placeholder="Search by name or email…"
//               value={q}
//               onChange={(e) => setQ(e.target.value)}
//               className="w-full rounded-xl border border-slate-200 pl-9 pr-3 py-2 text-sm outline-none focus:border-slate-400 focus:ring-2 focus:ring-slate-200"
//             />
//           </div>
//         </CardHeader>

//         <CardContent>
//           <div className="overflow-auto rounded-2xl border border-slate-100">
//             <table className="w-full text-left text-sm">
//               <thead className="bg-slate-50 text-slate-700">
//                 <tr>
//                   <th className="px-4 py-3">#</th>
//                   <th className="px-4 py-3">firstName</th>
//                   <th className="px-4 py-3">lastName</th>
//                   <th className="px-4 py-3">Email</th>
//                   <th className="px-4 py-3">Role</th>
//                   <th className="px-4 py-3">Created</th>
//                   <th className="px-4 py-3">Action</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {loading && Array.from({ length: 6 }).map((_, i) => (
//                   <tr key={i} className="border-t">
//                     <td className="px-4 py-3"><div className="h-4 w-6 bg-slate-200 animate-pulse rounded" /></td>
//                     <td className="px-4 py-3"><div className="h-4 w-32 bg-slate-200 animate-pulse rounded" /></td>
//                     <td className="px-4 py-3"><div className="h-4 w-40 bg-slate-200 animate-pulse rounded" /></td>
//                     <td className="px-4 py-3"><div className="h-5 w-16 bg-slate-200 animate-pulse rounded-full" /></td>
//                     <td className="px-4 py-3"><div className="h-4 w-28 bg-slate-200 animate-pulse rounded" /></td>
//                     <td className="px-4 py-3"><div className="h-8 w-28 bg-slate-200 animate-pulse rounded-xl" /></td>
//                   </tr>
//                 ))}

//                 {!loading && rows.map((el, index) => (
//                   <tr key={el?._id} className="border-t last:border-b-0 hover:bg-slate-50/60">
//                     <td className="px-4 py-3">{index + 1}</td>
//                     <td className="px-4 py-3">{el?.name}</td>
//                     <td className="px-4 py-3">{el?.email}</td>
//                     <td className="px-4 py-3">
//                       <Badge color={roleColor(el?.role)}>{el?.role || "USER"}</Badge>
//                     </td>
//                     <td className="px-4 py-3">{el?.createdAt ? moment(el.createdAt).format('LL') : "-"}</td>
//                     <td className="px-4 py-3">
//                       <div className="flex items-center gap-2">
//                         <button
//                           className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-100 text-green-800 hover:bg-green-200"
//                           onClick={() => { setUpdateUserDetails(el); setOpenUpdateRole(true); }}
//                           title="Edit role"
//                         >
//                           <MdEdit /> Edit
//                         </button>

//                         <button
//                           className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 disabled:opacity-50"
//                           onClick={() => handleDeleteUser(el?._id)}
//                           disabled={String(el?._id) === String(me?._id)}
//                           title="Delete user"
//                         >
//                           <MdDelete /> Delete
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}

//                 {!loading && rows.length === 0 && (
//                   <tr>
//                     <td colSpan={6} className="px-4 py-8 text-center text-slate-500">
//                       No users found.
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </CardContent>
//       </Card>

//       {openUpdateRole && (
//         <ChangeUserRole
//           onclose={() => setOpenUpdateRole(false)}
//           firstname={updateUserDetails.firstname}
//           lastname={updateUserDetails.lastname}
//           email={updateUserDetails.email}
//           role={updateUserDetails.role}
//           userId={updateUserDetails._id}
//           callfunc={fetchAllUsers}
//         />
//       )}
//     </div>
//   );
// }
