import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { ChevronDown, Menu, X } from "lucide-react";
import cart from "../../assets/shopping-cart.svg";
import noti from "../../assets/notification-bing.svg"
import profile from "../../assets/profile.png";
import SearchInput from "./SearchInput";
import Cookies from "js-cookie";


type NavbarLoginProps = {
  user: {
    name: string;
    email: string;
    profilePicture?: string;
    [key: string]: any;
  };
};

export default function NavbarLogin({ user }: NavbarLoginProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");

    navigate("/");
  };

  useEffect(() => {
    console.log("User in NavbarLogin:", user);
  }, [user]);

  return (
    <header className="bg-white container mx-auto">
      <nav className="container mx-auto p-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl text-primary-400 font-bold logo-bold">Level Up</h1>
        </Link>

        {/* Mobile Toggle */}
        <button className="xl:hidden text-primary-500" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Nav Links */}
        <div className={`absolute top-full left-0 w-full bg-white xl:bg-transparent xl:static xl:w-auto transition-all duration-300 ease-in-out ${isOpen ? "block" : "hidden"} xl:flex xl:items-center xl:space-x-6`}>
          <ul className="flex flex-col xl:flex-row items-center text-dark-500 xl:space-x-6 space-y-4 xl:space-y-0 px-4 py-4 xl:p-0">
            <li><NavLink to="/home" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>Home</NavLink></li>
            <li><NavLink to="/courses" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>My Courses</NavLink></li>
            <li><NavLink to="/quiz/1" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>Assignments</NavLink></li>
          </ul>

          {/* Search */}
          <div className="flex items-center justify-center mb-4 xl:mb-0 relative w-full xl:w-auto">
            <SearchInput />
          </div>

          {/* Icons */}
          <div className="flex flex-col xl:flex-row items-center space-y-4 xl:space-y-0 xl:space-x-4 px-4 pb-4 xl:p-0">
            <Link to={'/checkout'}><img src={cart} alt="Cart" /></Link>
            <img src={noti} alt="Notifications" />
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <div
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center space-x-2 xl:space-x-4 p-1 border border-primary-400 rounded-xl xl:rounded-full cursor-pointer"
            >
              <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center">
                <img src={user?.profilePicture || profile} alt="profile" />
              </div>
              <div className="text-primary-500 font-semibold">{user?.name || "Guest"}</div>
              <ChevronDown color="#1b347c" />
            </div>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-md z-50">
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm text-red-600"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
