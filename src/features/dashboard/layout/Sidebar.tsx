import { Link, NavLink } from "react-router-dom";
import { Home, BookOpen, FileText, MessageSquare, LogOut } from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white p-6 flex flex-col justify-between">
      <div>
        <Link to="/">
          <h1 className="text-3xl font-bold logo-bold mb-8">
            Level Up
          </h1>
        </Link>
        <ul className="space-y-6">
          <li><NavLink to="/dashboard" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}><Home className="inline mr-2" /> Overview</NavLink></li>
          <li><NavLink to="/dashboard/courses" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}><BookOpen className="inline mr-2" /> My Courses</NavLink></li>
          <li><NavLink to="/dashboard/assignments" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}><FileText className="inline mr-2" /> Assignments</NavLink></li>
          <li><NavLink to="/dashboard/messages" className={({ isActive }) => isActive ? "text-primary-500 font-semibold" : ""}><MessageSquare className="inline mr-2" /> Messages</NavLink></li>
        </ul>
      </div>
      <button className="text-red-500 flex items-center">
        <LogOut className="mr-2" /> Logout
      </button>
    </aside>
  );
}