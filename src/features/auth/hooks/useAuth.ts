// src/auth/useAuth.ts
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authApi } from '../api/authApi';
import type { 
  SignupRequest, 
  LoginRequest, 
  UpdatePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  Verify2FARequest
} from '../types/auth';

// Secure storage utilities (same as in AuthContext)
const TOKEN_KEY = 'lms_auth_token';

const secureStorage = {
  setToken: (token: string) => {
    try {
      sessionStorage.setItem(TOKEN_KEY, token);
    } catch (error) {
      console.error('Failed to store token:', error);
    }
  },

  getToken: (): string | null => {
    try {
      return sessionStorage.getItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to get token:', error);
      return null;
    }
  },

  removeToken: () => {
    try {
      sessionStorage.removeItem(TOKEN_KEY);
    } catch (error) {
      console.error('Failed to remove token:', error);
    }
  }
};

export const useSignup = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: SignupRequest) => authApi.signup(data),
    onSuccess: (data) => {
      if (data.token) {
        // Store token securely
        secureStorage.setToken(data.token);
      }
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useLogin = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: LoginRequest) => authApi.login(data),
    onSuccess: (data) => {
      if ('token' in data && data.token) {
        // Store token securely
        secureStorage.setToken(data.token);
      }
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useUpdatePassword = () => {
  return useMutation({
    mutationFn: (data: UpdatePasswordRequest) => authApi.updatePassword(data),
  });
};

export const useGenerate2FA = () => {
  return useMutation({
    mutationFn: () => authApi.generate2FA(),
  });
};

export const useVerify2FA = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: (data: Verify2FARequest) => authApi.verify2FA(data),
    onSuccess: (data) => {
      if (data.token) {
        // Store token securely
        secureStorage.setToken(data.token);
      }
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useForgotPassword = () => {
  return useMutation({
    mutationFn: (data: ForgotPasswordRequest) => authApi.forgotPassword(data),
  });
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: ({ code, data }: { code: string; data: ResetPasswordRequest }) => 
      authApi.resetPassword(code, data),
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: () => authApi.logout(),
    onSuccess: () => {
      // Clear token securely
      secureStorage.removeToken();
      // Clear user data from cache
      queryClient.clear();
    },
  });
};
