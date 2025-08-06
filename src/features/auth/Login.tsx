import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
// import { useAuth } from './context/AuthContext';

type AuthMode = 'login' | 'signup' | 'forgot-password';

const Login: React.FC = () => {
  const [mode, setMode] = useState<AuthMode>('login');
  const navigate = useNavigate();
  // const { login } = useAuth();

  const handleAuthSuccess = () => {
    // Navigate to dashboard or home page
    navigate('/home');
  };

  const renderAuthForm = () => {
    switch (mode) {
      case 'signup':
        return (
          <SignupForm
            onSuccess={handleAuthSuccess}
            onSwitchToLogin={() => setMode('login')}
          />
        );
      case 'forgot-password':
        return (
          <ForgotPasswordForm
            onSwitchToLogin={() => setMode('login')}
          />
        );
      default:
        return (
          <LoginForm
            onSuccess={handleAuthSuccess}
            onSwitchToSignup={() => setMode('signup')}
            onSwitchToForgotPassword={() => setMode('forgot-password')}
          />
        );
    }
  };

  const getPageTitle = () => {
    switch (mode) {
      case 'signup':
        return 'Sign Up | Level Up LMS';
      case 'forgot-password':
        return 'Forgot Password | Level Up LMS';
      default:
        return 'Sign In | Level Up LMS';
    }
  };

  const getPageDescription = () => {
    switch (mode) {
      case 'signup':
        return 'Create your account and start your learning journey';
      case 'forgot-password':
        return 'Reset your password to regain access to your account';
      default:
        return 'Sign in to your account to continue learning';
    }
  };

  return (
    <>
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content={getPageDescription()} />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Logo */}
          <div className="text-center">
            <h1 className="text-4xl font-bold text-primary-600 mb-2">
              Level Up
            </h1>
            <p className="text-gray-600">
              {mode === 'signup' && 'Join our learning community'}
              {mode === 'forgot-password' && 'Reset your password'}
              {mode === 'login' && 'Welcome back to your learning journey'}
            </p>
          </div>

          {/* Auth Form */}
          {renderAuthForm()}

          {/* Footer */}
          <div className="text-center text-sm text-gray-500">
            <p>
              By continuing, you agree to our{' '}
              <a href="/terms" className="text-primary-600 hover:text-primary-800">
                Terms of Service
              </a>{' '}
              and{' '}
              <a href="/privacy" className="text-primary-600 hover:text-primary-800">
                Privacy Policy
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
