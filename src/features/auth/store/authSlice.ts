// features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, hydrateUserFromStorage } from "./authActions";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  token: null,
  user: null,
  loading: false,
  error: null,
  success: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuth: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;
      state.success = false;

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
  extraReducers: (builder) => {
    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.success = true;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "An error occurred";
      state.success = false;
    });

    // Register
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.success = true;
    });

    // Hydrate
    builder.addCase(hydrateUserFromStorage.fulfilled, (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(hydrateUserFromStorage.rejected, (state) => {
      state.token = null;
      state.user = null;
    });
  },
});

export const { clearAuth } = authSlice.actions;
export default authSlice.reducer;
