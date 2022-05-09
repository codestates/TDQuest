import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import MainPage from '../MainPage/MainPage';
import SignPage from '../SignPage/SignPage';
import TodoListPage from '../TodoListPage/TodoListPage';
import StatusPage from '../StatusPage/StatusPage';
import MyPage from '../MyPage/MyPage';
import RaidJoinPage from '../RaidJoinPage/RaidJoinPage';
import RaidPage from '../RaidPage/RaidPage';
import RankingPage from '../RankingPage/RankingPage';

function MainRouter() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/todo' element={<TodoListPage />} />
        <Route path='/status' element={<StatusPage />} />
        <Route path='/sign' element={<SignPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/raidjoin' element={<RaidJoinPage />} />
        <Route path='/raid' element={<RaidPage />} />
        <Route path='/ranking' element={<RankingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default MainRouter;
