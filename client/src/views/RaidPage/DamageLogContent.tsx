import styled from "styled-components";
import React from "react";
import { TDQuestAPI } from "../../API/tdquestAPI";
import { DamageLogType } from "../../Types/generalTypes";
import { fontSize_body_mobile_small } from "../../components/CommonStyle";
import moment from "moment";

const LogContentContainer = styled.div`
  display: flex;
  width: 60%;
  margin-left: 20px;
  @media (max-width: 768px) {
    width: 95%;
    margin-left: 0;
    margin-top: 15px;
  }
`;

const LogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LogContent = styled.div`
  height: 45px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
  @media (max-width: 768px) {
    height: 45px;
  }
`;

const ShowUserInfo = styled.div`
  font-size: 18px;
  font-weight: 500;
  @media (max-width: 768px) {
    font-size: 15px;
    line-height: 18px;
  }
`;
const ShowDate = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
  font-size: 14px;
  color: gray;
  letter-spacing: -1px;
  @media (max-width: 768px) {
    font-size: ${fontSize_body_mobile_small};
    width: 30%;
  }
`;

export function DamageLogContent({
  damage_log,
}: {
  damage_log: DamageLogType[];
}) {
  const ExtractData = damage_log.filter((el, index) => {
    if (el.log !== 0) {
      return el;
    }
  });

  const getLogUnderSix = [...ExtractData];
  if (getLogUnderSix.length > 6) {
    for (let i = getLogUnderSix.length; i > 6; i--) {
      getLogUnderSix.shift();
    }
  }

  console.log(ExtractData);

  return (
    <LogContentContainer>
      <LogContentWrapper>
        {getLogUnderSix.reverse().map((el, index) => {
          return UserLog(el.user.nickname, el.log, el.createdAt, index);
        })}
      </LogContentWrapper>
    </LogContentContainer>
  );
}

function UserLog(
  nickname: string,
  damage: number,
  date: string,
  index: number
) {
  const LogDate = moment.utc(date).format("YYYY-MM-DD HH:mm:ss");
  const now = moment(LogDate, "YYYY-MM-DD HH:mm:ss").fromNow();

  return (
    <LogContent key={index}>
      <ShowUserInfo>{`⚔️ ${nickname} gave to Raid Boss ${damage} Damage!`}</ShowUserInfo>
      <ShowDate>{now}</ShowDate>
    </LogContent>
  );
}
