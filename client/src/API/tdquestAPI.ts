import axios, { AxiosInstance } from "axios";
//import cookies from "js-cookie";
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(window.localStorage.getItem("accessToken") as string)}`;

export const APIMAIN = "http://localhost:3001";

export const LOCALSTORAGE = JSON.parse(window.localStorage.getItem("isLogin") || "{}");
console.log(LOCALSTORAGE);

export const TDQuestAPI: AxiosInstance =  axios.create({
  baseURL: `${APIMAIN}`,
});
