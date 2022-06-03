import React, { useState } from "react";
import { Contents } from "./RaidPageStyle";
import { DamageLogType, Objtype } from "../../Types/generalTypes";

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
      ) : <div className="trophy"></div>}
      <div className="user_nickname">{nickname}</div>
      <div className="damage_ratio_container">
        <div className="damage_ratio" />
      </div>
      <div className="damage_ratio">{points} pts</div>
    </Contents>
  );
}

export default DamageRankContent;
