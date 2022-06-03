import React, { useState, useEffect } from "react";
import axios, { AxiosRequestConfig } from "axios";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import AboutStatus from "./AboutStatus";
import TodoStatusIcon from "./TodoStatusIcon";
import { color_primary_green_light } from "../../components/CommonStyle";
import {
  StatusPageContainer,
  StatusHeader,
  SectionContainer,
  StatusContainer,
  MyToDoStatusWrapper,
  MyInfoContainer,
  MyInfoWrapper,
  MyInfoDetailWrapper,
  MyInfo,
  MyCompletedStatus,
  BearWrapper,
} from "./StatusPageStyle";
import Loading from "../../components/Loading";
// API REQUEST
import { TDQuestAPI } from "../../API/tdquestAPI";
// Types
import { CharDataType, TodoListType } from "../../Types/generalTypes";

function StatusPage(): JSX.Element {
  const [userCharData, setUserData] = useState<CharDataType>({} as CharDataType);
  const [donelist, setDonelist] = useState<TodoListType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { id: user_id, nickname } = JSON.parse(
    window.localStorage.getItem("isLogin") as string
  ).userInfo;
  useEffect(() => {
    if (loading) {
      const getCharacterData = async () => {
        await TDQuestAPI.get(`character/?user_id=${user_id}`).then((res) => {
          setUserData(res.data.characterInfo);
          setLoading(false);
          console.log(userCharData);
        });
      };
      getCharacterData();

      const getComleteTDList = async () => {
        console.log(user_id);
        await TDQuestAPI.get(`todo/complete/?user_id=${user_id}`).then(
          (res) => {
            setDonelist(res.data.todo_lists);
            setLoading(false);
          }
        );
      };
      getComleteTDList();
    }
  }, []);

  const { image, status_phy, status_int, status_spi, level, exp } = userCharData;

  console.log(donelist);
  console.log("userCharData: ", userCharData);

  return (
    <div>
      {loading ? (
        <StatusPageContainer bgColor={color_primary_green_light}>
          <Loading customText="Loading..." />
        </StatusPageContainer>
      ) : (
        <StatusPageContainer bgColor={color_primary_green_light}>
          <StatusHeader>
            <div className="headerContainer">
              <img
                src={require("../../static/images/icons/Achievements.png")}
                alt="Achievements"
              />
              <h2>My Status</h2>
            </div>
          </StatusHeader>
          <SectionContainer>
            <StatusContainer>
              <Status userName={nickname} charData={userCharData}></Status>
            </StatusContainer>
            <MyInfoContainer>
              <MyToDoStatusWrapper>
                <h3>My To-Do Status</h3>
                <MyInfoWrapper>
                  <MyInfoDetailWrapper>
                    {/* 추후 데이터를 받아와 map으로 한번에 작성할 예정 */}
                    <MyInfo>
                      <TodoStatusIcon
                        source="Physical.png"
                        name="Physical"
                        size="25px"
                      />
                      <MyCompletedStatus>
                        {donelist.filter((el) => el.kind === "phy").length}{" "}
                        lists completed
                      </MyCompletedStatus>
                    </MyInfo>
                    <MyInfo>
                      <TodoStatusIcon
                        source="Intelligence.png"
                        name="Intelligence"
                        size="25px"
                      />
                      <MyCompletedStatus>
                        {donelist.filter((el) => el.kind === "int").length}{" "}
                        lists completed
                      </MyCompletedStatus>
                    </MyInfo>
                    <MyInfo>
                      <TodoStatusIcon
                        source="Spirit.png"
                        name="Spirit"
                        size="25px"
                      />
                      <MyCompletedStatus>
                        {donelist.filter((el) => el.kind === "spi").length}{" "}
                        lists completed
                      </MyCompletedStatus>
                    </MyInfo>
                    <MyInfo>
                      <TodoStatusIcon source="Exp.png" name="Exp" size="25px" />
                      <MyCompletedStatus>
                        {donelist.filter((el) => el.kind === "exp").length}{" "}
                        lists completed
                      </MyCompletedStatus>
                    </MyInfo>
                  </MyInfoDetailWrapper>
                  <BearWrapper>
                    <HelperBear
                      width="160px"
                      height="50px"
                      text="Good job for physical activities!"
                    />
                  </BearWrapper>
                </MyInfoWrapper>
              </MyToDoStatusWrapper>
            </MyInfoContainer>
          </SectionContainer>
          <AboutStatus />
        </StatusPageContainer>
      )}
    </div>
  );
}

export default StatusPage;
