import React from "react";
import styled from "styled-components";
import StatusDetail from "./StatusDetail";

type StatusType = {
  direction?: string;
  character: string;
  userLevel?: string;
  userTitle?: string;
  userName?: string;
};

const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CharacterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

const CharacterBackground = styled.div`
  width: 100%;
  height: 150px;
  background-color: #686cd5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 5;
  .character_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 20;
    justify-content: center;
  }
`;

const CharacterBackground_Bottom = styled.div`
  width: 100%;
  height: 35%;
  background-color: #0ca789;
  border-radius: 10px;
  z-index: 15;
`;

const Character = styled.img`
  image-rendering: pixelated;
  width: 70px;
  z-index: 50;
`;

const UserNameContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

const UserLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #30acda;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

const UserTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  img {
    width: 25px;
  }
`;

function Status({
  direction,
  character,
  userLevel,
  userTitle,
  userName,
}: StatusType) {
  return (
    <MainContainer>
      <CharacterContainer>
        <CharacterBackground>
          <div className="character_wrapper">
            <Character
              src={require(`../static/images/character/${character}.png`)}
            />
          </div>
          <CharacterBackground_Bottom />
        </CharacterBackground>
      </CharacterContainer>
      <UserNameContainer>
        <UserLevel>12</UserLevel>
        <UserNameWrapper>
          <UserTitle>강인하고 지혜롭고 끈기있는</UserTitle>
          <UserName>TEST_USER_1</UserName>
        </UserNameWrapper>
      </UserNameContainer>
      <StatusContainer>
        <StatusDetail
          img="Physical"
          titleText="PHY"
          innerText="Physic"
          value={30}
        />
        <StatusDetail
          img="Intelligence"
          titleText="INT"
          innerText="Intellig"
          value={20}
        />
        <StatusDetail
          img="Spirit"
          titleText="SPI"
          innerText="Spirit "
          value={30}
        />
        <StatusDetail
          img="Exp"
          titleText="Next Level"
          value={30}
          isExp={true}
        />
      </StatusContainer>
    </MainContainer>
  );
}

export default Status;
