import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { color_primary_green_light } from "../../components/CommonStyle";
import Loading from "../../components/Loading";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import Button from "../../components/Button";
import MsgModal from "../../components/MsgModal";
import {
  ChangePasswordModal,
  DeleteUserAlertModal,
} from "./DeleteUserAlert_Modal";
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
  APIMAIN,
  TDQuestAPI,
} from "../../API/tdquestAPI";
axios.defaults.withCredentials = true;

function MyPage() {
  const [charData, setCharData] = useState<CharDataType>({} as CharDataType);
  const [userData, setUserData] = useState<UserDataType>({} as UserDataType);
  const [donelist, setDonelist] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userName, setUserName] = useState({ nickname: "", email: "" });
  const [pwModal, setPwModal] = useState(false);

  const LOCALSTORAGE = window.localStorage.getItem("isLogin") as string

  const { id: user_id } = JSON.parse(LOCALSTORAGE).userInfo;
  const accessToken = JSON.parse(LOCALSTORAGE).accessToken;

  useEffect(() => {
    if (loading) {
      const getComleteTDList = async () => {
        console.log(accessToken);
        await axios.get(`${APIMAIN}/todo/complete/?user_id=${user_id}`, {
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        })
          .then((res) => {
            setDonelist(res.data.todo_list);
            setLoading(false);
          });
      };
      getComleteTDList();

      const getUserData = async () => {
        await axios.get(`${APIMAIN}/userinfo/?id=${user_id}`).then((res) => {
          setUserName({
            nickname: res.data.userInfo.nickname,
            email: res.data.userInfo.email,
          });
        });
      };
      getUserData();
    }
  }, []);

  console.log(donelist);

  // 캐릭터 창 렌더링을 위한 더미 Data
  const { image, status_phy, status_int, status_spi, userLevel, userExp } =
    charData;

  const { nickname, email } = userData;

  const handleChange = () => {
    setOnChange(!onChange);
  };

  const handleSaveChange = () => {
    setOnChange(!onChange);
    console.log('Changed UserName : ', userName.nickname);
    TDQuestAPI.patch(`userInfo`, {
      id: user_id,
      nickname: userName.nickname,
    })
  }

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setPwModal(false);
  };
  const deletAccount = () => {
    // 유저 정보 삭제 관련 로직
    console.log("유저 정보 삭제");
  };
  const changePassword = () => {
    console.log("유저 패스워드 변경");
    setShowModal(false);
  };

  const changeName = (event: React.FormEvent<HTMLInputElement>) => {
    setUserName({ nickname: event.currentTarget.value, email: userName.email });
    console.log(userName);
  };

  const handleDeleteList = (id: number) => {
    const tmpList = donelist.filter((el) => {
      if (el.id === id) {
        return false;
      }
      return true;
    });
    setDonelist(tmpList);
  };

  return (
    <div>
      {loading ? (
        <MyPageContainer bgColor={color_primary_green_light}>
          <Loading customText="Loading..." />
        </MyPageContainer>
      ) : (
        <MyPageContainer bgColor={color_primary_green_light}>
          {/* 유저 계정 삭제 확인 관련 모달 창 코드 */}
          {pwModal ? null : (
            <MsgModal
              header="❗️ Delete account"
              open={showModal}
              close={closeModal}
              footerClick={deletAccount}
            >
              <DeleteUserAlertModal />
            </MsgModal>
          )}
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
                <div className="change_userinfo_wrapper">
                  <input
                    type="text"
                    className="change_name"
                    placeholder={` ${userName.nickname}`}
                    onChange={changeName}
                  ></input>
                  <button
                    className="change_pw_btn"
                    onClick={() => {
                      openModal();
                      setPwModal(true);
                    }}
                  >
                    Change Password
                  </button>
                  {/* 유저 비밀번호 수정 관련 모달 창 코드 */}
                  {pwModal ? (
                    <MsgModal
                      header="❗️ Change Password"
                      open={showModal}
                      close={closeModal}
                      footerClick={changePassword}
                      noFooter={true}
                    >
                      <ChangePasswordModal />
                    </MsgModal>
                  ) : null}
                </div>
              ) : (
                <div className="user_id_wrapper">
                  <h1>{userName.nickname}</h1>
                  <h2>{userName.email}</h2>
                </div>
              )}
              {!onChange ? (
                <div className="ButtonContainer">
                  <Button text="Change info" onClick={handleChange} />
                  <div className="button_margin"></div>
                  <Button text="Delete Account" deactive={true} />
                </div>
              ) : (
                <div className="ButtonContainer">
                  <Button text="Save Change" onClick={handleSaveChange} />
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
                      id={el.id}
                      content={el.content}
                      updatedAt={el.updatedAt}
                      handleDeleteList={handleDeleteList}
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
  // 유저 Name은 비밀번호가 없어도 변경가능하도록 API 구성 필요
  // user info에 total done lists(총 갯수만) 추가 필요
  // user todo done lists
  // done todo_list 삭제 요청
}
