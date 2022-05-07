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
  CharacterInfoContainer,
} from "./Status_Style";
// Types
import { CharDataType } from "../Types/generalTypes";

function Status({
  charData,
  onlyChar,
}: {
  charData: CharDataType;
  onlyChar?: boolean;
}): JSX.Element {
  const {
    user_id: userName,
    image: character,
    status_phy,
    status_int,
    status_spl,
    userLevel,
    userExp,
  } = charData;
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
      {onlyChar ? null : (
        <CharacterInfoContainer>
          <UserNameContainer>
            <UserLevel>{userLevel}</UserLevel>
            <UserNameWrapper>
              <UserTitle>강인하고 지혜롭고 끈기있는</UserTitle>
              <UserName>{userName}</UserName>
            </UserNameWrapper>
          </UserNameContainer>
          <StatusContainer>
            <StatusDetail
              img="Physical"
              titleText="PHY"
              innerText="Physic"
              value={status_phy}
            />
            <StatusDetail
              img="Intelligence"
              titleText="INT"
              innerText="Intellig"
              value={status_int}
            />
            <StatusDetail
              img="Spirit"
              titleText="SPI"
              innerText="Spirit"
              value={status_spl}
            />
            <StatusDetail
              img="Exp"
              titleText="Next Level"
              value={userExp}
              isExp={true}
            />
          </StatusContainer>
        </CharacterInfoContainer>
      )}
    </MainContainer>
  );
}

export default Status;
