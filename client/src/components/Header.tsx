import React, { useState } from 'react';
import {
  HeaderContainer,
  Logo,
  LogoImage,
  MenuBarContainer,
  MenuBar,
  SignHandler,
  ToggleMenu,
  ToggleIcon,
  DropDownContainer,
} from './HeaderStyle';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import UserIcon from '../static/images/icons/circle_user.svg';
import DropDown from './DropDown';

function Header() {
  // 추후 Login 관련 state로 사용 (redux로 변경 예정)
  let isLogin = window.localStorage.getItem("isLogin")? JSON.parse(window.localStorage.getItem("isLogin") || "") : false;
  // const isLogin = true;
  // 해당 페이지의 nav 메뉴 버튼 활성화를 위해 현재 경로 가져옴
  let location = useLocation();

  let [sideMenuToggle, setSideMenuToggle] = useState(false);

  const sideMenuToggleHanddler = () => {
    setSideMenuToggle(!sideMenuToggle);
  };

  return (
    <HeaderContainer>
      <Logo>
        <Link to={'/'}>
          <LogoImage src={require('../static/images/Logo.png')} alt='logo' />
          <p>TDQuest</p>
        </Link>
      </Logo>
      {/* Login상황일 경우, MenuBar가 표시된다. 
      MainPage에서는 MenuBar가 표시되지 않으므로 필요한 작업임! */}
      {isLogin.status === "loggedIn"? (
        <MenuBarContainer>
          <MenuBar active={location.pathname === '/status' ? true : false}>
            <Link to={'/status'}>My Status</Link>
          </MenuBar>
          <MenuBar active={location.pathname === '/todo' ? true : false}>
            <Link to={'/todo'}>To-Do List</Link>
          </MenuBar>
          <MenuBar active={location.pathname === '/raid' ? true : false}>
            <Link to={'/raid'}>Boss Raid</Link>
          </MenuBar>
          <MenuBar active={location.pathname === '/ranking' ? true : false}>
            <Link to={'/ranking'}>Ranking</Link>
          </MenuBar>
        </MenuBarContainer>
      ) : null}
      {/* <SignHandler>
        <Button width='120px' fontSize='30px' text='Sign in'></Button>
      </SignHandler> */}
      <ToggleMenu>
        <ToggleIcon
          src={UserIcon}
          alt='logo'
          onClick={() => {
            sideMenuToggleHanddler();
          }}
        ></ToggleIcon>
      </ToggleMenu>
      {sideMenuToggle ? (
        <DropDownContainer
          onClick={() => {
            sideMenuToggleHanddler();
          }}
        >
          <DropDown></DropDown>
        </DropDownContainer>
      ) : null}
    </HeaderContainer>
  );
}

export default Header;
