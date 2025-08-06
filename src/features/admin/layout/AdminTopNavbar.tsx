import React, { useState, useRef, useEffect } from "react";
import { ChevronDown, LogOut, User } from "lucide-react";
import { Link } from "react-router-dom";

interface AdminTopNavbarProps {
  user?: { name?: string; email?: string; profilePicture?: string };
  onLogout?: () => void;
}

const AdminTopNavbar: React.FC<AdminTopNavbarProps> = ({ user, onLogout }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="bg-white shadow px-8 py-4 flex items-center justify-between">
      <div className="text-2xl font-bold text-primary-500 tracking-tight">Admin Dashboard</div>
      <div className="relative" ref={dropdownRef}>
        <button
          className="flex items-center gap-3 px-4 py-2 rounded-lg bg-primary-50 hover:bg-primary-100 transition-colors focus:outline-none"
          onClick={() => setDropdownOpen((open) => !open)}
        >
          <img
            src={user?.profilePicture || "/src/assets/profile.png"}
            alt="Profile"
            className="w-9 h-9 rounded-full object-cover border border-primary-200"
          />
          <span className="font-medium text-gray-700">{user?.name || user?.email || "Admin"}</span>
          <ChevronDown className="w-4 h-4 text-primary-400" />
        </button>
        {dropdownOpen && (
          <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 py-2">
            <div className="px-4 py-2 border-b border-gray-100 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-400" />
              <div>
                <div className="font-semibold text-gray-800">{user?.name || "Admin"}</div>
                <div className="text-xs text-gray-500">{user?.email}</div>
              </div>
            </div>
            <Link to="profile" className="block px-4 py-2 text-gray-700 hover:bg-primary-50 transition-colors">Profile Page</Link>
            <button
              className="w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center gap-2"
              onClick={onLogout}
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default AdminTopNavbar; 