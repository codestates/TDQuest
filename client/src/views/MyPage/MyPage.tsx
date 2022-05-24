import React, { useState, useEffect } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { color_primary_green_light } from "../../components/CommonStyle";
import Loading from "../../components/Loading";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import Button from "../../components/Button";
import MsgModal from "../../components/MsgModal";
import { Toast } from "../../components/Toast";
import { DeleteUserAlertModal } from "./DeleteUserModal";
import { ChangePasswordModal } from "./ChangePWModal";
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
import { TDQuestAPI } from "../../API/tdquestAPI";

function MyPage() {
  const [charData, setCharData] = useState<CharDataType>({} as CharDataType);
  const [donelist, setDonelist] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userInfo, setUserInfo] = useState({ nickname: "", email: "" });
  const [pwModal, setPwModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [netError, setNetError] = useState(false);

  const LOCALSTORAGE = JSON.parse(
    window.localStorage.getItem("isLogin") as string
  );

  const { id: L_user_id, email: L_email } = LOCALSTORAGE.userInfo;
  //const accessToken = LOCALSTORAGE.accessToken;

  useEffect(() => {
    if (loading) {
      const getComleteTDList = async () => {
        console.log(L_user_id);
        await TDQuestAPI.get(`todo/complete/?user_id=${L_user_id}`)
          .then((res) => {
            setDonelist(res.data.todo_lists);
            setNetError(false);
            setLoading(false);
          })
          .catch((err) => {
            setNetError(true);
            console.log(err);
          });
      };
      getComleteTDList();

      const getUserData = async () => {
        await TDQuestAPI.get(`userinfo/?id=${L_user_id}`)
          .then((res) => {
            setNetError(false);
            setUserInfo({
              nickname: res.data.userInfo.nickname,
              email: res.data.userInfo.email,
            });
          })
          .catch((err) => {
            setNetError(true);
            console.log(err);
          });
      };
      getUserData();
    }

    setCharData(LOCALSTORAGE.characterInfo);
  }, []);

  // User Action 관련한 함수들
  const handleChange = () => {
    setOnChange(!onChange);
    setShowModal(false);
    if (showToast) {
      setShowToast(false);
    }
  };

  const handleSaveChange = async () => {
    setOnChange(!onChange);
    console.log("Changed UserName : ", userInfo.nickname);
    await TDQuestAPI.patch(`userInfo/?id=${L_user_id}`, {
      nickname: userInfo.nickname,
    })
      .then((res) => {
        setNetError(false);
        setShowToast(true);
      })
      .catch((err) => {
        setNetError(true);
        setShowToast(true);
      });
  };

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
  const changePassword = async () => {
    console.log("유저 패스워드 변경");
    setShowModal(false);
  };

  const changeName = (event: React.FormEvent<HTMLInputElement>) => {
    setUserInfo({ nickname: event.currentTarget.value, email: userInfo.email });
    console.log(userInfo);
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
                    placeholder={` ${userInfo.nickname}`}
                    onChange={changeName}
                    autoComplete="off"
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
                      <ChangePasswordModal
                        user_id={L_user_id}
                        email={L_email}
                        close={closeModal}
                        saveChange={handleChange}
                        setShowToast={() => setShowToast(!showToast)}
                      />
                    </MsgModal>
                  ) : null}
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
                </div>
              ) : (
                <div className="user_id_wrapper">
                  <h1>{userInfo.nickname}</h1>
                  <h2>{userInfo.email}</h2>
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
                text={`Your total done list : ${donelist.length}! Great job!`}
              />
            </HelperBearContainer>
          </UserInfoContainer>
          <BottomContentContainer>
            <MyDoneListContainer>
              <TitleContainer>
                <h3>My Done Lists</h3>
              </TitleContainer>
              <ContentContainer>
                {!donelist
                  ? null
                  : donelist.map((el, idx) => {
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
          {showToast ? (
            netError ? (
              <Toast text={`🚫 Network Error! \n Check your network settings`} />
            ) : (
              <Toast text="✅  User Info Changed Complete!" />
            )
          ) : null}
        </MyPageContainer>
      )}
    </div>
  );
}

export default MyPage;
