import { NavLink } from 'react-router-dom';

const navItems = [
  { to: '/instructor/courses', label: 'My Courses' },
  { to: '/instructor/assignments', label: 'Assignments' },
  { to: '/instructor/quizzes', label: 'Quizzes' },
  { to: '/instructor/coupons', label: 'Coupons' },
  { to: '/instructor/analytics', label: 'Analytics' },
];

export default function InstructorSidebar() {
  return (
    <aside className="w-full md:w-64 bg-white border-r min-h-screen flex flex-col py-6 px-2">
      <div className="mb-8 px-4">
        <h2 className="text-2xl font-bold text-primary-400">Instructor</h2>
      </div>
      <nav className="flex-1 space-y-2">
        {navItems.map(item => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `block px-4 py-2 rounded font-medium transition-colors ${
                isActive
                  ? 'bg-primary-100 text-primary-700'
                  : 'text-gray-700 hover:bg-primary-50'
              }`
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
} 