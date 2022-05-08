import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color_primary_green_light } from "../../components/CommonStyle";
import Loading from "../../components/Loading";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import Button from "../../components/Button";
import { CharDataType, UserDataType } from "../../Types/generalTypes";
// API REQUEST
import {
  dummyRes_getCharacterInfo,
  dummyRes_getUserInfo,
} from "../../API/tdquestAPI";

const MyPageContainer = styled.div<{ bgColor: string }>`
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

const MyPageHeader = styled.div`
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

const UserInfoContainer = styled.div`
  width: 90%;
  display: flex;
  align-items: center;
`;

const CharContainer = styled.div`
  flex: 1.5 0 0;
  display: flex;
`;

const UserInfoDetailContainer = styled.div`
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

const HelperBearContainer = styled.div`
  display: flex;
  justify-content: center;
  flex: 3 0 0;
`;

function MyPage() {
  const [charData, setCharData] = useState<CharDataType>({} as CharDataType);
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        const getcharacterData: any =
          dummyRes_getCharacterInfo.data.characterInfo;
        const getUserData: any = dummyRes_getUserInfo.data.userInfo;
        setUserData(getUserData);
        setCharData(getcharacterData);
        setLoading(false);
      }, 2000);
    }
  }, []);

  // 캐릭터 창 렌더링을 위한 더미 Data
  const {
    user_id,
    image,
    status_phy,
    status_int,
    status_spl,
    userLevel,
    userExp,
  } = charData;

  const { nickname, email } = userData;

  return (
    <div>
      {loading ? (
        <MyPageContainer bgColor={color_primary_green_light}>
          <Loading customText="Loading..." />
        </MyPageContainer>
      ) : (
        <MyPageContainer bgColor={color_primary_green_light}>
          <MyPageHeader>
            <div className="headerContainer">
              <img
                src={require("../../static/images/icons/Achievements.png")}
                alt="Achievements"
              />
              <h1>My Info</h1>
            </div>
          </MyPageHeader>
          <UserInfoContainer>
            <CharContainer>
              <Status charData={charData} onlyChar={true} />
            </CharContainer>
            <UserInfoDetailContainer>
              <h1>{user_id}</h1>
              <h2>{email}</h2>
              <div className="ButtonContainer">
                <Button text="Change info"></Button>
                <Button text="Delete Account" deactive={true}></Button>
              </div>
            </UserInfoDetailContainer>
            <HelperBearContainer>
              <HelperBear
                width="200px"
                text="Your total done list : 1,050! Great job!"
              />
            </HelperBearContainer>
          </UserInfoContainer>
        </MyPageContainer>
      )}
    </div>
  );
}

export default MyPage;
