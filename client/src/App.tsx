import React, { useEffect } from "react";
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
    if (verified_userId) {
      try {
        const userInfo = await TDQuestAPI.get(
          `userInfo/?id=${verified_userId}`
        );
        dispatch(getUserData(userInfo.data.userInfo.id));
        const charInfo = await TDQuestAPI.get(
          `character/?user_id=${verified_userId}`
        );
        console.log(charInfo);
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

  useEffect(() => {
    InitializeUser();
  }, []);
  console.log("localStorage : ", localInfo);
  console.log("reduxStore : ", reduxInfo);
  return (
    <div className="App">
      <MainRouter />
    </div>
  );
}

export default App;
