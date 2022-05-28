import styled from "styled-components";
import {
  color_primary_green_dark,
  color_context_gray,
  color_context_brown,
  color_white,
  color_context_beige,
  fontSize_body_laptop,
} from "../../components/CommonStyle";

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
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const CharContainer = styled.div`
  flex: 1.5 0 0;
  display: flex;
  min-width: 200px;
  max-width: 300px;
  height: 200px;
`;

export const UserInfoDetailContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  flex: 2 0 0;
  max-width: 500px;
  min-width: 300px;
  .change_userinfo_wrapper {
    width: 70%;
    justify-content: flex-start;
    @media (max-width: 768px) {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .change_name {
      width: 80%;
      height: 30px;
      margin-bottom: 10px;
      border: 1px solid #2d9bf0;
      border-radius: 5px;
      background-color: transparent;
    }
    input::placeholder {
      font-size:16px;
    }
  }
  .change_pw_btn {
    border: none;
    color: ${color_primary_green_dark};
    background-color: transparent;
    font-family: "Fredoka One", cursive;
    font-size: 18px;
    margin: 10px 0;
    &:hover {
      cursor: pointer;
    }
  }
  .user_id_wrapper {
    display: flex;
    flex-direction: column;
    width: 70%;
    justify-content: flex-start;
    h1 {
      width: 100%;
      font-size: 1.3rem;
      font-family: "Fredoka One", cursive;
      margin-bottom: 15px;
    }
  }
  h2 {
    width: 70%;
    font-size: 1.3rem;
    font-family: "Fredoka One", cursive;
    margin-bottom: 15px;
    color: ${color_context_gray};
  }
  .ButtonContainer {
    width: 80%;
    max-width: 350px;
    min-width: 300px;
    margin-top: 10px;
    display: flex;
    justify-content: space-evenly;
    .button_margin {
      min-width: 5px;
    }
  }
  @media (max-width: 768px) {
    margin-top: 20px;
  }
`;

export const HelperBearContainer = styled.div`
  margin: 20px 0;
  display: flex;
  justify-content: flex-start;
  flex: 3 0 0;
`;

export const BottomContentContainer = styled.div`
  display: flex;
  width: 90%;
  height: 400px;
  min-height: 400px;
  margin: 15px 0;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MyDoneListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const AchievementsContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 48%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  height: 45px;
  background-color: ${color_context_brown};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  h3 {
    font-size: ${fontSize_body_laptop};
    font-family: "Fredoka One", cursive;
    color: ${color_white};
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 400px;
  overflow-y: scroll;
  align-items: center;
  padding: 10px 0;
  background-color: ${color_context_beige};
  h3 {
    font-size: ${fontSize_body_laptop};
    height: 1.5rem;
    font-family: "OpenSans";
    text-align: center;
  }
  &::-webkit-scrollbar {
    background-color: transparent;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    background-color: #d0cfcf;
  }
`;
