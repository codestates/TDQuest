import axios, { AxiosResponse, AxiosInstance } from "axios";
import cookies from "js-cookie";
axios.defaults.withCredentials = true;

export const APIMAIN = "http://localhost:3001";

export const LOCALSTORAGE = JSON.parse(window.localStorage.getItem("isLogin") as string);

let access_token = "";
if (LOCALSTORAGE !== null) {
  access_token = LOCALSTORAGE.accessToken
}

export const TDQuestAPI: AxiosInstance =  axios.create({
  baseURL: `${APIMAIN}`,
  headers: {
    Authorization: `Bearer ${access_token}`,
    refreshToken: `Bearer ${cookies.get("refreshToken")}`
  },
});
