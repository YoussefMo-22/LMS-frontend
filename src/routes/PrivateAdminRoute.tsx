import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../shared/store";

const PrivateAdminRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;
  const isAdmin = user?.role === 'admin';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  if (!isAdmin) {
    return <Navigate to="/not-authorized" replace />;
  }
  return <Outlet />;
};

export default PrivateAdminRoute; 