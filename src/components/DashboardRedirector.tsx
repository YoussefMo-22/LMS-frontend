import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../features/auth/context/AuthContext';

const DashboardRedirector: React.FC = () => {
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

  // Check user status first
  if (user.status && user.status !== 'active') {
    switch (user.status) {
      case 'suspended':
        return <Navigate to="/account-suspended" replace />;
      case 'pending':
        return <Navigate to="/account-pending" replace />;
      case 'inactive':
        return <Navigate to="/account-inactive" replace />;
      default:
        return <Navigate to="/account-inactive" replace />;
    }
  }

  // Check if user needs to complete onboarding
  if (user.role === 'instructor' && !user.instructorProfile?.verified) {
    return <Navigate to="/instructor/onboarding" replace />;
  }

  // Redirect based on user role
  switch (user.role) {
    case 'student':
      return <Navigate to="/student-dashboard" replace />;
    case 'instructor':
      return <Navigate to="/instructor" replace />;
    case 'admin':
      return <Navigate to="/admin" replace />;
    default:
      return <Navigate to="/student-dashboard" replace />;
  }
};

export default DashboardRedirector; 