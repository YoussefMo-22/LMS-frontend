// features/auth/authActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData: { name: string; email: string; password: string; role: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/signup', formData);
      const { token, data } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { token, user: data.user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Registration failed");
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const response = await axiosInstance.post('/users/login', credentials);
      const { token, data } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { token, user: data.user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const token = localStorage.getItem("token");

      await axiosInstance.get("/users/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      localStorage.removeItem("token");
      localStorage.removeItem("user");

      return;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Logout failed"
      );
    }
  }
);