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

function RaidPage() {
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
                <AnimateEffectCanvas />
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
              <Contents>
                <div className="trophy">
                  <img
                    src={require("../../static/images/icons/Trophy.png")}
                    alt="trophy"
                  />
                </div>
                <div className="user_nickname">TEST_USER_1</div>
                <div className="damage_ratio_container">
                  <div className="damage_ratio" />
                </div>
                <div className="damage_ratio">200 pts</div>
              </Contents>
              <Contents>
                <div className="trophy">
                  <img
                    src={require("../../static/images/icons/Trophy.png")}
                    alt="trophy"
                  />
                </div>
                <div className="user_nickname">TEST_USER_1</div>
                <div className="damage_ratio_container">
                  <div className="damage_ratio" />
                </div>
                <div className="damage_ratio">200 pts</div>
              </Contents>
              <Contents>
                <div className="trophy">
                  <img
                    src={require("../../static/images/icons/Trophy.png")}
                    alt="trophy"
                  />
                </div>
                <div className="user_nickname">TEST_USER_1</div>
                <div className="damage_ratio_container">
                  <div className="damage_ratio" />
                </div>
                <div className="damage_ratio">200 pts</div>
              </Contents>
              <Contents>
                <div className="trophy">
                  <img
                    src={require("../../static/images/icons/Trophy.png")}
                    alt="trophy"
                  />
                </div>
                <div className="user_nickname">TEST_USER_1</div>
                <div className="damage_ratio_container">
                  <div className="damage_ratio" />
                </div>
                <div className="damage_ratio">200 pts</div>
              </Contents>
            </ContentContainer>
          </DamageGraphContainer>
        </RaidDetailContainer>
      </SectionContainer>
      <DamageStatusContainer></DamageStatusContainer>
    </RaidContainer>
  );
}

export default RaidPage;
