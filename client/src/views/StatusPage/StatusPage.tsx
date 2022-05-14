import React, { useState, useEffect } from "react";
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
import {
  getCharacterInfo,
  dummyRes_getCharacterInfo,
} from "../../API/tdquestAPI";
// Types
import { CharDataType } from "../../Types/generalTypes";

function StatusPage(): JSX.Element {
  const [userData, setUserData] = useState<CharDataType>({} as CharDataType);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        const getcharacterData: any =
          dummyRes_getCharacterInfo.data.characterInfo;
        setUserData(getcharacterData);
        setLoading(false);
      }, 2000);
    }
  }, []);

  const {
    user_id,
    image,
    status_phy,
    status_int,
    status_spl,
    userLevel,
    userExp,
  } = userData;

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
              <Status charData={userData}></Status>
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
                      <MyCompletedStatus>60 lists completed</MyCompletedStatus>
                    </MyInfo>
                    <MyInfo>
                      <TodoStatusIcon
                        source="Intelligence.png"
                        name="Intelligence"
                        size="25px"
                      />
                      <MyCompletedStatus>60 lists completed</MyCompletedStatus>
                    </MyInfo>
                    <MyInfo>
                      <TodoStatusIcon
                        source="Spirit.png"
                        name="Spirit"
                        size="25px"
                      />
                      <MyCompletedStatus>60 lists completed</MyCompletedStatus>
                    </MyInfo>
                    <MyInfo>
                      <TodoStatusIcon source="Exp.png" name="Exp" size="25px" />
                      <MyCompletedStatus>60 lists completed</MyCompletedStatus>
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
