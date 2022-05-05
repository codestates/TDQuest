import React from "react";
import styled from "styled-components";

type Data = {
  img: string;
  titleText: string;
  innerText?: string;
  value: number;
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

const StatusBar = styled.div<{ isExp?: boolean }>`
  margin-left: 5px;
  margin-right: 5px;
  border-radius: 3px;
  width: 50%;
  height: ${(props) => (props.isExp ? "15px" : "20px")};
  background-color: ${(props) => (props.isExp ? "#8FD14F" : "#12cdd4")};
`;

const StatusValue = styled.div`
  font-size: 1.1rem;
  font-family: "Fredoka One", cursive;
`;

function StatusDetail({ img, titleText, innerText, value, isExp }: Data) {
  return (
    <StatusImageContainer>
      <img src={require(`../static/images/${img}.png`)} />
      <StatusTextContainer isExp={isExp}>
        <h1>{titleText}</h1>
        <h2>{innerText}</h2>
      </StatusTextContainer>
      <StatusBar isExp={isExp} />
      <StatusValue>{value}</StatusValue>
    </StatusImageContainer>
  );
}

export default StatusDetail;
