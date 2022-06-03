import styled from "styled-components";
import React from "react";

const LogContentContainer = styled.div`
  display: flex;
  width: 100%;
`;

const LogContentWrapper = styled.div`
  width: 45%;
  display: flex;
  flex-direction: column;
`;

const LogContent = styled.div`
  height: 35px;
  background-color: white;
  border: 1px solid gray;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 10px;
  margin-bottom: 10px;
`;

const ShowUserInfo = styled.div``;
const ShowDate = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 20%;
`;

function DamageLogContent() {
  return (
    <LogContentContainer>
      <LogContentWrapper>
        <LogContent>
          <ShowUserInfo>{`⚔️ User님이 Damage를 입혔습니다!`}</ShowUserInfo>
          <ShowDate>{`방금 전`}</ShowDate>
        </LogContent>
        <LogContent>
          <ShowUserInfo>{`⚔️ User님이 Damage를 입혔습니다!`}</ShowUserInfo>
          <ShowDate>{`방금 전`}</ShowDate>
        </LogContent>
        <LogContent>
          <ShowUserInfo>{`⚔️ User님이 Damage를 입혔습니다!`}</ShowUserInfo>
          <ShowDate>{`방금 전`}</ShowDate>
        </LogContent>
      </LogContentWrapper>
    </LogContentContainer>
  );
}

export default DamageLogContent;
