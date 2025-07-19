import React from 'react';
import { useForm } from 'react-hook-form';
import { useSignup } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';
import type { SignupRequest } from '../types/auth';
import RoleSelect from './RoleSelect';

interface SignupFormProps {
  onSuccess?: () => void;
  onSwitchToLogin?: () => void;
}

interface SignupFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'student' | 'instructor' | 'admin';
}

const SignupForm: React.FC<SignupFormProps> = ({ 
  onSuccess, 
  onSwitchToLogin 
}) => {
  const signupMutation = useSignup();
  const { login: authLogin } = useAuth();

  const { register, handleSubmit, watch, formState: { errors } } = useForm<SignupFormData>({
    defaultValues: {
      role: 'student'
    }
  });
  const password = watch('password');

  const handleSignup = async (data: SignupFormData) => {
    try {
      const signupData: SignupRequest = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role
      };
      
      const response = await signupMutation.mutateAsync(signupData);
      
      if (response.token && response.data?.user) {
        // Call the AuthContext login function to set user state
        authLogin(response.data.user);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const handleSocialSignup = (provider: 'google' | 'facebook') => {
    const authUrl = provider === 'google' 
      ? '/api/v1/auth/google'
      : '/api/v1/auth/facebook';
    
    window.location.href = authUrl;
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h2>
        <p className="text-gray-600">
          Join us and start your learning journey
        </p>
      </div>

      <form onSubmit={handleSubmit(handleSignup)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            {...register('name', { 
              required: 'Full name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
            placeholder="Enter your full name"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.name && (
            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <RoleSelect
          register={register('role', { required: 'Please select a role' })}
          error={errors.role?.message}
          showAdmin={true}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            {...register('password', { 
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters'
              },
              pattern: {
                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                message: 'Password must contain at least one uppercase letter, one lowercase letter, and one number'
              }
            })}
            placeholder="Create a strong password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.password && (
            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            {...register('confirmPassword', { 
              required: 'Please confirm your password',
              validate: value => value === password || 'Passwords do not match'
            })}
            placeholder="Confirm your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={signupMutation.isPending}
          className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {signupMutation.isPending ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {/* Social Signup */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or sign up with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialSignup('google')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            <span className="ml-2">Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleSocialSignup('facebook')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="ml-2">Facebook</span>
          </button>
        </div>
      </div>

      {/* Terms and Privacy */}
      <div className="mt-6 text-center text-xs text-gray-500">
        By creating an account, you agree to our{' '}
        <a href="/terms" className="text-primary-600 hover:text-primary-800">
          Terms of Service
        </a>{' '}
        and{' '}
        <a href="/privacy" className="text-primary-600 hover:text-primary-800">
          Privacy Policy
        </a>
      </div>

      {/* Login Link */}
      {onSwitchToLogin && (
        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="text-primary-600 hover:text-primary-800 font-medium"
          >
            Sign in
          </button>
        </div>
      )}
    </div>
  );
};

export default SignupForm; 