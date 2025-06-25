// features/auth/authSlice.ts
import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, logoutUser } from "./authActions";

interface AuthState {
  token: string | null;
  user: any | null;
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState:AuthState = {
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
    clearAuthStatus: (state) => {
      state.error = null;
      state.success = false;
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
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.loading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.success = true;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.loading = false;
      state.error = typeof action.payload === "string" ? action.payload : "An error occurred";
      state.success = false;
    });

      // Logout
  builder.addCase(logoutUser.pending, (state) => {
    state.loading = true;
    state.error = null;
  });
  builder.addCase(logoutUser.fulfilled, (state) => {
    state.loading = false;
    state.token = null;
    state.user = null;
    state.success = false;
  });
  builder.addCase(logoutUser.rejected, (state, action) => {
    state.loading = false;
    state.error = action.payload || "Logout failed";
  });
  },
});

export const { clearAuthStatus } = authSlice.actions;
export default authSlice.reducer;
