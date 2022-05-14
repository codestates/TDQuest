import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { color_primary_green_light } from "../../components/CommonStyle";
import Loading from "../../components/Loading";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import Button from "../../components/Button";
import MsgModal from "../../components/MsgModal";
import DeleteUserAlert_Modal from "./DeleteUserAlert_Modal";
import { CharDataType, UserDataType } from "../../Types/generalTypes";
import {
  MyPageContainer,
  MyPageHeader,
  UserInfoContainer,
  CharContainer,
  UserInfoDetailContainer,
  HelperBearContainer,
} from "./MyPageStyle";
// API REQUEST
import {
  dummyRes_getCharacterInfo,
  dummyRes_getUserInfo,
} from "../../API/tdquestAPI";

function MyPage() {
  const [charData, setCharData] = useState<CharDataType>({} as CharDataType);
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
  const [loading, setLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        const getcharacterData: any =
          dummyRes_getCharacterInfo.data.characterInfo;
        const getUserData: any = dummyRes_getUserInfo.data.userInfo;
        setUserData(getUserData);
        setCharData(getcharacterData);
        setLoading(false);
      }, 500);
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

  const handleChange = () => {
    setOnChange(!onChange);
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
  };
  const deletAccount = () => {
    // 유저 정보 삭제 관련 로직
    console.log("유저 정보 삭제");
  };

  return (
    <div>
      {loading ? (
        <MyPageContainer bgColor={color_primary_green_light}>
          <Loading customText="Loading..." />
        </MyPageContainer>
      ) : (
        <MyPageContainer bgColor={color_primary_green_light}>
          <MsgModal
            header="❗️ Delete account"
            open={showModal}
            close={closeModal}
            footerClick={deletAccount}
          >
            <DeleteUserAlert_Modal />
          </MsgModal>
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
              <div className="user_id_wrapper">
                <h1>{user_id}</h1>
              </div>
              <h2>{email}</h2>
              {!onChange ? (
                <div className="ButtonContainer">
                  <Button text="Change info" onClick={handleChange} />
                  <div className="button_margin"></div>
                  <Button text="Delete Account" deactive={true} />
                </div>
              ) : (
                <div className="ButtonContainer">
                  <Button text="Save Change" onClick={handleChange} />
                  <div className="button_margin"></div>
                  <Button text="Delete Account" onClick={openModal} />
                </div>
              )}
            </UserInfoDetailContainer>
            <HelperBearContainer>
              <HelperBear
                width="220px"
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
