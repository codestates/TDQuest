import React, { useState } from "react";
import styled from "styled-components";
import { DamageLogType, Objtype } from "../../Types/generalTypes";
import { fontSize_body_mobile_medium } from "../../components/CommonStyle";

export const Contents = styled.div`
  display: flex;
  margin-bottom: 10px;
  width: 93%;
  height: 45px;
  justify-content: space-evenly;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  .trophy {
    width: 30px;
    height: 30px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
      image-rendering: pixelated;
      width: 35px;
      @media (max-width: 768px) {
        width: 23px;
        height: 23px;
      }
    }
  }
  .user_nickname {
    display: flex;
    align-items: center;
    width: 20%;
    overflow: hidden;
    font-weight: bold;
    height: 25px;
    @media (max-width: 768px) {
      width: 50%;
      font-size: ${fontSize_body_mobile_medium};
    }
  }
  .damage_ratio_container {
    width: 53%;
    height: 20px;
    @media (max-width: 768px) {
      display: none;
    }
  }
  .damage_ratio {
    width: 10%;
    font-family: "Fredoka One", cursive;
    display: flex;
    @media (max-width: 768px) {
      width: 25%;
      justify-content: flex-end;
      font-size: ${fontSize_body_mobile_medium};
    }
  }
`;

export const DamageRate = styled.div<{ totalDamage: number; points: number }>`
  width: ${(props) => `${(props.points / props.totalDamage) * 100}%`};
  height: 20px;
  border-radius: 5px;
  background-color: #8fd14f;
`;

function DamageRankContent({
  logs,
  totalDamage,
}: {
  logs: any;
  totalDamage: number;
}) {
  let trophy = false;
  const nickname = logs[0];
  const points = logs[1];
  if (logs[2]) {
    trophy = logs[2];
  }

  return (
    <Contents>
      {trophy ? (
        <div className="trophy">
          <img
            src={require("../../static/images/icons/Trophy.png")}
            alt="trophy"
          />
        </div>
      ) : (
        <div className="trophy"></div>
      )}
      <div className="user_nickname">{nickname}</div>
      <div className="damage_ratio_container">
        <DamageRate totalDamage={totalDamage} points={points} />
      </div>
      <div className="damage_ratio">{points} pts</div>
    </Contents>
  );
}

export default DamageRankContent;
