import React, { SyntheticEvent } from "react";
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

// 옵션 : onlyChar, direction
// onlyChar = true일 경우, 캐릭터 창만 표시
// direction은 기본적으로 column 방향이고, direction = 'row' 전달 시 가로로 표시됨
function Status({
  userName,
  charData,
  onlyChar,
  direction,
}: {
  userName?: string;
  charData: CharDataType;
  onlyChar?: boolean;
  direction?: string;
}): JSX.Element {
  const {
    image: character,
    status_phy,
    status_int,
    status_spi,
    level,
    exp,
  } = charData;

  // 유저 칭호를 설정하는 함수
  const setUserTitle = (userStat: number[]): string => {
    const result = ["허약하고", "우둔하고", "별볼일없는"];
    //Physical 칭호
    if (30 <= userStat[0] && userStat[0] < 50) {
      result[0] = "건강하고";
    } else if (50 <= userStat[0] && userStat[0] < 100) {
      result[0] = "강인하고";
    }
    // Int 칭호
    if (30 <= userStat[1] && userStat[1] < 50) {
      result[1] = "명석하고";
    } else if (50 <= userStat[1] && userStat[1] < 100) {
      result[1] = "지혜롭고";
    }
    // Spl 칭호
    if (30 <= userStat[2] && userStat[2] < 50) {
      result[2] = "매력있는";
    } else if (50 <= userStat[2] && userStat[2] < 100) {
      result[2] = "끈기높은";
    }
    return `${result[0]} ${result[1]} ${result[2]}`;
  };

  const userTitle = setUserTitle([status_phy, status_int, status_spi]);

  const handleImgError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = require("../static/images/character/char_default.png");
  };

  return (
    <MainContainer direction={direction}>
      <CharacterContainer>
        <CharacterBackground>
          <div className="character_wrapper">
            <Character
              src={`../static/images/character/${character}.png`}
              onError={handleImgError}
              alt="userCharacter"
            />
          </div>
          <CharacterBackgroundBottom />
        </CharacterBackground>
      </CharacterContainer>
      {onlyChar ? null : (
        <CharacterInfoContainer direction={direction}>
          <UserNameContainer direction={direction}>
            <UserLevel>{level}</UserLevel>
            <UserNameWrapper direction={direction}>
              <UserTitle>{userTitle}</UserTitle>
              <UserName>{userName}</UserName>
            </UserNameWrapper>
          </UserNameContainer>
          <StatusContainer>
            <StatusDetail
              img="Physical"
              titleText="PHY"
              innerText="Physic"
              value={Number(status_phy?.toFixed(0))}
            />
            <StatusDetail
              img="Intelligence"
              titleText="INT"
              innerText="Intellig"
              value={Number(status_int?.toFixed(0))}
            />
            <StatusDetail
              img="Spirit"
              titleText="SPI"
              innerText="Spirit"
              value={Number(status_spi?.toFixed(0))}
            />
            <StatusDetail
              img="Exp"
              titleText="Next Level"
              value={exp}
              isExp={true}
            />
          </StatusContainer>
        </CharacterInfoContainer>
      )}
    </MainContainer>
  );
}

export default Status;
