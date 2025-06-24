import axios from "axios";
export const baseURL = "https://learning-management-system-lms-theta.vercel.app/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});