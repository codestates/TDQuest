import React, { useState } from "react";
import {
  HeaderContainer,
  Logo,
  LogoImage,
  MenuBarContainer,
  MenuBar,
  SignHandler,
} from "./HeaderStyle";
import Button from "./Button";
import { Link } from "react-router-dom";

function Header({ bgColor }: { bgColor: string }) {
  // 추후 Login 관련 state로 사용 (redux로 변경 예정)
  const isLogin = true;

  return (
    <HeaderContainer bgColor={bgColor}>
      <Logo>
        <Link to={"/"}>
          <LogoImage src={require("../static/images/Logo.png")} alt="logo" />
          <p>TDQuest</p>
        </Link>
      </Logo>
      {/* Login상황일 경우, MenuBar가 표시된다. 
      MainPage에서는 MenuBar가 표시되지 않으므로 필요한 작업임! */}
      {isLogin ? (
        <MenuBarContainer>
          <MenuBar>
            <Link to={"/status"}>My Status</Link>
          </MenuBar>
          <MenuBar>
            <Link to={"/todo"}>To-Do List</Link>
          </MenuBar>
          <MenuBar>
            <Link to={"/raid"}>Boss Raid</Link>
          </MenuBar>
          <MenuBar>
            <Link to={"/ranking"}>Ranking</Link>
          </MenuBar>
        </MenuBarContainer>
      ) : null}
      <SignHandler>
        <Button width="120px" fontSize="30px" text="Sign in"></Button>
      </SignHandler>
    </HeaderContainer>
  );
}

export default Header;
