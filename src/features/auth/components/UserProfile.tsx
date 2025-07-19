import React, { useState } from 'react';
import { useLogout } from '../hooks/useAuth';
import type { User } from '../types/auth';

interface UserProfileProps {
  user: User;
  onLogout?: () => void;
}

const UserProfile: React.FC<UserProfileProps> = ({ user, onLogout }) => {
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      if (onLogout) {
        onLogout();
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getRoleDisplay = (role: string) => {
    switch (role) {
      case 'admin':
        return 'Administrator';
      case 'instructor':
        return 'Instructor';
      case 'student':
        return 'Student';
      default:
        return role;
    }
  };

  const getProviderDisplay = (provider?: string) => {
    if (!provider) return 'Email/Password';
    
    switch (provider) {
      case 'google':
        return 'Google';
      case 'facebook':
        return 'Facebook';
      default:
        return provider;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
      <div className="text-center mb-8">
        <div className="mx-auto w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center mb-4">
          {user.photo && user.photo !== 'default.jpg' ? (
            <img
              src={user.photo}
              alt={user.name}
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <svg className="w-12 h-12 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
          )}
        </div>
        
        <h2 className="text-2xl font-bold text-gray-900 mb-2">{user.name}</h2>
        <p className="text-gray-600">{user.email}</p>
      </div>

      {/* User Information */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Account Type</h3>
            <p className="text-lg font-semibold text-gray-900">
              {getRoleDisplay(user.role)}
            </p>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Sign-in Method</h3>
            <p className="text-lg font-semibold text-gray-900">
              {getProviderDisplay(user.provider)}
            </p>
          </div>
        </div>

        {/* Account Details */}
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Details</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">User ID:</span>
              <span className="text-sm font-medium text-gray-900">{user._id}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Member Since:</span>
              <span className="text-sm font-medium text-gray-900">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">Account Status:</span>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                Active
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-blue-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition">
              Edit Profile
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">
              Security Settings
            </button>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition">
              Notification Settings
            </button>
            <button className="bg-orange-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-orange-700 transition">
              Download Data
            </button>
          </div>
        </div>

        {/* Logout Section */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">Sign Out</h3>
              <p className="text-sm text-gray-600">
                Sign out of your account on this device
              </p>
            </div>
            
            {!showLogoutConfirm ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="bg-red-600 text-white px-6 py-2 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Sign Out
              </button>
            ) : (
              <div className="flex space-x-2">
                <button
                  onClick={handleLogout}
                  disabled={logoutMutation.isPending}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
                >
                  {logoutMutation.isPending ? 'Signing Out...' : 'Confirm'}
                </button>
                <button
                  onClick={() => setShowLogoutConfirm(false)}
                  className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Account Security Notice */}
      <div className="mt-8 p-4 bg-yellow-50 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-yellow-800">
              Account Security
            </h3>
            <div className="mt-2 text-sm text-yellow-700">
              <p>
                Keep your account secure by using a strong password and enabling two-factor authentication.
                Never share your login credentials with anyone.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile; 