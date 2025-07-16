import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateInstructorRoute() {
  // Adjust this selector to match your auth/user slice
  const user = useSelector((state: any) => state.auth.user);
  const isInstructor = user?.role === 'instructor';

  if (!user) return <Navigate to="/login" replace />;
  if (!isInstructor) return <Navigate to="/" replace />;
  return <Outlet />;
} 