import axios from "axios";
export const baseURL = "https://learning-management-system2-kqa0ygu59-abdoelsaeeds-projects.vercel.app/";

export const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});