import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useForgotPassword } from '../hooks/useAuth';
import type { ForgotPasswordRequest } from '../types/auth';

interface ForgotPasswordFormProps {
  onSwitchToLogin?: () => void;
}

interface ForgotPasswordFormData {
  email: string;
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = ({ 
  onSwitchToLogin 
}) => {
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [email, setEmail] = useState<string>('');

  const forgotPasswordMutation = useForgotPassword();

  const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>();

  const handleForgotPassword = async (data: ForgotPasswordFormData) => {
    try {
      const forgotData: ForgotPasswordRequest = {
        email: data.email
      };
      
      await forgotPasswordMutation.mutateAsync(forgotData);
      setEmail(data.email);
      setIsEmailSent(true);
    } catch (error) {
      console.error('Forgot password error:', error);
    }
  };

  if (isEmailSent) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
            <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Check Your Email</h2>
          <p className="text-gray-600 mb-4">
            We've sent a password reset link to:
          </p>
          <p className="text-primary-600 font-medium mb-6">{email}</p>
          
          <div className="bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-sm text-gray-700">
              <strong>What to do next:</strong>
            </p>
            <ol className="text-sm text-gray-600 mt-2 space-y-1">
              <li>1. Check your email inbox (and spam folder)</li>
              <li>2. Click the password reset link in the email</li>
              <li>3. Create a new password</li>
              <li>4. Sign in with your new password</li>
            </ol>
          </div>
          
          <p className="text-sm text-gray-500 mb-6">
            Didn't receive the email? Check your spam folder or try again.
          </p>
          
          <div className="space-y-3">
            <button
              type="button"
              onClick={() => setIsEmailSent(false)}
              className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 transition"
            >
              Try Again
            </button>
            
            {onSwitchToLogin && (
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
              >
                Back to Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Forgot Password</h2>
        <p className="text-gray-600">
          Enter your email address and we'll send you a link to reset your password.
        </p>
      </div>

      <form onSubmit={handleSubmit(handleForgotPassword)} className="space-y-4">
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

        <button
          type="submit"
          disabled={forgotPasswordMutation.isPending}
          className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {forgotPasswordMutation.isPending ? 'Sending...' : 'Send Reset Link'}
        </button>
      </form>

      {/* Back to Login */}
      {onSwitchToLogin && (
        <div className="mt-6 text-center">
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            ← Back to Sign In
          </button>
        </div>
      )}

      {/* Help Text */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h4 className="text-sm font-semibold text-blue-900 mb-2">Need Help?</h4>
        <p className="text-sm text-blue-800">
          If you're still having trouble, contact our support team at{' '}
          <a href="mailto:support@example.com" className="underline">
            support@example.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPasswordForm; 