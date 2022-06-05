import React, { useState } from "react";
import styled from "styled-components";
import { DamageLogType, Objtype } from "../../Types/generalTypes";

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
    img {
      image-rendering: pixelated;
      width: 35px;
    }
  }
  .user_nickname {
    display: flex;
    align-items: center;
    width: 20%;
    overflow: hidden;
    font-weight: bold;
    height: 25px;
  }
  .damage_ratio_container {
    width: 53%;
    height: 20px;
    .damage_ratio {
      width: 95%;
      height: 20px;
      border-radius: 5px;
      background-color: #8fd14f;
    }
  }
  .damage_ratio {
    width: 10%;
    font-family: "Fredoka One", cursive;
  }
`;

function DamageRankContent({ logs }: { logs: any }) {
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
        <div className="damage_ratio" />
      </div>
      <div className="damage_ratio">{points} pts</div>
    </Contents>
  );
}

export default DamageRankContent;
