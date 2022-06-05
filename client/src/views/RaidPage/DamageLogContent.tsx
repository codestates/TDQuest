import styled from "styled-components";
import React from "react";
import { TDQuestAPI } from "../../API/tdquestAPI";
import { DamageLogType } from "../../Types/generalTypes";
import moment from "moment";

const LogContentContainer = styled.div`
  display: flex;
  width: 60%;
  margin-left: 20px;
  margin-top: 15px;
`;

const LogContentWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const LogContent = styled.div`
  height: 35px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border-radius: 5px;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const ShowUserInfo = styled.div`
  font-size: 18px;
  font-weight: 500;
`;
const ShowDate = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
  font-size: 14px;
  color: gray;
  letter-spacing: -1px;
`;

export function DamageLogContent({
  damage_log,
}: {
  damage_log: DamageLogType[];
}) {
  const ExtractData = damage_log.filter((el, index) => {
    console.log(el);
    if (el.log !== 0 && index < 6) {
      return el;
    }
  });

  return (
    <LogContentContainer>
      <LogContentWrapper>
        {ExtractData.map((el, index) => {
          return UserLog(el.user.nickname, el.log, el.createdAt, index);
        })}
        <LogContent>
          <ShowUserInfo>{`⚔️ TEST gave to Raid Boss 30 Damage!`}</ShowUserInfo>
          <ShowDate>방금 전</ShowDate>
        </LogContent>
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
