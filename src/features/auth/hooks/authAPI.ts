// src/auth/authAPI.ts
import { axiosInstance } from "../../../api/axiosInstance";
import Cookies from 'js-cookie'
export const login = async (email: string, password: string) => {
    const res = await axiosInstance.post("/users/login", { email, password });
    return res.data; // return full response (includes token, data, or message)
};

export const register = async (formData: {
    name: string;
    email: string;
    password: string;
    role: string;
}) => {
    const res = await axiosInstance.post("/users/signup", formData);
    const { token, data } = res.data;

    Cookies.set("token", token, { expires: 28 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 28 });

    return data.user;
};

export const generate2FA = async (token: string) => {
    try {
        const { data } = await axiosInstance.post("/users/generate-2fa",{}, {
            headers: { Authorization: `Bearer ${token}` },
        });
        return data.qrCode;
    } catch (error) {
        return null;
    }
};

export const verify2FA = async (userId: string, token: string, code: string) => {
  try {
    const res = await axiosInstance.post(
      "/users/verify-2fa",
      { userId, token: code },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const { token: newToken, data } = res.data;

    Cookies.set("token", newToken, { expires: 28 });
    Cookies.set("user", JSON.stringify(data.user), { expires: 28 });

    return data;
  } catch (error) {
    return null;
  }
};

export const logout = () => {
    Cookies.remove("token");
    Cookies.remove("user");
};
