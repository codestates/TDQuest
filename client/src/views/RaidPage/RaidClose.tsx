import React from "react";
import styled from "styled-components";
import { Monster, MonsterWrapper } from "./RaidPageStyle";
import AnimateEffectCanvas from "./AnimateEffectCanvas";
import {
  fontSize_h1_laptop,
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  color_context_brown,
} from "../../components/CommonStyle";

const SectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 90vh;
`;

const Congratulations = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font-size: ${fontSize_h1_laptop};
  font-family: "Fredoka One", cursive;
  margin-bottom: 15px;
  color: ${color_context_brown};
`;
const Caught = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font-size: ${fontSize_h2_laptop};
  font-family: "Fredoka One", cursive;
  margin-bottom: 50px;
`;

const MonsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  min-width: 350px;
  min-height: 250px;
  height: 30%;
  position: relative;
  @media (max-width: 768px) {
    height: 20%;
  }
`;

const MonsterName = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font-size: ${fontSize_h3_laptop};
  font-family: "Fredoka One", cursive;
  margin: 20px 0;
  color: #c72b2b;
`;

const Rewards = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font-size: ${fontSize_h3_laptop};
  font-family: "Fredoka One", cursive;
  margin-top: 10px;
  margin-bottom: 20px;
`;

const PleasWait = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80%;
  font-family: "Fredoka One", cursive;
  color: #767676;
`;

export function RaidClose({
  monster_image,
  effects,
  monster_name,
}: {
  monster_image: string;
  effects: string[];
  monster_name: string;
}) {
  return (
    <SectionContainer>
      <Congratulations>Congratulations!</Congratulations>
      <Caught>Boss Monster has been Defeated</Caught>
      <MonsterContainer>
        <MonsterWrapper>
          <div className="background"></div>
          <div className="monster_wrapper">
            <Monster
              src={require("../../static/images/" + monster_image + ".gif")}
              alt="monster"
            ></Monster>
            <AnimateEffectCanvas imageX={effects[0]} imageY={effects[1]} />
          </div>
        </MonsterWrapper>
      </MonsterContainer>
      <MonsterName>{monster_name}</MonsterName>
      <Rewards>🏆 You got 50 EXP Points!</Rewards>
      <PleasWait>Please wait for next Raid...</PleasWait>
    </SectionContainer>
  );
}
