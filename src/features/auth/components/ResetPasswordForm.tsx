import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useResetPassword } from '../hooks/useAuth';
import { useParams, useNavigate } from 'react-router-dom';
import type { ResetPasswordRequest } from '../types/auth';

interface ResetPasswordFormData {
  email: string;
  newPassword: string;
  confirmPassword: string;
}

const ResetPasswordForm: React.FC = () => {
  const [isSuccess, setIsSuccess] = useState(false);
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();

  const resetPasswordMutation = useResetPassword();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<ResetPasswordFormData>();
  const newPassword = watch('newPassword');

  const handleResetPassword = async (data: ResetPasswordFormData) => {
    if (!code) {
      console.error('Reset code is missing');
      return;
    }

    try {
      const resetData: ResetPasswordRequest = {
        email: data.email,
        newPassword: data.newPassword
      };
      
      await resetPasswordMutation.mutateAsync({ code, data: resetData });
      setIsSuccess(true);
    } catch (error) {
      console.error('Reset password error:', error);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  if (isSuccess) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Password Reset Successful</h2>
          <p className="text-gray-600 mb-6">
            Your password has been successfully reset. You can now sign in with your new password.
          </p>
          
          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 transition"
          >
            Sign In
          </button>
        </div>
      </div>
    );
  }

  if (!code) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
            <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Invalid Reset Link</h2>
          <p className="text-gray-600 mb-6">
            The password reset link is invalid or has expired. Please request a new password reset.
          </p>
          
          <button
            type="button"
            onClick={handleBackToLogin}
            className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 transition"
          >
            Back to Sign In
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Reset Your Password</h2>
        <p className="text-gray-600">
          Enter your email and create a new password for your account.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleResetPassword)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            placeholder="Enter your email address"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            {...register('newPassword', { 
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
              }
            })}
            placeholder="Create a new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.newPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.newPassword.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register('confirmPassword', { 
              required: 'Please confirm your new password',
              validate: value => value === newPassword || 'Passwords do not match'
            })}
            placeholder="Confirm your new password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={resetPasswordMutation.isPending}
          className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {resetPasswordMutation.isPending ? 'Resetting...' : 'Reset Password'}
        </button>
      </form>

      {/* Back to Login */}
      <div className="mt-6 text-center">
        <button
          type="button"
          onClick={handleBackToLogin}
          className="text-primary-600 hover:text-primary-800 text-sm font-medium"
        >
          ← Back to Sign In
        </button>
      </div>

      {/* Password Requirements */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">Password Requirements</h4>
        <ul className="text-sm text-gray-600 space-y-1">
          <li>• At least 8 characters long</li>
          <li>• Contains at least one uppercase letter</li>
          <li>• Contains at least one lowercase letter</li>
          <li>• Contains at least one number</li>
        </ul>
      </div>
    </div>
  );
};

export default ResetPasswordForm; 