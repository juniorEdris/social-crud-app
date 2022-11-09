import axios from "axios";

export const GetURL = () =>
  process.env.REACT_APP_MODE === "production"
    ? process.env.REACT_APP_HOSTING_URL
    : process.env.REACT_APP_LOCAL_URL;

export const request = axios.create({
  baseURL: GetURL(),
  withCredentials: true,
});
