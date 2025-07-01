import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../shared/store";

const PrivateRoute: React.FC = () => {
  const token = useSelector((state: RootState) => state.auth.token) || localStorage.getItem("token");
  const location = useLocation();

  return true ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default PrivateRoute;