import React from "react";
import styled from "styled-components";

type Data = {
  img: string;
  titleText: string;
  innerText?: string;
  //! 서버 측 코드 수정으로 인한 일시 수정
  value: number | undefined;
  isExp?: boolean;
};

const StatusImageContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
`;

const StatusTextContainer = styled.div<{ isExp?: boolean }>`
  display: flex;
  flex-direction: column;
  h1 {
    width: 33px;
    font-size: ${(props) => (props.isExp ? "0.6rem" : "0.8rem")};
    font-family: "Fredoka One", cursive;
  }
  h2 {
    font-size: 0.5rem;
    color: gray;
  }
`;

//! 서버 측 코드 수정으로 인한 일시 수정
const StatusBar = styled.div<{ isExp?: boolean; value?: number }>`
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 3px;
  width: 55%;
  height: ${(props) => (props.isExp ? "15px" : "20px")};
  background-color: ${(props) => (props.isExp ? "#75c624" : "#adfcff")};
  .progress {
    border-radius: 3px;
    width: ${(props) => props.value}%;
    height: 100%;
    background-color: ${(props) => (props.isExp ? "#a4ed5a" : "#12cdd4")};
  }
`;

const StatusValue = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 10%;
  font-size: 1.1rem;
  font-family: "Fredoka One", cursive;
  margin-right: 5px;
`;

function StatusDetail({
  img,
  titleText,
  innerText,
  value,
  isExp,
}: Data): JSX.Element {
  return (
    <StatusImageContainer>
      <img src={require(`../static/images/${img}.png`)} alt="statusImage" />
      <StatusTextContainer isExp={isExp}>
        <h1>{titleText}</h1>
        <h2>{innerText}</h2>
      </StatusTextContainer>
      <StatusBar isExp={isExp} value={value}>
        <div className="progress"></div>
      </StatusBar>
      <StatusValue>{value}</StatusValue>
    </StatusImageContainer>
  );
}

export default StatusDetail;
