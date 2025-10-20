import React, { useContext, useEffect, useState } from 'react';
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
import { getInitialTheme, applyTheme } from '../lib/theme';



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
  const [theme, setTheme] = useState(getInitialTheme());

 useEffect(() => {
    applyTheme(theme);
  }, [theme]);


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
    <header className="fixed appbar inset-x-0 top-0 z-50 border-[#B6C8DB] bg-[#B9CDE0]/85 backdrop-blur supports-[backdrop-filter]:bg-[#B9CDE0]/65">
      <div className="container mx-auto h-16 px-4 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-blue-600 via-blue-500 to-indigo-600" />
            <span className="font-bold text-[var(--text-muted)]">DigiMarket</span>
          </Link>
        </div>

        {/* Middle: Search */}
        <div className='flex mx-4  md:block'>
          <Link to="/" className="text-lg font-medium text-[var(--text-muted)]">
            Home
          </Link>
          <Link to="/product-category" className="ml-6 text-lg font-medium text-[var(--text-muted)]">
            Products
          </Link>
          <Link to="/about" className="ml-6 text-lg font-medium text-[var(--text-muted)]">
            About
          </Link>
          <Link to="/contact" className="ml-6 text-lg font-medium text-[var(--text-muted)]">
            Contact
          </Link>
        </div>


        {/* Right: User / Cart */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center max-w-md">
          <div className="flex items-center w-full rounded-2xl border focus-within:ring-2 focus-within:ring-blue-400 ui-toolbar">
            <input
              type="text"
              placeholder="Search products…"
              className="w-full h-4 px-3 rounded-l-2xl bg-transparent outline-none text-sm"
              onChange={handleSearch}
              value={search}
            />
            <div className="h-4 w-4 flex items-center justify-center rounded-r-2xl text-[var(--text-muted)]">
              <BiSearchAlt />
            </div>
          </div>
        </div>
          {user?._id && (
            <Link to="/cart" className="relative">
              <FaCartShopping className="text-2xl text-[var(--text)]" />
              <div className="absolute -right-2 -top-2 h-5 min-w-[20px] rounded-full bg-blue-600 text-white text-xs flex items-center justify-center px-1">
                {context?.cartProductCount || 0}
              </div>
            </Link>
          )}

          {user?._id ? (
            <div className="relative">
              <button
                className="h-10 w-10 rounded-full overflow-hidden text-[var(--text)] ui-card btn btn-ghost"
                onClick={() => setMenuDisplay(prev => !prev)}
              >
                {user?.profilePic
                  ? <img src={user?.profilePic} alt={user?.name || "avatar"} className="h-full w-full object-cover" />
                  : <FaUser className="text-[var(--text-muted)]" />
                }
              </button>

              {menuDisplay && (
                <div className="absolute right-0 mt-2 w-56 rounded-2xl shadow-xl p-2 ui-card">
                  <nav className="grid">
                    <Link
                      to="/profile"
                      className="px-3 py-2 rounded-xl hover:bg-[var(--surface-2)]"
                      onClick={() => setMenuDisplay(false)}
                    >
                      Profile
                    </Link>

                    {user?.role === ROLE.ADMIN && (
                      <Link
                        to="/admin-panel/all-products"
                        className="px-3 py-2 rounded-xl hover:bg-[var(--surface-2)]"
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
          <button
        type="button"
        onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
        className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm
             border border-[var(--surface-border)]/70 bg-[var(--surface)]/80 text-[var(--text)]
             hover:brightness-105 focus-visible:outline-none
             focus-visible:ring-2 focus-visible:ring-blue-400
             dark:border-white/10 dark:bg-[var(--surface)]/10 dark:text-slate-100"
             aria-label="Toggle theme"> {theme === 'dark' ? 'Light' : 'Dark'} </button>
        </div>
      </div>
    </header>
  );
}