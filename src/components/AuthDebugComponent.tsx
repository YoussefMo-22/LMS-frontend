import React, { useState } from 'react';
import { useAuth } from '../features/auth/context/AuthContext';
import { useLogin, useSignup } from '../features/auth/hooks/useAuth';

const AuthDebugComponent: React.FC = () => {
  const { user, isAuthenticated, isLoading, login: authLogin } = useAuth();
  const loginMutation = useLogin();
  const signupMutation = useSignup();
  const [debugInfo, setDebugInfo] = useState<string>('');

  const testLogin = async () => {
    try {
      setDebugInfo('Testing login...');
      const response = await loginMutation.mutateAsync({
        email: 'test@example.com',
        password: 'password123'
      });
      
      setDebugInfo(`Login response: ${JSON.stringify(response, null, 2)}`);
      
      // Check if response has token and data (AuthResponse type)
      if ('token' in response && response.token && 'data' in response && response.data?.user) {
        authLogin(response.data.user);
        setDebugInfo('Login successful! User should be redirected to dashboard.');
      } else if ('message' in response && response.message === '2FA required') {
        setDebugInfo('2FA required - please use the mock login for testing');
      } else {
        setDebugInfo('Login failed: No user data in response');
      }
    } catch (error) {
      setDebugInfo(`Login error: ${error}`);
    }
  };

  const testSignup = async () => {
    try {
      setDebugInfo('Testing signup...');
      const response = await signupMutation.mutateAsync({
        name: 'Test User',
        email: 'testuser@example.com',
        password: 'password123',
        role: 'student'
      });
      
      setDebugInfo(`Signup response: ${JSON.stringify(response, null, 2)}`);
      
      if (response.token && response.data?.user) {
        authLogin(response.data.user);
        setDebugInfo('Signup successful! User should be redirected to dashboard.');
      } else {
        setDebugInfo('Signup failed: No user data in response');
      }
    } catch (error) {
      setDebugInfo(`Signup error: ${error}`);
    }
  };

  const testMockLogin = async () => {
    try {
      setDebugInfo('Testing mock login...');
      
      // Simulate API response
      const mockResponse = {
        status: 'success',
        token: 'mock-jwt-token-12345',
        data: {
          user: {
            _id: 'mock-user-id',
            name: 'Test User',
            email: 'test@example.com',
            role: 'student' as const,
            __v: 0
          }
        }
      };
      
      setDebugInfo(`Mock login response: ${JSON.stringify(mockResponse, null, 2)}`);
      
      // Store token securely
      sessionStorage.setItem('lms_auth_token', mockResponse.token);
      
      // Call the AuthContext login function to set user state
      authLogin(mockResponse.data.user);
      setDebugInfo('Mock login successful! User should be redirected to dashboard.');
    } catch (error) {
      setDebugInfo(`Mock login error: ${error}`);
    }
  };

  const testMockSignup = async () => {
    try {
      setDebugInfo('Testing mock signup...');
      
      // Simulate API response
      const mockResponse = {
        status: 'success',
        token: 'mock-jwt-token-signup-67890',
        data: {
          user: {
            _id: 'mock-signup-user-id',
            name: 'New Test User',
            email: 'newtest@example.com',
            role: 'instructor' as const,
            __v: 0
          }
        }
      };
      
      setDebugInfo(`Mock signup response: ${JSON.stringify(mockResponse, null, 2)}`);
      
      // Store token securely
      sessionStorage.setItem('lms_auth_token', mockResponse.token);
      
      // Call the AuthContext login function to set user state
      authLogin(mockResponse.data.user);
      setDebugInfo('Mock signup successful! User should be redirected to dashboard.');
    } catch (error) {
      setDebugInfo(`Mock signup error: ${error}`);
    }
  };

  const checkToken = () => {
    const token = sessionStorage.getItem('lms_auth_token');
    setDebugInfo(`Token in sessionStorage: ${token ? 'Present' : 'Not found'}`);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Authentication Debug</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Current State */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Current State</h2>
          <div className="space-y-2">
            <p><strong>Loading:</strong> {isLoading ? 'Yes' : 'No'}</p>
            <p><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</p>
            <p><strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'None'}</p>
            <p><strong>Token:</strong> {sessionStorage.getItem('lms_auth_token') ? 'Present' : 'Not found'}</p>
          </div>
        </div>

        {/* Test Actions */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Test Actions</h2>
          <div className="space-y-4">
            <button
              onClick={testLogin}
              disabled={loginMutation.isPending}
              className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:bg-gray-400"
            >
              {loginMutation.isPending ? 'Testing Login...' : 'Test Login (API)'}
            </button>
            
            <button
              onClick={testSignup}
              disabled={signupMutation.isPending}
              className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:bg-gray-400"
            >
              {signupMutation.isPending ? 'Testing Signup...' : 'Test Signup (API)'}
            </button>
            
            <button
              onClick={testMockLogin}
              className="w-full px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
            >
              Test Mock Login (No API)
            </button>
            
            <button
              onClick={testMockSignup}
              className="w-full px-4 py-2 bg-orange-600 text-white rounded hover:bg-orange-700"
            >
              Test Mock Signup (No API)
            </button>
            
            <button
              onClick={checkToken}
              className="w-full px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
            >
              Check Token
            </button>
          </div>
        </div>
      </div>

      {/* Debug Info */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Debug Information</h2>
        <div className="bg-gray-100 p-4 rounded">
          <pre className="whitespace-pre-wrap text-sm">{debugInfo || 'No debug info yet'}</pre>
        </div>
      </div>

      {/* Navigation Test */}
      <div className="mt-8 bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Navigation Test</h2>
        <div className="space-y-2">
          <a 
            href="/dashboard" 
            className="block px-4 py-2 bg-primary-600 text-white rounded hover:bg-primary-700 text-center"
          >
            Test Dashboard Redirect
          </a>
          <p className="text-sm text-gray-600">
            This should redirect you to your role-appropriate dashboard if authenticated
          </p>
        </div>
      </div>
    </div>
  );
};

export default AuthDebugComponent; 