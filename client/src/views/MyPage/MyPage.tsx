import React, { useState, useEffect } from "react";
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
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  getUserData,
  modifyNickname,
} from "../../features/userinfo/userInfoSlice";

function MyPage() {
  const [charData, setCharData] = useState<CharDataType>({} as CharDataType);
  const [donelist, setDonelist] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState(true);
  const [onChange, setOnChange] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [curNickName, setCurNickName] = useState("");
  const [checkNickNameValidation, setNickNameValidation] = useState("");
  const [pwModal, setPwModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [netError, setNetError] = useState(false);

  const userData = useAppSelector((state) => state.MyPageInfo);
  const dispatch = useAppDispatch();

  const LOCALSTORAGE = window.localStorage;
  const LOCALSTORAGE_PASRED = JSON.parse(
    window.localStorage.getItem("isLogin") as string
  );

  const { id: L_user_id, email: L_email } = LOCALSTORAGE_PASRED.userInfo;

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

      dispatch(getUserData(L_user_id)).then((res) => {
        switch (res.type) {
          case "userinfo/pending":
            return setLoading(true);
          case "userinfo/fulfilled": {
            setNetError(false);
            setLoading(false);
            break;
          }
          case "userinfo/rejected":
            return setNetError(true);
        }
      });
    }
    setCharData(LOCALSTORAGE_PASRED.characterInfo);
  }, []);

  console.log(userData);

  // User Action 관련한 함수들
  const handleChange = () => {
    setOnChange(!onChange);
    setShowModal(false);
    if (showToast) {
      setShowToast(false);
    }
  };

  // 유저 닉네임 수정 관련 함수 (버튼 클릭 시 실행)
  const handleSaveChange = () => {
    if (curNickName === "") {
      return null;
    }
    setOnChange(!onChange);

    dispatch(
      modifyNickname({ user_id: L_user_id, nickname: curNickName })
    ).then((res) => {
      console.log(res);
      switch (res.type) {
        case "modifyNickname/pending":
          return setLoading(true);
        case "modifyNickname/fulfilled": {
          setLoading(false);
          console.log("닉네임 수정 성공");
          setNetError(false);
          setShowToast(true);
          LOCALSTORAGE_PASRED.userInfo.nickname = curNickName;
          LOCALSTORAGE.setItem("isLogin", JSON.stringify(LOCALSTORAGE_PASRED));
          break;
        }
        case "modifyNickname/rejected": {
          setLoading(false);
          setNetError(true);
          setShowToast(true);
        }
      }
    });
  };

  const openModal = () => {
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setPwModal(false);
  };
  const changeName = (event: React.FormEvent<HTMLInputElement>) => {
    setCurNickName(event.currentTarget.value);
    console.log(curNickName);
  };

  const transferNickName = (name: string) => {
    setNickNameValidation(name);
    deleteAccount();
  };

  const deleteAccount = async () => {
    // 유저 정보 삭제 관련 로직
    console.log("유저 정보 삭제")
    console.log(checkNickNameValidation, userData.nickname);
    if (checkNickNameValidation === userData.nickname) {
      await TDQuestAPI.delete(`sign/out/?id=${L_user_id}`).then((res) => {
        console.log(res.data.message);
        LOCALSTORAGE.removeItem("isLogin");
        LOCALSTORAGE.removeItem("accessToken");
        LOCALSTORAGE.assign("/");
      });
    } else {
      console.log("닉네임을 올바르게 입력하세요")
    }
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

  console.log(donelist);

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
                    placeholder={` ${userData.nickname}`}
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
                      footerClick={deleteAccount}
                      noFooter={true}
                    >
                      <DeleteUserAlertModal
                        transferNickName={(name: string) =>
                          transferNickName(name)
                        }
                        curNickName={userData.nickname}
                      />
                    </MsgModal>
                  )}
                </div>
              ) : (
                <div className="user_id_wrapper">
                  <h1>{userData.nickname}</h1>
                  <h2>{userData.email}</h2>
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
              <Toast
                text={`🚫 Network Error! \n Check your network settings`}
              />
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
