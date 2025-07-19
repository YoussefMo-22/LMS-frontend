import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Home, BookOpen, FileText, MessageSquare, LogOut, Award, Upload, ChevronDown, LayoutDashboard } from "lucide-react";
import profile from "../../../assets/profile.png";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const DashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user from cookies
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-gray-800 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}>
        <aside className="w-64 bg-gray-800 p-6 flex flex-col justify-between h-full">
          <div>
            {/* Sidebar Header */}
            <div className="flex items-center mb-8">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
                <LayoutDashboard className="w-6 h-6 text-gray-800" />
              </div>
              <h1 className="text-2xl font-bold text-white">
                Dashboard
              </h1>
            </div>

            {/* Navigation */}
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/dashboard" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/dashboard' 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Home className="w-5 h-5 mr-3" />
                  Overview
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/courses" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/dashboard/courses' 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <BookOpen className="w-5 h-5 mr-3" />
                  My Courses
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/assignments" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/dashboard/assignments' 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <FileText className="w-5 h-5 mr-3" />
                  Assignments
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/submissions" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/dashboard/submissions' 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Upload className="w-5 h-5 mr-3" />
                  My Submissions
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/messages" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/dashboard/messages' 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <MessageSquare className="w-5 h-5 mr-3" />
                  Messages
                </Link>
              </li>
              <li>
                <Link 
                  to="/dashboard/certificates" 
                  className={`flex items-center px-4 py-3 rounded-lg transition-colors ${
                    location.pathname === '/dashboard/certificates' 
                      ? "bg-gray-700 text-white" 
                      : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <Award className="w-5 h-5 mr-3" />
                  Certificates
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>

            {/* User Profile Dropdown */}
            <div className="relative">
              <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50"
              >
                <img 
                  src={user?.profilePicture || profile} 
                  alt="Profile" 
                  className="w-8 h-8 rounded-full object-cover" 
                />
                <span className="text-sm font-medium text-gray-700">{user?.name || "User"}</span>
                <ChevronDown className="w-4 h-4 text-gray-400" />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                  <div className="py-1">
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};

export default DashboardLayout;