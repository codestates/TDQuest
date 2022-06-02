import { editableInputTypes } from "@testing-library/user-event/dist/types/utils";
import React, { useRef, useState, useEffect, RefObject } from "react";
import styled from "styled-components";
import { color_primary_green_light } from "../../components/CommonStyle";
import {
  RaidContainer,
  RaidPageHeader,
  SectionContainer,
  RaidDetailContainer,
  MonsterContainer,
  MonsterWrapper,
  Monster,
  MonsterInfoContainer,
  DamageGraphContainer,
  TitleContainer,
  ContentContainer,
  Contents,
  DamageStatusContainer,
} from "./RaidPageStyle";
import AnimateEffectCanvas from "./AnimateEffectCanvas";
import DamageRankContent from "./DamageRankContent";
import DamageLogContent from "./DamageLogContent";
import { TDQuestAPI } from "../../API/tdquestAPI";
import { DamageLogType, DefaultUserDataType } from "../../Types/generalTypes";

// 참가 중인 레이드 아이디를 받아옴
const raid_id = 1;

function RaidPage() {
  const [ damage_log, setDamage_log ] = useState<DamageLogType[]>([{
    id: 0,
    log: 0,
    createdAt: "",
    updatedAt: "",
    user_id: 0,
    raid_id: 0,
    user: DefaultUserDataType
  }]);

  useEffect(() => {
    TDQuestAPI.get(`raids/damage_logs?raid_id=${raid_id}`).then((res) => {
      const response = res.data.damage_log_Info;
      setDamage_log(response);
    })
    console.log(damage_log);
  }, []);

  function ExtractData (damage_log: DamageLogType[]) {
    type Objtype = {
      [key: string]: number;
    }

    const result = [];

    const SortLog: DamageLogType[] = [...damage_log];
    SortLog.sort((a,b) => a.user_id < b.user_id ? -1 : a.user_id > b.user_id ? 1 : 0);
    
    //보스에게 입힌 총 데미지 계산(사용예정)
    const totalDamage = damage_log.reduce((acc, cur) => acc + cur.log, 0);
  
    const TempParticipateUsers = SortLog.map((el) => el.user.nickname);
    const ParticipateUsers = TempParticipateUsers.filter((el, index) => TempParticipateUsers.indexOf(el) === index);

    //유저 별로 입힌 데미지 정보를 {유저닉네임:데미지} 객체로 생성
    const logs:Objtype = {};
    ParticipateUsers.forEach((el) => logs[el] = 0);

    SortLog.map((el) => {
      logs[el.user.nickname] = logs[el.user.nickname] + el.log; 
    })

    const logKeys = Object.keys(logs);

    //유저 별로 한개의 객체에 값을 넣고, 배열로 반환
    for (let i = 0; i < Object.keys(logs).length; i++) {
      const keys = logKeys[i];
      console.log(keys);
      const obj:Objtype = {};
      obj[keys] = logs[logKeys[i]];
      result.push(obj);
    }

    const tmpData = Object.entries(logs).sort((a, b) => b[1] - a[1]);

    return tmpData;
  }

  const logs = ExtractData(damage_log);

  return (
    <RaidContainer bgColor={color_primary_green_light}>
      <RaidPageHeader>
        <div className="headerContainer">
          <img
            src={require("../../static/images/icons/RaidPageHeader.png")}
            alt="Skull"
          />
          <h2>Boss Raid</h2>
        </div>
      </RaidPageHeader>
      <SectionContainer>
        <RaidDetailContainer>
          <MonsterContainer>
            <MonsterWrapper>
              <div className="background"></div>
              <div className="ground"></div>
              <div className="monster_wrapper">
                <Monster
                  src={require("../../static/images/monsters/Phy_dragon2.png")}
                ></Monster>
                <AnimateEffectCanvas imageY="Fire2"/>
              </div>
            </MonsterWrapper>
            <MonsterInfoContainer>
              <div className="monster_name_wrapper">
                <img
                  src={require("../../static/images/Physical.png")}
                  alt="Skull"
                />
                <h2>Fire Dragon LV3</h2>
              </div>
              <div className="monster_hp_wrapper">
                <h3>HP</h3>
                <div className="hp_container">
                  <div className="current_hp"></div>
                  <div className="current_hp_text">
                    <h3>10500/12500</h3>
                  </div>
                </div>
              </div>
            </MonsterInfoContainer>
          </MonsterContainer>
          <DamageGraphContainer>
            <TitleContainer>
              <img
                src={require("../../static/images/icons/Damaged.png")}
                alt="Damaged"
                className="damaged_icon"
              />
              <h3>Damaged Ranking</h3>
            </TitleContainer>
            <ContentContainer>
              {
                logs.map((el, index) => {
                  if (index === 0) {
                    el.push("true");
                  }
                  return <DamageRankContent key={index} logs={el} />
                })
              }
            </ContentContainer>
          </DamageGraphContainer>
        </RaidDetailContainer>
      </SectionContainer>
      <DamageStatusContainer>
        <DamageLogContent></DamageLogContent>
      </DamageStatusContainer>
    </RaidContainer>
  );
}

export default RaidPage;
