import React from "react";
import styled from "styled-components";
import StatusDetail from "./StatusDetail";
import {
  MainContainer,
  CharacterContainer,
  CharacterBackground,
  CharacterBackgroundBottom,
  Character,
  UserNameContainer,
  UserLevel,
  UserTitle,
  UserNameWrapper,
  UserName,
  StatusContainer,
} from "./Status_Style";

type StatusType = {
  direction?: string;
  character: string;
  userLevel?: string;
  userTitle?: string;
  userName?: string;
  statValues?: number[];
};

function Status({
  direction,
  character,
  userLevel,
  userTitle,
  userName,
  statValues,
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
          <CharacterBackgroundBottom />
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
          innerText="Spirit"
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
