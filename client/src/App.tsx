import React, { useEffect } from "react";
import "./App.css";
import MainRouter from "./views/Router/Router";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import { TDQuestAPI } from "./API/tdquestAPI";
import { getUserData } from "./features/userinfo/userInfoSlice";
import { getCharacterAsync } from "./features/character/characterSlice"

function App() {
  const LOCALSTORAGE = window.localStorage;
  const userInfoRedux = useAppSelector((state) => state.sign);
  let localInfo = LOCALSTORAGE.getItem("isLogin")
    ? JSON.parse(LOCALSTORAGE.getItem("isLogin") || "")
    : false;
  const verified_userId = localInfo ? localInfo.userInfo.id : false;
  const dispatch = useAppDispatch();

  const InitializeUser = async () => {
    if (verified_userId) {
      try{
        const userInfo = await TDQuestAPI.get(`userInfo/?id=${verified_userId}`);
        dispatch(getUserData(String(userInfo.data.id)))
        // const charInfo = await TDQuestAPI.get(`character/?user_id=${verified_userId}`);
        // dispatch(getCharacterAsync(charInfo))
        console.log(
          "------------------------------------------------- \n Initaialzie User success \n -------------------------------------------------"
        );
        console.log("userInfo by SignIn axios : ", userInfo.data);
        console.log("localStorage : ", localInfo);
        console.log("reduxStore : ", userInfoRedux);
      }
      catch(err : any){
        console.log("Initialize err :", err);
        LOCALSTORAGE.removeItem("isLogin");
      };
    };
  }

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
