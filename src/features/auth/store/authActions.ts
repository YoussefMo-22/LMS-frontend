// features/auth/authActions.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import { axiosInstance } from "../../../api/axiosInstance";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (
    formData: { name: string; email: string; password: string; role: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post("/users/signup", formData);
      const { token, data } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { token, user: data.user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (
    credentials: { email: string; password: string },
    thunkAPI
  ) => {
    try {
      const response = await axiosInstance.post("/users/login", credentials);
      const { token, data } = response.data;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data.user));

      return { token, user: data.user };
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Login failed"
      );
    }
  }
);

// 👇 Hydrate user from localStorage on reload
export const hydrateUserFromStorage = createAsyncThunk(
  "auth/hydrate",
  async (_, thunkAPI) => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      try {
        const parsedUser = JSON.parse(user);
        return { token, user: parsedUser };
      } catch {
        return thunkAPI.rejectWithValue("Invalid user data");
      }
    } else {
      return thunkAPI.rejectWithValue("No auth data found");
    }
  }
);
