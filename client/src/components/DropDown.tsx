import React from "react";
import styled from "styled-components";
import Button from "./Button";
import { Link } from "react-router-dom";
import {
  color_primary_green_dark,
  color_primary_green_light,
  color_context_blue,
  fontSize_smallButton_laptop,
} from "./CommonStyle";
import { is } from "immer/dist/internal";

const DropDownContainer = styled.div<{}>`
  background-color: ${color_primary_green_light};
  border: 2px solid ${color_primary_green_dark};
  border-radius: 10px;
  position: absolute;
  right: 1vw;
  top: 60px;
`;

const MenuItems = styled.li<{}>`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Item = styled.p<{}>`
  color: black;
  font-size: ${fontSize_smallButton_laptop};
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: ${color_context_blue};
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

function DropDown() {
  let isLogin = window.localStorage.getItem("isLogin")
    ? JSON.parse(window.localStorage.getItem("isLogin") || "")
    : false;

  return (
    <DropDownContainer>
      <MenuItems>
        {isLogin.status === "loggedIn" ? (
          <>
            <Item>
              <Link to={"/status"}>My Status</Link>
            </Item>
            <Item>
              <Link to={"/todo"}>To-Do List</Link>
            </Item>
            <Item>
              <Link to={"/raid"}>Boss Raid</Link>
            </Item>
            <Item>
              <Link to={"/ranking"}>Ranking</Link>
            </Item>
            <Link to={"/mypage"}>
              <Button
                width="100%"
                fontSize={fontSize_smallButton_laptop}
                padding="3px"
                text="My page"
                height="100%"
                marginBottom="10px"
              ></Button>
            </Link>
          </>
        ) : null}
        <Button
          width="100%"
          fontSize={fontSize_smallButton_laptop}
          padding="3px"
          text={isLogin.status === "loggedIn" ? "Sign out" : "Sign In"}
          height="100%"
          onClick={
            isLogin.status === "loggedIn"
              ? () => {
                  window.localStorage.removeItem("isLogin");
                  window.location.assign("/");
                }
              : () => window.location.assign("/sign")
          }
        ></Button>
      </MenuItems>
    </DropDownContainer>
  );
}

export default DropDown;
