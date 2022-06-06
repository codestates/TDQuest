import React, { useEffect, useState } from "react";
import "./App.css";
import MainRouter from "./views/Router/Router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { TDQuestAPI } from "./API/tdquestAPI";
import { getUserData } from "./features/userinfo/userInfoSlice";
import { getCharacterAsync } from "./features/character/characterSlice";
import { shallowEqual } from "react-redux";

function App() {
  const LOCALSTORAGE = window.localStorage;
  let localInfo = LOCALSTORAGE.getItem("isLogin")
    ? JSON.parse(LOCALSTORAGE.getItem("isLogin") || "")
    : false;
  const reduxInfo = useAppSelector((state) => state, shallowEqual);
  const verified_userId = localInfo ? localInfo.userInfo.id : false;
  const dispatch = useAppDispatch();

  const InitializeUser = async () => {
    console.log("Initializing...");
    if (verified_userId) {
      try {
        const userInfo = await TDQuestAPI.get(
          `userInfo/?id=${verified_userId}`
        );
        dispatch(getUserData(userInfo.data.userInfo.id));
        const charInfo = await TDQuestAPI.get(
          `character/?user_id=${verified_userId}`
        );
        dispatch(getCharacterAsync(userInfo.data.userInfo.id));
        console.log(
          "------------------------------------------------- \n Initaialzie User success \n -------------------------------------------------"
        );
        console.log("userInfo by axios : ", userInfo.data);
        console.log("charInfo by axios : ", charInfo.data);
      } catch (err: any) {
        console.log("Initialize err :", err);
        LOCALSTORAGE.removeItem("isLogin");
      }
    }
  };

  const signOauth = async( code : any)=>{
    const OauthResponse = await TDQuestAPI.get(`/oauth/kakao/callback?code=${code}`);
    const isLogin = { status: "loggedIn", ...OauthResponse.data};
    localStorage.setItem("isLogin", JSON.stringify(isLogin));
  }


  useEffect(() => {
    InitializeUser();
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    if (!localInfo && code){
      signOauth(code);
    }
  }, []);

  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
