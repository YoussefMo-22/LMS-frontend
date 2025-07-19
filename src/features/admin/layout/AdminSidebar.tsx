import { Link, NavLink } from "react-router-dom";
import { Home, BookOpen, Users, Settings, LogOut, ListChecks, Percent, CreditCard, DollarSign, FileText, Star, Award } from "lucide-react";

export default function AdminSidebar() {
  return (
    <aside className="w-64 bg-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
      <div>
        <Link to="/admin">
          <h1 className="text-3xl font-bold mb-8 text-primary-500 tracking-tight">
            LevelUp Admin
          </h1>
        </Link>
        <ul className="space-y-2">
          <li><NavLink to="/admin" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Home className="w-5 h-5 text-primary-500" /> Dashboard</NavLink></li>
          <li><NavLink to="/admin/courses" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><BookOpen className="w-5 h-5 text-primary-500" /> Courses</NavLink></li>
          <li><NavLink to="/admin/enrollments" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><ListChecks className="w-5 h-5 text-primary-500" /> Enrollments</NavLink></li>
          <li><NavLink to="/admin/coupons" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Percent className="w-5 h-5 text-primary-500" /> Coupons</NavLink></li>
          <li><NavLink to="/admin/payments" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><CreditCard className="w-5 h-5 text-primary-500" /> Payments</NavLink></li>
          <li><NavLink to="/admin/earnings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><DollarSign className="w-5 h-5 text-primary-500" /> Instructor Earnings</NavLink></li>
          <li><NavLink to="/admin/quizzes" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><FileText className="w-5 h-5 text-primary-500" /> Quizzes</NavLink></li>
          <li><NavLink to="/admin/reviews" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Star className="w-5 h-5 text-primary-500" /> Reviews</NavLink></li>
          <li><NavLink to="/admin/certificates" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Award className="w-5 h-5 text-primary-500" /> Certificates</NavLink></li>
          <li><NavLink to="/admin/users" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Users className="w-5 h-5 text-primary-500" /> Users</NavLink></li>
          <li><NavLink to="/admin/settings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Settings className="w-5 h-5 text-primary-500" /> Settings</NavLink></li>
        </ul>
      </div>
      <div className="pt-6 border-t mt-6">
        <button className="w-full flex items-center justify-center gap-2 py-3 rounded-lg text-red-500 font-semibold hover:bg-red-50 transition-colors">
          <LogOut className="w-5 h-5" /> Logout
        </button>
      </div>
    </aside>
  );
} 