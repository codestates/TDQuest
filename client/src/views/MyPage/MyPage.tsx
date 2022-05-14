import React, { useState, useEffect } from "react";
import styled from "styled-components";
import {
  color_primary_green_light,
  color_context_brown,
  fontSize_body_laptop,
  color_white,
  color_context_beige,
  color_context_beige_light,
} from "../../components/CommonStyle";
import Loading from "../../components/Loading";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import Button from "../../components/Button";
import MsgModal from "../../components/MsgModal";
import DeleteUserAlert_Modal from "./DeleteUserAlert_Modal";
import DoneContents from "./DoneContents";
import {
  CharDataType,
  UserDataType,
  TodoListType,
} from "../../Types/generalTypes";
import {
  MyPageContainer,
  MyPageHeader,
  UserInfoContainer,
  CharContainer,
  UserInfoDetailContainer,
  HelperBearContainer,
  BottomContentContainer,
  MyDoneListContainer,
  AchievementsContainer,
  TitleContainer,
  ContentContainer,
} from "./MyPageStyle";
// API REQUEST
import {
  dummyRes_getCharacterInfo,
  dummyRes_getTodolist,
  dummyRes_getUserInfo,
} from "../../API/tdquestAPI";

function MyPage() {
  const [charData, setCharData] = useState<CharDataType>({} as CharDataType);
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
  const [donelist, setDonelist] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (loading) {
      const getcharacterData: any =
        dummyRes_getCharacterInfo.data.characterInfo;
      const getUserData: any = dummyRes_getUserInfo.data.userInfo;
      const donelists: any = dummyRes_getTodolist.todoInfo;
      setDonelist(donelists);
      setUserData(getUserData);
      setCharData(getcharacterData);
      setLoading(false);
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
              {onChange ? (
                <input
                  type="text"
                  className="change_name"
                  placeholder={user_id}
                ></input>
              ) : (
                <div className="user_id_wrapper">
                  <h1>{user_id}</h1>
                </div>
              )}
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
          <BottomContentContainer>
            <MyDoneListContainer>
              <TitleContainer>
                <h3>My Done Lists</h3>
              </TitleContainer>
              <ContentContainer>
                {donelist.map((el, idx) => {
                  return (
                    <DoneContents
                      key={idx}
                      content={el.content}
                      created_at={el.created_at}
                    />
                  );
                })}
              </ContentContainer>
            </MyDoneListContainer>
            <AchievementsContainer>
              <TitleContainer>
                <h3>Achievements</h3>
              </TitleContainer>
              <ContentContainer></ContentContainer>
            </AchievementsContainer>
          </BottomContentContainer>
        </MyPageContainer>
      )}
    </div>
  );
}

export default MyPage;

// 필요 데이터
{
  // user info - user name, email, password
  // user info에 total done lists(총 갯수만) 추가 필요
  // user todo done lists
  // done todo_list 삭제 요청
}
