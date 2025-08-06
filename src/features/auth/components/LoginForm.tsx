import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useLogin, useVerify2FA } from '../hooks/useAuth';
import { useAuth } from '../context/AuthContext';
import type { Verify2FARequest } from '../types/auth';

interface LoginFormProps {
  onSuccess?: () => void;
  onSwitchToSignup?: () => void;
  onSwitchToForgotPassword?: () => void;
}

interface LoginFormData {
  email: string;
  password: string;
}

interface TwoFAFormData {
  token: string;
}

const LoginForm: React.FC<LoginFormProps> = ({ 
  onSuccess, 
  onSwitchToSignup, 
  onSwitchToForgotPassword 
}) => {
  const [showTwoFA, setShowTwoFA] = useState(false);
  const [userId, setUserId] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const loginMutation = useLogin();
  const verify2FAMutation = useVerify2FA();
  const { login: authLogin } = useAuth();

  const { register: registerLogin, handleSubmit: handleLoginSubmit, formState: { errors: loginErrors } } = useForm<LoginFormData>();
  const { register: registerTwoFA, handleSubmit: handleTwoFASubmit, formState: { errors: twoFAErrors } } = useForm<TwoFAFormData>();

  const handleLogin = async (data: LoginFormData) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      
      if ('message' in response && response.message === '2FA required') {
        setShowTwoFA(true);
        if (response.userId) {
          setUserId(response.userId);
        }
        setEmail(data.email);
      } else if ('token' in response && response.token && response.data?.user) {
        // Call the AuthContext login function to set user state
        authLogin(response.data.user);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleTwoFAVerification = async (data: TwoFAFormData) => {
    try {
      const verifyData: Verify2FARequest = {
        userId,
        token: data.token
      };
      
      const response = await verify2FAMutation.mutateAsync(verifyData);
      
      if (response.token && response.data?.user) {
        // Call the AuthContext login function to set user state
        authLogin(response.data.user);
        if (onSuccess) {
          onSuccess();
        }
      }
    } catch (error) {
      console.error('2FA verification error:', error);
    }
  };

  const handleSocialLogin = (provider: 'google' | 'facebook') => {
    const authUrl = provider === 'google' 
      ? '/api/v1/auth/google'
      : '/api/v1/auth/facebook';
    
    window.location.href = authUrl;
  };

  if (showTwoFA) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Two-Factor Authentication</h2>
          <p className="text-gray-600">
            Enter the 6-digit code from your authenticator app
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Code sent to {email}
          </p>
        </div>

        <form onSubmit={handleTwoFASubmit(handleTwoFAVerification)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Authentication Code
            </label>
            <input
              type="text"
              {...registerTwoFA('token', { 
                required: 'Authentication code is required',
                pattern: {
                  value: /^\d{6}$/,
                  message: 'Please enter a 6-digit code'
                }
              })}
              placeholder="000000"
              maxLength={6}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400 text-center text-lg tracking-widest"
            />
            {twoFAErrors.token && (
              <p className="text-red-500 text-sm mt-1">{twoFAErrors.token.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={verify2FAMutation.isPending}
            className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
          >
            {verify2FAMutation.isPending ? 'Verifying...' : 'Verify Code'}
          </button>

          <button
            type="button"
            onClick={() => setShowTwoFA(false)}
            className="w-full bg-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-400 transition"
          >
            Back to Login
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
        <p className="text-gray-600">
          Sign in to your account to continue
        </p>
      </div>

      <form onSubmit={handleLoginSubmit(handleLogin)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            {...registerLogin('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Please enter a valid email address'
              }
            })}
            placeholder="Enter your email"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {loginErrors.email && (
            <p className="text-red-500 text-sm mt-1">{loginErrors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <input
            type="password"
            {...registerLogin('password', { 
              required: 'Password is required',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters'
              }
            })}
            placeholder="Enter your password"
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-400"
          />
          {loginErrors.password && (
            <p className="text-red-500 text-sm mt-1">{loginErrors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loginMutation.isPending}
          className="w-full bg-primary-400 text-white py-3 rounded-lg font-semibold hover:bg-primary-500 disabled:bg-gray-300 disabled:cursor-not-allowed transition"
        >
          {loginMutation.isPending ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Social Login */}
      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => handleSocialLogin('google')}
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
            onClick={() => handleSocialLogin('facebook')}
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition"
          >
            <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            <span className="ml-2">Facebook</span>
          </button>
        </div>
      </div>

      {/* Links */}
      <div className="mt-6 text-center space-y-2">
        {onSwitchToForgotPassword && (
          <button
            type="button"
            onClick={onSwitchToForgotPassword}
            className="text-primary-600 hover:text-primary-800 text-sm font-medium"
          >
            Forgot your password?
          </button>
        )}
        
        {onSwitchToSignup && (
          <div className="text-sm text-gray-600">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="text-primary-600 hover:text-primary-800 font-medium"
            >
              Sign up
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm; 