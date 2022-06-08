import React, { useEffect } from 'react';
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
//새로고침 관련 수정 코드들
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { TDQuestAPI } from '../../API/tdquestAPI';
import { getUserData } from '../../features/userinfo/userInfoSlice';
import { getCharacterAsync } from '../../features/character/characterSlice';
import { shallowEqual } from 'react-redux';
import { signOauth } from '../../features/sign/signSlice';
import { useLocation } from 'react-router-dom';

function MainRouter() {
  let location = window.location.pathname;
  // console.log(location);
  let isLogin = window.localStorage.getItem('isLogin')
    ? JSON.parse(window.localStorage.getItem('isLogin') || '')
    : false;

  const LOCALSTORAGE = window.localStorage;
  let localInfo = LOCALSTORAGE.getItem('isLogin')
    ? JSON.parse(LOCALSTORAGE.getItem('isLogin') || '')
    : false;
  const reduxInfo = useAppSelector((state) => state);
  const verified_userId = localInfo ? localInfo.userInfo.id : false;
  const dispatch = useAppDispatch();

  const InitializeUser = async () => {
    // console.log("Initializing...");
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
          '--------------------------------------- \n Initaialzie User success \n ------------------------------------'
        );
        console.log('userInfo by axios : ', userInfo.data);
        console.log('charInfo by axios : ', charInfo.data);
      } catch (err: any) {
        // console.log("Initialize err :", err);
        LOCALSTORAGE.removeItem('isLogin');
      }
    }
  };

  useEffect(() => {
    InitializeUser();
    const url = new URL(window.location.href);
    const code = url.searchParams.get('code');
    const search = String(url).includes('google');
    // console.log(search)
    if (!localInfo && code) {
      dispatch(signOauth(url));
    }
  }, [location]);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route
          path='/'
          element={
            isLogin.status === 'loggedIn' ? <TodoListPage /> : <MainPage />
          }
        />
        {/* <Route path='/' element={<MainPage/>} /> */}
        <Route path='/main' element={<MainPage />} />
        <Route path='/todo' element={<TodoListPage />} />
        <Route path='/status' element={<StatusPage />} />
        <Route path='/sign' element={<SignPage />} />
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/raidjoin' element={<RaidJoinPage />} />
        <Route
          path='/raid'
          element={
            isLogin.damage_logInfo &&
            !isLogin.damage_logInfo.damage_log_Info ? (
              <RaidPage />
            ) : (
              <RaidJoinPage />
            )
          }
        />
        <Route path='/ranking' element={<RankingPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default MainRouter;
