// src/auth/useAuth.ts
import { useState } from "react";
import * as authAPI from "./authAPI";
import Cookies from "js-cookie";
export function useAuth() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

const login = async (email: string, password: string) => {
  setLoading(true);
  setError(null);
  try {
    const res = await authAPI.login(email, password);

    if (res.message === "2FA required") {
      return { twoFARequired: true, userId: res.userId };
    }

    const { token, data } = res;

    Cookies.set("token", token, { expires: 28 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 28 });

    return { user: data.user };
  } catch (err: any) {
    setError(err.response?.data?.message || "Login failed");
    return null;
  } finally {
    setLoading(false);
  }
};

  const register = async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
  }) => {
    setLoading(true);
    setError(null);
    try {
      const user = await authAPI.register(formData);
      return user;
    } catch (err: any) {
      setError(err.response?.data?.message || "Registration failed");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authAPI.logout();
  };

  return {
    login,
    register,
    logout,
    loading,
    error,
  };
}
