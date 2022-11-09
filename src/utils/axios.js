import axios from "axios";

export const GetURL = () =>
  process.env.REACT_APP_MODE === "development"
    ? process.env.REACT_APP_LOCAL_URL
    : process.env.REACT_APP_HOSTING_URL;

export const request = axios.create({
  baseURL: GetURL(),
  withCredentials: true,
});
