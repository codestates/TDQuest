import styled from "styled-components";

export const HeaderContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 80px;
  font-family: "Fredoka One", cursive;
  font-size: 35px;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Logo = styled.div`
  a {
    display: flex;
    align-items: center;
    padding-left: 3vw;
    height: 40px;
    color: white;
  }
`;

export const LogoImage = styled.img`
  height: 40px;
`;

export const MenuBarContainer = styled.div`
  width: 60%;
  height: 50px;
  display: flex;
  justify-content: space-between;
  padding-left: 2vw;
  padding-right: 2vw;
  @media (max-width: 768px) {
    display: none;
  }
`;

export const MenuBar = styled.div`
  display: flex;
  align-items: flex-end;
  font-size: 25px;
  color: black;
  border-radius-top: 5px;
  font-family: "Fredoka One", cursive;
  a {
    &:hover {
      color: #194795;
    }
  }
`;

export const SignHandler = styled.div`
  background-color: #509b67;
  padding-right: 3vw;
  border: none;
  font-family: "Fredoka One", cursive;
  font-size: 30px;
  color: white;
`;
