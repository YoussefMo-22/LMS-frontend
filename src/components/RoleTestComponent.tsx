import React from 'react';
import { useAuth } from '../features/auth/context/AuthContext';
import { useLocation } from 'react-router-dom';

const RoleTestComponent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
        <p className="mt-2 text-gray-600">Loading authentication...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-xl font-bold text-red-600 mb-4">Not Authenticated</h2>
        <p className="text-gray-600">Please log in to access the dashboard.</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Role-Based Dashboard Test</h1>
      
      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Current User Information</h2>
        <div className="space-y-2">
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> 
            <span className={`ml-2 px-2 py-1 rounded text-sm font-medium ${
              user?.role === 'admin' ? 'bg-red-100 text-red-800' :
              user?.role === 'instructor' ? 'bg-blue-100 text-blue-800' :
              'bg-green-100 text-green-800'
            }`}>
              {user?.role}
            </span>
          </p>
          <p><strong>User ID:</strong> {user?._id}</p>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <h2 className="text-lg font-semibold mb-4">Current Location</h2>
        <p><strong>Path:</strong> {location.pathname}</p>
        <p><strong>Search:</strong> {location.search || 'None'}</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg font-semibold mb-4">Available Dashboards</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <h3 className="font-medium">Student Dashboard</h3>
              <p className="text-sm text-gray-600">For users with 'student' role</p>
            </div>
            <a 
              href="/student-dashboard" 
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Access
            </a>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <h3 className="font-medium">Instructor Dashboard</h3>
              <p className="text-sm text-gray-600">For users with 'instructor' role</p>
            </div>
            <a 
              href="/instructor" 
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Access
            </a>
          </div>
          
          <div className="flex items-center justify-between p-3 border rounded">
            <div>
              <h3 className="font-medium">Admin Dashboard</h3>
              <p className="text-sm text-gray-600">For users with 'admin' role</p>
            </div>
            <a 
              href="/admin" 
              className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            >
              Access
            </a>
          </div>
        </div>
      </div>

      <div className="mt-6 text-center">
        <a 
          href="/dashboard" 
          className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
        >
          Auto-Redirect to My Dashboard
        </a>
      </div>
    </div>
  );
};

export default RoleTestComponent; 