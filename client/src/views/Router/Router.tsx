import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import MainPage from "../MainPage/MainPage";
import SignPage from "../SignPage/SignPage";
import TodoListPage from "../TodoListPage/TodoListPage";
import StatusPage from "../StatusPage/StatusPage";
import MyPage from "../MyPage/MyPage";
import RaidJoinPage from "../RaidJoinPage/RaidJoinPage";
import RaidPage from "../RaidPage/RaidPage";
import RankingPage from "../RankingPage/RankingPage";

function MainRouter({
  headerColor,
  bgColor,
  mainPageColor,
}: {
  headerColor: string;
  bgColor: string;
  mainPageColor: string;
}) {
  return (
    <BrowserRouter>
      <Header bgColor={headerColor} />
      <Routes>
        <Route path="/" element={<MainPage bgColor={mainPageColor} />} />
        <Route path="/todo" element={<TodoListPage bgColor={bgColor} />} />
        <Route path="/status" element={<StatusPage bgColor={bgColor} />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/mypage" element={<MyPage />} />
        <Route path="/raidjoin" element={<RaidJoinPage bgColor={bgColor} />} />
        <Route path="/raid" element={<RaidPage bgColor={bgColor} />} />
        <Route path="/ranking" element={<RankingPage bgColor={bgColor} />} />
      </Routes>
      <Footer bgColor={headerColor} />
    </BrowserRouter>
  );
}

export default MainRouter;
