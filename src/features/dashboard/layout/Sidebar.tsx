import { Link, NavLink } from "react-router-dom";
import { Home, BookOpen, FileText, MessageSquare, LogOut, Award, Upload } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
      <div>
        <Link to="/">
          <h1 className="text-3xl font-bold mb-8 text-primary-500 tracking-tight">
            Level Up
          </h1>
        </Link>
        <ul className="space-y-2">
          <li><NavLink to="/dashboard" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Home className="w-5 h-5 text-primary-500" /> Overview</NavLink></li>
          <li><NavLink to="/dashboard/courses" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><BookOpen className="w-5 h-5 text-primary-500" /> My Courses</NavLink></li>
          <li><NavLink to="/dashboard/assignments" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><FileText className="w-5 h-5 text-primary-500" /> Assignments</NavLink></li>
          <li><NavLink to="/dashboard/submissions" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Upload className="w-5 h-5 text-primary-500" /> My Submissions</NavLink></li>
          <li><NavLink to="/dashboard/messages" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><MessageSquare className="w-5 h-5 text-primary-500" /> Messages</NavLink></li>
          <li><NavLink to="/dashboard/certificates" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Award className="w-5 h-5 text-primary-500" /> Certificates</NavLink></li>
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