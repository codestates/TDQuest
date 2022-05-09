import styled from "styled-components";
import { color_primary_green_light } from "../../components/CommonStyle";

export const MyPageContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 90vh;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const MyPageHeader = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  .headerContainer {
    display: flex;
    margin-left: 3vw;
    img {
      image-rendering: pixelated;
      width: 30px;
      margin-right: 10px;
    }
    h1 {
      font-size: 1.5rem;
      font-family: "Fredoka One", cursive;
      color: #414693;
    }
  }
`;

export const UserInfoContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`;

export const CharContainer = styled.div`
  flex: 1.5 0 0;
  display: flex;
`;

export const UserInfoDetailContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 2 0 0;
  h1 {
    font-size: 1.5rem;
    font-family: "Fredoka One", cursive;
    margin-bottom: 10px;
  }
  h2 {
    font-size: 1.2rem;
    font-family: "Fredoka One", cursive;
  }
  .ButtonContainer {
    width: 80%;
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
  }
`;

export const HelperBearContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 3 0 0;
`;
