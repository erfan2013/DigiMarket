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
  const [u, setU] = useState(null);

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
      {/* کادر بزرگ هم‌رنگ هدر */}
      <Card className="rounded-2xl border shadow-sm bg-[var(--surface)] border-[var(--surface-border)] ">
        {/* نوار بالای کارت (هم‌رنگ هدر/سرفیس؛ فقط ترنسپرنت تا با والد یکی باشه) */}
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between p-3 md:p-4 bg-transparent ">
          <div className="flex items-center gap-3">
            <CardTitle>All Users</CardTitle>
            <div className="text-sm text-[var(--text-muted)] dark:text-[var(--text-muted)]">{rows.length} users</div>
          </div>

          {/* سرچ باکسی که روی همین سرفیس جواب می‌دهد */}
          <div className="relative w-full max-w-md">
            <LuSearch className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-[var(--text-muted)] dark:text-[var(--text-muted)]" />
            <input
              placeholder="Search by first/last name or email…"
              value={q} onChange={(e) => setQ(e.target.value)}
              className="w-full rounded-xl border border-[var(--surface-border)]
                         bg-[var(--surface)]/60 dark:bg-[var(--surface)]/10
                         text-[var(--text)] dark:text-slate-100
                         pl-9 pr-3 py-2 text-sm outline-none
                         focus:ring-2 focus:ring-[#60A5FA]"
            />
          </div>
        </CardHeader>

        <CardContent>
          {/* همین باکس جدول هم‌رنگ هدر */}
          <div className="overflow-auto rounded-2xl ui-card">
            <table className="w-full text-left text-sm">
              <thead className="text-[var(--text-muted)] dark:text-slate-200 bg-[var(--surface)]/40 dark:bg-[var(--surface)]/5">
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
                  <tr key={i} className="border-t border-[var(--surface-border)]/60">
                    <td className="px-4 py-3"><div className="h-4 w-6 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-32 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-40 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-5 w-16 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded-full" /></td>
                    <td className="px-4 py-3"><div className="h-4 w-28 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded" /></td>
                    <td className="px-4 py-3"><div className="h-8 w-28 bg-[var(--surface)]/50 dark:bg-[var(--surface)]/10 animate-pulse rounded-xl" /></td>
                  </tr>
                ))}

                {!loading && rows.map((el, index) => (
                  <tr key={el?._id} className="border-t border-[var(--surface-border)]/60 hover:bg-[var(--surface)]/30 dark:hover:bg-[var(--surface)]/5">
                    <td className="px-4 py-3">{index + 1}</td>
                    <td className="px-4 py-3">{el?.firstName || ""}</td>
                    <td className="px-4 py-3">{el?.lastName  || ""}</td>
                    <td className="px-4 py-3">{el?.email}</td>
                    <td className="px-4 py-3">
                      <Badge color={roleColor(el?.role)}>
                        {el?.role || "USER"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">{el?.createdAt ? moment(el.createdAt).format('LL') : "-"}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-green-100 text-green-800 hover:bg-green-200 dark:bg-emerald-900/40 dark:text-emerald-200 dark:hover:bg-emerald-900/60 btn btn-ghost"
                          onClick={() => { setU(el); setOpenUpdateRole(true); }}
                          title="Edit role"
                        >
                          <MdEdit /> Edit
                        </button>
                        <button
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-rose-100 text-rose-700 hover:bg-rose-200 dark:bg-rose-900/40 dark:text-rose-200 dark:hover:bg-rose-900/60 disabled:opacity-50 btn btn-ghost"
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
                    <td colSpan={7} className="px-4 py-8 text-center text-[var(--text-muted)] dark:text-[var(--text-muted)]">
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