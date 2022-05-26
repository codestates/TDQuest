import axios, { AxiosInstance } from "axios";
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Authorization'] = `Bearer ${JSON.parse(window.localStorage.getItem("accessToken") as string)}`;

// env 파일에서 url 주소를 불러오도록 설정할 예정
export const APIMAIN = "http://localhost:3001";

export const LOCALSTORAGE_STRING = JSON.parse(window.localStorage.getItem("isLogin") || "{}");

export const TDQuestAPI: AxiosInstance =  axios.create({
  baseURL: `${APIMAIN}`,
});
