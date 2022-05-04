import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";

const StatusPageContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const StatusBreadCrumb = styled.div`
  width: 100vw;
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
  width: 90vw;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatusContainer = styled.div`
  width: 30vw;
  height: 50vh;
  border: 1px solid;
  margin-right: 10px;
  margin-bottom: 20px;
`;

const Status = styled.div<{ direction?: string }>`
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const MyInfoContainer = styled.div`
  border: 1px solid;
  display: flex;
  flex-direction: column;
  width: 60vw;
  height: 340px;
  padding: 20px;
`;

const MyToDoStatus = styled.div`
  display: flex;
  flex-direction: column;
  h1 {
    font-size: 1.3rem;
    font-family: "Fredoka One", cursive;
    color: #414693;
  }
`;

const HelperBear = styled.div`
  display: flex;
  height: 100px;
  img {
    image-rendering: pixelated;
    width: 100px;
    margin-right: 30px;
  }
  .bubble {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 180px;
    height: 60px;
    padding: 10px;
    background: #ffffff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: #7f7f7f solid 3px;
    text-align: center;
  }

  .bubble:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 8px 18px 8px 0;
    border-color: transparent #ffffff;
    display: block;
    width: 0;
    z-index: 1;
    margin-top: -8px;
    left: -18px;
    top: 35%;
  }

  .bubble:before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px 20px 10px 0;
    border-color: transparent #7f7f7f;
    display: block;
    width: 0;
    z-index: 0;
    margin-top: -10px;
    left: -23px;
    top: 35%;
  }
`;

const AboutStatus = styled.div`
  display: flex;
  width: 90vw;
  height: 20vh;
  border: 1px solid;
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
          <Status></Status>
        </StatusContainer>
        <MyInfoContainer>
          <MyToDoStatus>
            <h1>My To-Do Status</h1>
          </MyToDoStatus>
          <HelperBear>
            <img src={require("../../static/images/HelperBear.png")}></img>
            <div className="bubble">Good job for Physical activities!</div>
          </HelperBear>
        </MyInfoContainer>
      </SectionContainer>
      <AboutStatus></AboutStatus>
    </StatusPageContainer>
  );
}

export default StatusPage;
