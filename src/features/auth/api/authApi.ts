import { axiosInstance } from '../../../api/axiosInstance';
import type { 
  AuthResponse, 
  SignupRequest, 
  LoginRequest, 
  UpdatePasswordRequest,
  ForgotPasswordRequest,
  ResetPasswordRequest,
  Verify2FARequest,
  Generate2FAResponse,
  TwoFARequiredResponse
} from '../types/auth';

export const authApi = {
  // User signup
  signup: async (data: SignupRequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('api/v1/users/signup', data);
    return response.data;
  },

  // User login
  login: async (data: LoginRequest): Promise<AuthResponse | TwoFARequiredResponse> => {
    const response = await axiosInstance.post('api/v1/users/login', data);
    return response.data;
  },

  // Update password
  updatePassword: async (data: UpdatePasswordRequest): Promise<{ status: string; message: string }> => {
    const response = await axiosInstance.patch('api/v1/users/updatepassword', data);
    return response.data;
  },

  // Generate 2FA secret
  generate2FA: async (): Promise<Generate2FAResponse> => {
    const response = await axiosInstance.post('api/v1/users/generate-2fa');
    return response.data;
  },

  // Verify 2FA
  verify2FA: async (data: Verify2FARequest): Promise<AuthResponse> => {
    const response = await axiosInstance.post('api/v1/users/verify-2fa', data);
    return response.data;
  },

  // Forgot password
  forgotPassword: async (data: ForgotPasswordRequest): Promise<{ status: string; message: string }> => {
    const response = await axiosInstance.post('api/v1/users/forgotpassword', data);
    return response.data;
  },

  // Reset password
  resetPassword: async (code: string, data: ResetPasswordRequest): Promise<{ status: string; message: string }> => {
    const response = await axiosInstance.patch(`api/v1/users/resetpassword/${code}`, data);
    return response.data;
  },

  // Logout
  logout: async (): Promise<{ status: string; message: string }> => {
    const response = await axiosInstance.get('api/v1/users/logout');
    return response.data;
  },

  // Facebook OAuth
  facebookAuth: (): string => {
    return `${axiosInstance.defaults.baseURL}api/v1/users/facebook`;
  },

  // Google OAuth
  googleAuth: () =>
  axiosInstance.get('api/v1/users/google').then(res => res.data)
}; 