import axios from "axios";

export const request = axios.create({
  // baseURL: "https://jwt-auth-practice.vercel.app",
  baseURL: "http://localhost:4000",
  withCredentials: true,
});
