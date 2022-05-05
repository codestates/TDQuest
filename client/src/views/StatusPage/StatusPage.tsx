import React from "react";
import styled from "styled-components";
import Status from "../../components/Status";
import HelperBear from "../../components/HelperBear";
import AboutStatus from "./AboutStatus";
import TodoStatusIcon from "./TodoStatusIcon";

const StatusPageContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100vh;
  @media (max-width: 768px) {
    height: auto;
  }
`;

const StatusBreadCrumb = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  .breadCrumbContainer {
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

const SectionContainer = styled.div`
  width: 90%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatusContainer = styled.div`
  width: 30%;
  height: 350px;
  padding: 15px;
  border: 1px solid #dbae0d;
  margin-right: 10px;
  margin-bottom: 20px;
  display: flex;
  @media (max-width: 768px) {
    width: auto;
    margin-right: 0px;
  }
`;

const MyToDoStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h1 {
    font-size: 1.3rem;
    height: 2rem;
    font-family: "Fredoka One", cursive;
    color: #414693;
    margin-bottom: 15px;
    border-bottom: 3px solid #c38b8b;
  }
`;

const MyInfoContainer = styled.div`
  border: 1px solid #dbae0d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 350px;
  padding: 15px 20px;
  margin-bottom: 20px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

const MyInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyInfoDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 400px;
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
  }
`;

const MyInfo = styled.div`
  display: flex;
`;

const MyCompletedStatus = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    font-size: 16px;
  }
`;

const BearWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;

function StatusPage({ bgColor }: { bgColor: string }) {
  return (
    <StatusPageContainer bgColor={bgColor}>
      <StatusBreadCrumb>
        <div className="breadCrumbContainer">
          <img
            src={require("../../static/images/icons/Achievements.png")}
          ></img>
          <h1>My Status</h1>
        </div>
      </StatusBreadCrumb>
      <SectionContainer>
        <StatusContainer>
          <Status character="char_default"></Status>
        </StatusContainer>
        <MyInfoContainer>
          <MyToDoStatusWrapper>
            <h1>My To-Do Status</h1>
            <MyInfoWrapper>
              <MyInfoDetailWrapper>
                {/* 추후 데이터를 받아와 map으로 한번에 작성할 예정 */}
                <MyInfo>
                  <TodoStatusIcon source="Physical.png" name="Physical" />
                  <MyCompletedStatus>60 lists completed</MyCompletedStatus>
                </MyInfo>
                <MyInfo>
                  <TodoStatusIcon
                    source="Intelligence.png"
                    name="Intelligence"
                  />
                  <MyCompletedStatus>60 lists completed</MyCompletedStatus>
                </MyInfo>
                <MyInfo>
                  <TodoStatusIcon source="Spirit.png" name="Spirit" />
                  <MyCompletedStatus>60 lists completed</MyCompletedStatus>
                </MyInfo>
                <MyInfo>
                  <TodoStatusIcon source="Exp.png" name="Exp" />
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
  );
}

export default StatusPage;
