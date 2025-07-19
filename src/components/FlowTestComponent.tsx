import React from 'react';
import { useAuth } from '../features/auth/context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';

const FlowTestComponent: React.FC = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

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
        <p className="text-gray-600 mb-4">Please log in to test the role-based navigation.</p>
        <button 
          onClick={() => navigate('/login')}
          className="px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700"
        >
          Go to Login
        </button>
      </div>
    );
  }

  const testNavigation = () => {
    navigate('/dashboard');
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Role-Based Dashboard Flow Test</h1>
      
      {/* Current User Info */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Current User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>User ID:</strong> {user?._id}</p>
          </div>
          <div>
            <p><strong>Role:</strong> 
              <span className={`ml-2 px-3 py-1 rounded-full text-sm font-medium ${
                user?.role === 'admin' ? 'bg-red-100 text-red-800' :
                user?.role === 'instructor' ? 'bg-blue-100 text-blue-800' :
                'bg-green-100 text-green-800'
              }`}>
                {user?.role?.toUpperCase()}
              </span>
            </p>
            <p><strong>Current Path:</strong> {location.pathname}</p>
            <p><strong>Authentication:</strong> 
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 rounded text-sm">
                ✓ Authenticated
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Flow Diagram */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Navigation Flow</h2>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</div>
            <div className="flex-1">
              <p className="font-medium">User accesses <code className="bg-gray-100 px-2 py-1 rounded">/dashboard</code></p>
              <p className="text-sm text-gray-600">DashboardRedirector component handles the routing</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</div>
            <div className="flex-1">
              <p className="font-medium">Role-based redirect based on user.role</p>
              <p className="text-sm text-gray-600">
                {user?.role === 'student' && '→ /student-dashboard (Student Dashboard)'}
                {user?.role === 'instructor' && '→ /instructor (Instructor Dashboard)'}
                {user?.role === 'admin' && '→ /admin (Admin Dashboard)'}
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</div>
            <div className="flex-1">
              <p className="font-medium">RoleBasedRouter validates access</p>
              <p className="text-sm text-gray-600">Checks if user has permission to access the dashboard</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">4</div>
            <div className="flex-1">
              <p className="font-medium">Dashboard Layout renders with role-specific navigation</p>
              <p className="text-sm text-gray-600">User sees only features relevant to their role</p>
            </div>
          </div>
        </div>
      </div>

      {/* Test Navigation */}
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">Test Navigation</h2>
        <div className="space-y-4">
          <div>
            <button 
              onClick={testNavigation}
              className="w-full px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 mb-2"
            >
              🚀 Test Auto-Redirect to My Dashboard
            </button>
            <p className="text-sm text-gray-600 text-center">
              This will redirect you to your role-appropriate dashboard
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Student Dashboard</h3>
              <p className="text-sm text-gray-600 mb-3">For users with 'student' role</p>
              <a 
                href="/student-dashboard" 
                className="block w-full text-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                Access Student Dashboard
              </a>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Instructor Dashboard</h3>
              <p className="text-sm text-gray-600 mb-3">For users with 'instructor' role</p>
              <a 
                href="/instructor" 
                className="block w-full text-center px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Access Instructor Dashboard
              </a>
            </div>
            
            <div className="border rounded-lg p-4">
              <h3 className="font-medium mb-2">Admin Dashboard</h3>
              <p className="text-sm text-gray-600 mb-3">For users with 'admin' role</p>
              <a 
                href="/admin" 
                className="block w-full text-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Access Admin Dashboard
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Expected Behavior */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Expected Behavior for Your Role</h2>
        {user?.role === 'student' && (
          <div className="space-y-3">
            <p className="text-green-600 font-medium">✓ You should be able to access the Student Dashboard</p>
            <p className="text-red-600 font-medium">✗ You should NOT be able to access Instructor or Admin dashboards</p>
            <p className="text-sm text-gray-600">Student features: My Courses, Assignments, Submissions, Certificates, Progress, Calendar</p>
          </div>
        )}
        {user?.role === 'instructor' && (
          <div className="space-y-3">
            <p className="text-green-600 font-medium">✓ You should be able to access the Instructor Dashboard</p>
            <p className="text-red-600 font-medium">✗ You should NOT be able to access Student or Admin dashboards</p>
            <p className="text-sm text-gray-600">Instructor features: My Courses, Create Course, Lessons, Live Sessions, Assignments, Quizzes, Students, Earnings</p>
          </div>
        )}
        {user?.role === 'admin' && (
          <div className="space-y-3">
            <p className="text-green-600 font-medium">✓ You should be able to access the Admin Dashboard</p>
            <p className="text-green-600 font-medium">✓ You should be able to access ALL dashboards (admin privilege)</p>
            <p className="text-sm text-gray-600">Admin features: Courses Management, User Management, Enrollments, Analytics, System Health, Security</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlowTestComponent; 