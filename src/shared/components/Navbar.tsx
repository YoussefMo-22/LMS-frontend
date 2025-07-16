import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-white container mx-auto">
      <nav className="container mx-auto p-4 flex items-center justify-between relative">
        {/* Logo */}
        <Link to="/">
          <h1 className="text-3xl font-bold logo-bold">
            Level Up
          </h1>
        </Link>

        {/* Mobile Toggle Button */}
        <button
          className="lg:hidden text-primary-500"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Navigation Links */}
        <div
          className={`absolute top-full left-0 w-full bg-white lg:bg-transparent lg:static lg:w-auto transition-all duration-300 ease-in-out ${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6`}
        >
          {/* <ul className="flex flex-col lg:flex-row items-center text-dark-500 lg:space-x-6 space-y-4 lg:space-y-0 px-4 py-4 lg:p-0">
            <li>
              <NavLink to="/home" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>
                Home Page
              </NavLink>
            </li>
            <li>
              <NavLink to="/about" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>
                About Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/contact" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>
                Contact Us
              </NavLink>
            </li>
            <li>
              <NavLink to="/services" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}>
                Services
              </NavLink>
            </li>
          </ul> */}

          {/* Auth Buttons */}
          <div className="flex flex-col lg:flex-row items-center space-y-4 lg:space-y-0 lg:space-x-4 px-4 pb-4 lg:p-0">
            <NavLink
              to="/register"
              className="border border-primary-500 text-primary-500 px-10 py-2 rounded-2xl hover:bg-primary-100 transition"
            >
              Join
            </NavLink>
            <NavLink
              to="/login"
              className="bg-primary-500 text-white px-10 py-2 rounded-2xl hover:bg-primary-600 transition"
            >
              Login
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
}