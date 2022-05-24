import React, { useEffect } from "react";
import "./App.css";
import MainRouter from "./views/Router/Router";
import axios from "axios";
import { useAppSelector } from "./app/hooks";
import { TDQuestAPI } from "./API/tdquestAPI";

function App() {
  const userInfoRedux = useAppSelector((state) => state.sign);
  let localInfo = window.localStorage.getItem("isLogin")
    ? JSON.parse(window.localStorage.getItem("isLogin") || "")
    : false;
  const verified_userId = localInfo ? localInfo.userInfo.id : false;
  axios.defaults.withCredentials = true;

  const InitializeUser = async () => {
    if (verified_userId) {
      await TDQuestAPI.get(`userInfo/?id=${verified_userId}`)
        .then((res) => {
          console.log(
            "------------------------------------------------- \n Initaialzie User success \n -------------------------------------------------"
          );
          console.log("userInfo by SignIn axios : ", res.data);
          console.log("localStorage : ", localInfo);
          console.log("reduxStore : ", userInfoRedux);
        })
        .catch((err) => {
          console.log("Initialize err :", err);
          window.localStorage.removeItem("isLogin");
        });
    }
  };

  useEffect(() => {
    InitializeUser();
  }, []);

  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
