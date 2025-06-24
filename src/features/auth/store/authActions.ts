import { registerStart, registerSuccess, registerFailure } from './authSlice';
import {
  loginStart,
  loginSuccess,
  loginFailure,
} from './authSlice';
import { axiosInstance } from '../../../api/axiosInstance';


export const registerUser = (formData: { name: string; email: string; password: string; role: string }) => {
  return async (dispatch: any) => {
    dispatch(registerStart());
    try {
      const response = await axiosInstance.post('/users/signup', formData);
      const { token, data } = response.data;

      // Save token to localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      dispatch(registerSuccess({ token, user: data.user }));
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      dispatch(registerFailure(errorMsg));
    }
  };
};

export const loginUser = (credentials: { email: string; password: string }) => {
  return async (dispatch: any) => {
    dispatch(loginStart());
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      const { token, data } = response.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(data.user));

      dispatch(loginSuccess({ token, user: data.user }));
    } catch (error: any) {
      const errorMsg = error.response?.data?.message || 'Login failed';
      dispatch(loginFailure(errorMsg));
    }
  };
};