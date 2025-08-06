import axios from "axios";
export const baseURL = "https://learning-management-system2.vercel.app/";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});