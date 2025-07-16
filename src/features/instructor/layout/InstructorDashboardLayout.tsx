import InstructorSidebar from '../components/InstructorSidebar';
import { Outlet } from 'react-router-dom';

export default function InstructorDashboardLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <InstructorSidebar />
      <main className="flex-1 p-6 md:p-10">
        <Outlet />
      </main>
    </div>
  );
} 