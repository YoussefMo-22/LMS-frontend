import axios from "axios";
export const baseURL = "https://learning-management-system-rfjvn64la-abdoelsaeeds-projects.vercel.app/api/v1";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});