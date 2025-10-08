import React, { useContext, useState } from 'react';
import { BiSearchAlt } from "react-icons/bi";
import { FaUser } from "react-icons/fa";
import { FaCartShopping } from "react-icons/fa6";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../Store/UserSlice';
import ROLE from '../common/role';
import Context from '../context';
import Button from './ui/Button';


export default function Header() {
  const user = useSelector(state => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchinput = useLocation();
  const URLSerach = new URLSearchParams(searchinput?.search);
  const serachQuery = URLSerach.get("q") || "";
  const [search, setSearch] = useState(serachQuery);




  const HIDE_HEADER_PATHS = ['/login', '/sign-up'];
  if (HIDE_HEADER_PATHS.includes(searchinput?.pathname)) return null;
  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate('/');
    } else {
      toast.error(data.message || "Logout failed");
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) navigate(`/search?q=${value}`);
    else navigate(`/`);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
            <span className="font-bold text-slate-900">DigiMarket</span>
          </Link>
        </div>

        {/* Middle: Search */}
        <div className="hidden md:flex items-center w-full max-w-md">
          <div className="flex items-center w-full rounded-2xl border border-slate-300 focus-within:ring-2 focus-within:ring-blue-400 bg-white">
            <input
              type="text"
              placeholder="Search products…"
              className="w-full h-10 px-3 rounded-l-2xl bg-transparent outline-none text-sm"
              onChange={handleSearch}
              value={search}
            />
            <div className="px-3 text-xl">
              <BiSearchAlt />
            </div>
          </div>
        </div>

        {/* Right: User / Cart */}
        <div className="flex items-center gap-4">
          {user?._id && (
            <Link to="/cart" className="relative">
              <FaCartShopping className="text-2xl text-slate-800" />
              <div className="absolute -right-2 -top-2 h-5 min-w-[20px] rounded-full bg-blue-600 text-white text-xs flex items-center justify-center px-1">
                {context?.cartProductCount || 0}
              </div>
            </Link>
          )}

          {user?._id ? (
            <div className="relative">
              <button
                className="h-10 w-10 rounded-full overflow-hidden border border-slate-200 bg-slate-50"
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic
                  ? <img src={user?.profilePic} alt={user?.name || "avatar"} className="h-full w-full object-cover" />
                  : <FaUser className="m-auto text-slate-600" />
                }
              </button>

              {menuDisplay && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl border border-slate-100 bg-white shadow-xl p-2">
                  <nav className="grid">
                    <Link
                      to="/profile"
                      className="px-3 py-2 rounded-xl hover:bg-slate-100"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Profile
                    </Link>

                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="px-3 py-2 rounded-xl hover:bg-slate-100"
                        onClick={() => setMenuDisplay(false)}
                      >
                        Admin panel
                      </Link>
                    )}

                    <Button
                      variant="secondary"
                      className="mt-1"
                      onClick={handleLogout}
                    >
                      Sign out
                    </Button>
                  </nav>
                </div>
              )}
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login">
                <Button>Sign in</Button>
              </Link>
              <Link to="/sign-up">
                <Button className="bg-purple-950 text-white">Sign up</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}