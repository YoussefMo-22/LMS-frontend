import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

interface RoleBasedRouterProps {
  allowedRoles: ('student' | 'instructor' | 'admin')[];
  redirectTo?: string;
  requireActiveStatus?: boolean;
}

const RoleBasedRouter: React.FC<RoleBasedRouterProps> = ({ 
  allowedRoles, 
  redirectTo = '/not-authorized',
  requireActiveStatus = true
}) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-400"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check if user role is allowed
  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={redirectTo} replace />;
  }

  // Check if user status is active (if required)
  if (requireActiveStatus && user.status && user.status !== 'active') {
    if (user.status === 'suspended') {
      return <Navigate to="/account-suspended" replace />;
    }
    if (user.status === 'pending') {
      return <Navigate to="/account-pending" replace />;
    }
    return <Navigate to="/account-inactive" replace />;
  }

  return <Outlet />;
};

export default RoleBasedRouter; 