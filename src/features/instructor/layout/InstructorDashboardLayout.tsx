import React, { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  BookOpen, 
  FileText, 
  MessageSquare, 
  LogOut, 
  Award, 
  Upload, 
  Users, 
  Settings, 
  BarChart3, 
  CreditCard, 
  Calendar, 
  Plus, 
  ChevronDown, 
  GraduationCap, 
  User,
  Menu,
  X,
  Search,
  Video,
  DollarSign,
} from "lucide-react";
import Cookies from "js-cookie";

const InstructorDashboardLayout: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Get user from cookies
  const userCookie = Cookies.get("user");
  const user = userCookie ? JSON.parse(userCookie) : null;

  // Close sidebar on route change
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    Cookies.remove("user");
    Cookies.remove("token");
    navigate("/");
  };

  // Get user initials
  const getUserInitials = () => {
    if (!user?.name) return 'I';
    return user.name
      .split(' ')
      .map((name: string) => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  // Navigation items with proper routing
  const navigationItems = [
    { name: 'Overview', href: '/instructor', icon: Home, badge: null },
    { name: 'My Courses', href: '/instructor/courses', icon: BookOpen, badge: null },
    { name: 'Create Course', href: '/instructor/courses/create', icon: Plus, badge: null },
    { name: 'Students', href: '/instructor/students', icon: Users, badge: null },
    { name: 'Assignments', href: '/instructor/assignments', icon: FileText, badge: null },
    { name: 'Submissions', href: '/instructor/submissions', icon: Upload, badge: null },
    { name: 'Quizzes', href: '/instructor/quizzes', icon: Award, badge: null },
    { name: 'Live Sessions', href: '/instructor/live-sessions', icon: Video, badge: null },
    { name: 'Analytics', href: '/instructor/analytics', icon: BarChart3, badge: null },
    { name: 'Earnings', href: '/instructor/earnings', icon: DollarSign, badge: null },
    { name: 'Payments', href: '/instructor/payments', icon: CreditCard, badge: null },
    { name: 'Messages', href: '/instructor/messages', icon: MessageSquare, badge: null },
    { name: 'Calendar', href: '/instructor/calendar', icon: Calendar, badge: null },
    { name: 'Settings', href: '/instructor/settings', icon: Settings, badge: null },
  ];

  // Get current page title
  const getCurrentPageTitle = () => {
    const currentItem = navigationItems.find(item => item.href === location.pathname);
    return currentItem ? currentItem.name : 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-gradient-to-b from-secondary-600 to-secondary-700 shadow-xl transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out lg:translate-x-0`}>
        <aside className="w-64 h-full flex flex-col">
          {/* Sidebar Header */}
          <div className="flex items-center justify-between p-6 border-b border-secondary-500">
            <div className="flex items-center">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <GraduationCap className="w-6 h-6 text-secondary-600" />
              </div>
          <div>
                <h1 className="text-xl font-bold text-white">Instructor</h1>
                <p className="text-xs text-secondary-200">LevelUp LMS</p>
              </div>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md text-secondary-200 hover:text-white hover:bg-secondary-500"
            >
              <X className="w-5 h-5" />
            </button>
            </div>

            {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link 
                  key={item.name}
                  to={item.href}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all duration-200 group ${
                    isActive
                      ? "bg-white text-secondary-600 shadow-lg"
                      : "text-secondary-100 hover:bg-secondary-500 hover:text-white"
                  }`}
                >
                  <item.icon className={`w-5 h-5 mr-3 ${isActive ? 'text-secondary-600' : 'text-secondary-200 group-hover:text-white'}`} />
                  <span className="font-medium">{item.name}</span>
                  {item.badge && (
                    <span className="ml-auto bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Sidebar Footer */}
          <div className="p-4 border-t border-secondary-500">
            <div className="flex items-center px-4 py-3 rounded-xl bg-secondary-500">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center mr-3 text-secondary-600 font-semibold text-sm">
                {getUserInitials()}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">
                  {user?.name || "Instructor"}
                </p>
                <p className="text-xs text-secondary-200 truncate">
                  {user?.email || "instructor@levelup.com"}
                </p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              {/* Breadcrumb */}
              <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-500">
                <span>Instructor</span>
                <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
                <span className="text-gray-900 font-medium">{getCurrentPageTitle()}</span>
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="hidden md:flex items-center relative">
                <Search className="absolute left-3 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search courses, students..."
                  className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-secondary-500 focus:border-transparent"
                />
              </div>

              {/* Quick Actions */}
              <div className="hidden lg:flex items-center space-x-2">
                <Link
                  to="/instructor/courses/create"
                  className="flex items-center px-3 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors text-sm font-medium"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  New Course
                </Link>
              </div>

              {/* User Profile Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="w-8 h-8 bg-secondary-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                    {getUserInitials()}
                  </div>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700">{user?.name || "Instructor"}</p>
                    <p className="text-xs text-gray-500">Instructor</p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>

              {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-xl shadow-lg z-50 py-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user?.name || "Instructor"}</p>
                      <p className="text-sm text-gray-500">{user?.email || "instructor@levelup.com"}</p>
                    </div>
                    <div className="py-1">
                      <Link
                        to="/profile"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <User className="w-4 h-4 mr-3" />
                        Profile
                      </Link>
                      <Link
                        to="/instructor/settings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="w-4 h-4 mr-3" />
                        Settings
                      </Link>
                      <Link
                        to="/instructor/earnings"
                        className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <DollarSign className="w-4 h-4 mr-3" />
                        Earnings
                      </Link>
                  <button
                    onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                        <LogOut className="w-4 h-4 mr-3" />
                        Logout
                  </button>
                    </div>
                </div>
              )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
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

export default InstructorDashboardLayout; 