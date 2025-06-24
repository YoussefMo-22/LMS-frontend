// services/authService.ts
import { axiosInstance } from "../../../api/axiosInstance";

export const logoutUser = async () => {
  const token = localStorage.getItem("token");
  
  if (!token) throw new Error("Token not found");

  try {
    const response = await axiosInstance.get("/users/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (err: any) {
    console.error("Logout failed", err.response?.data || err.message);
    throw err;
  }
};
