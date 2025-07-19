import { Link, NavLink } from "react-router-dom";
import { Home, BookOpen, Users, Settings, LogOut, ListChecks, Percent, CreditCard, BookOpenCheck, Video, DollarSign } from "lucide-react";

export default function InstructorSidebar() {
  // For demo, use a placeholder userId and courseId. In a real app, these would be dynamic.
  const exampleUserId = 'USER_ID';
  const exampleCourseId = 'COURSE_ID';
  return (
    <aside className="w-64 bg-white p-6 flex flex-col justify-between shadow-lg rounded-r-2xl">
      <div>
        <Link to="/instructor">
          <h1 className="text-3xl font-bold mb-8 text-primary-500 tracking-tight">
            Instructor
          </h1>
        </Link>
        <ul className="space-y-2">
          <li><NavLink to="/instructor" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Home className="w-5 h-5 text-primary-500" /> Dashboard</NavLink></li>
          <li><NavLink to="/instructor/courses" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><BookOpen className="w-5 h-5 text-primary-500" /> Courses</NavLink></li>
          <li><NavLink to={`/instructor/courses/${exampleCourseId}/lessons`} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><BookOpenCheck className="w-5 h-5 text-primary-500" /> Lessons</NavLink></li>
          <li><NavLink to={`/instructor/courses/${exampleCourseId}/live-sessions`} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Video className="w-5 h-5 text-primary-500" /> Live Sessions</NavLink></li>
          <li><NavLink to="/instructor/coupons" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Percent className="w-5 h-5 text-primary-500" /> Coupons</NavLink></li>
          <li><NavLink to="/instructor/payments" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><CreditCard className="w-5 h-5 text-primary-500" /> Payments</NavLink></li>
          <li><NavLink to="/instructor/earnings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><DollarSign className="w-5 h-5 text-primary-500" /> My Earnings</NavLink></li>
          <li><NavLink to={`/instructor/users/${exampleUserId}/enrollments`} className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><ListChecks className="w-5 h-5 text-primary-500" /> User Enrollments</NavLink></li>
          <li><NavLink to="/instructor/settings" className={({ isActive }) => `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${isActive ? "bg-primary-50 text-primary-600 shadow-sm" : "text-gray-700 hover:bg-primary-50 hover:text-primary-600"}`}><Settings className="w-5 h-5 text-primary-500" /> Settings</NavLink></li>
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