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
  DamageStatusContainer,
  HelperBearContainer,
} from "./RaidPageStyle";
import Loading from "../../components/Loading";
import HelperBear from "../../components/HelperBear";
import AnimateEffectCanvas from "./AnimateEffectCanvas";
import DamageRankContent from "./DamageRankContent";
import { DamageLogContent } from "./DamageLogContent";
import { TDQuestAPI, LOCALSTORAGE_STRING } from "../../API/tdquestAPI";
import {
  DamageLogType,
  DefaultUserDataType,
  RaidsType,
  MonsterInfoType,
} from "../../Types/generalTypes";

function RaidPage() {
  // 참가 중인 레이드 아이디를 받아옴
  const Raid_id = JSON.parse(window.localStorage.getItem("isLogin") as string)
    .damage_logInfo.raid_id;
  const [loading, setIsLoading] = useState(true);
  const [monsterInfo, setMonsterInfo] = useState<MonsterInfoType>(
    {} as MonsterInfoType
  );
  const [damage_log, setDamage_log] = useState<DamageLogType[]>([
    {
      id: 0,
      log: 0,
      createdAt: "",
      updatedAt: "",
      user_id: 0,
      raid_id: 0,
      user: DefaultUserDataType,
    },
  ]);

  useEffect(() => {
    console.log(Raid_id);
    const getMonsterInfo = async () =>
      await TDQuestAPI.get(`monster/?monster_id=${Raid_id}`).then((res) => {
        setMonsterInfo(res.data.monsterInfo);
      });
    const getDamageLog = async () =>
      await TDQuestAPI.get(`raids/damage_logs?raid_id=${Raid_id}`).then(
        (res) => {
          const response = res.data.damage_log_Info;
          setDamage_log(response);
          setIsLoading(false);
        }
      );
    getMonsterInfo();
    getDamageLog();
  }, []);

  const {
    monster_image,
    raids: raid_info,
    name: monster_name,
    hp: monster_hp,
    kind,
  } = monsterInfo;
  console.log(monster_image, raid_info);
  console.log(monsterInfo);

  const monster_data = {
    kind: "",
    effectX: "",
    effectY: "",
  };
  if (kind === "phy") {
    monster_data.kind = "Physical";
    monster_data.effectX = "Thunder";
  } else if (kind === "int") {
    monster_data.kind = "Intelligence";
    monster_data.effectY = "Fire2";
  } else if (kind === "spi") {
    monster_data.kind = "Spirit";
    monster_data.effectX = "Thunder";
  }

  function ExtractData(damage_log: DamageLogType[]) {
    type Objtype = {
      [key: string]: number;
    };

    const result = [];

    const SortLog: DamageLogType[] = [...damage_log];
    SortLog.sort((a, b) =>
      a.user_id < b.user_id ? -1 : a.user_id > b.user_id ? 1 : 0
    );

    //보스에게 입힌 총 데미지 계산(사용예정)
    const totalDamage = damage_log.reduce((acc, cur) => acc + cur.log, 0);

    const TempParticipateUsers = SortLog.map((el) => el.user.nickname);
    const ParticipateUsers = TempParticipateUsers.filter(
      (el, index) => TempParticipateUsers.indexOf(el) === index
    );

    //유저 별로 입힌 데미지 정보를 {유저닉네임:데미지} 객체로 생성
    const logs: Objtype = {};
    ParticipateUsers.forEach((el) => (logs[el] = 0));

    SortLog.map((el) => {
      logs[el.user.nickname] = logs[el.user.nickname] + el.log;
    });

    const logKeys = Object.keys(logs);

    //유저 별로 한개의 객체에 값을 넣고, 배열로 반환
    for (let i = 0; i < Object.keys(logs).length; i++) {
      const keys = logKeys[i];
      const obj: Objtype = {};
      obj[keys] = logs[logKeys[i]];
      result.push(obj);
    }

    const tmpData = Object.entries(logs).sort((a, b) => b[1] - a[1]);

    return tmpData;
  }

  const logs = ExtractData(damage_log);

  return loading ? (
    <RaidContainer bgColor={color_primary_green_light}>
      <Loading />
    </RaidContainer>
  ) : (
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
                  src={require("../../static/images/" + monster_image + ".gif")}
                  alt="monster"
                ></Monster>
                <AnimateEffectCanvas
                  imageX={monster_data.effectX}
                  imageY={monster_data.effectY}
                />
              </div>
            </MonsterWrapper>
            <MonsterInfoContainer>
              <div className="monster_name_wrapper">
                <img
                  src={require("../../static/images/" +
                    monster_data.kind +
                    ".png")}
                  alt="kind"
                />
                <h2>{monster_name}</h2>
              </div>
              <div className="monster_hp_wrapper">
                <h3>HP</h3>
                <div className="hp_container">
                  <div className="current_hp"></div>
                  <div className="current_hp_text">
                    <h3>{monster_hp}/5000</h3>
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
              {logs.map((el, index) => {
                if (index === 0) {
                  el.push("true");
                } else if (index >= 5) {
                  return null;
                }
                return <DamageRankContent key={index} logs={el} />;
              })}
            </ContentContainer>
          </DamageGraphContainer>
        </RaidDetailContainer>
      </SectionContainer>
      <DamageStatusContainer>
        <DamageLogContent damage_log={damage_log} />
        <HelperBearContainer>
          <HelperBear
            width="200px"
            text="Complete todo and give damage to boss!"
          ></HelperBear>
        </HelperBearContainer>
      </DamageStatusContainer>
    </RaidContainer>
  );
}

export default RaidPage;
