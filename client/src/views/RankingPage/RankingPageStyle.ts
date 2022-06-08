import styled, { keyframes } from "styled-components";
import {
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  fontSize_h2_tablet,
  fontSize_h3_tablet,
  fontSize_body_tablet,
  color_menu_header_purple,
  color_border_yellow,
  color_context_brown,
  color_white,
  color_primary_green_light,
} from "../../components/CommonStyle";
import frameTopRankerIcon from "../../static/images/icons/FrameTopRanker.png";

export const RankingContainer = styled.div`
  background-color: ${color_primary_green_light};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 90vh;
  padding-top: 80px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const RankingPageHeader = styled.div`
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
  .headerContainer {
    display: flex;
    margin-left: 3vw;
    img {
      image-rendering: pixelated;
      width: 30px;
      margin-right: 10px;
    }
    h2 {
      font-size: ${fontSize_h2_laptop};
      font-family: "Fredoka One", cursive;
      color: ${color_menu_header_purple};
    }
    @media (max-width: 768px) {
      font-size: ${fontSize_h2_tablet};
    }
  }
`;

export const SectionContainer = styled.div`
  width: 90%;
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
  margin-bottom: 20px;
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const StatusContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: auto;
  border: 1px solid ${color_border_yellow};
  border-radius: 5px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  justify-content: center;
  padding: 10px;
  @media (max-width: 768px) {
    margin-bottom: 15px;
  }
`;
export const RewardContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: auto;
  height: 250px;
  border: 1px solid ${color_border_yellow};
  border-radius: 5px;
  display: grid;
  grid-template-rows: 40px 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const TitleContainer = styled.div`
  width: 100%;
  background-color: ${color_context_brown};
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 20px;
    align-self: center;
    margin-right: 5px;
  }
  h3 {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "Fredoka One", cursive;
    color: ${color_white};
    align-self: center;
    @media (max-width: 768px) {
      font-size: ${fontSize_h3_tablet};
    }
  }
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  align-self: center;
  justify-self: center;
  grid-gap: 20px;
  margin-top: -20px;
  padding: 15px;
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "Fredoka One", cursive;
    text-align: center;
    @media (max-width: 768px) {
      font-size: ${fontSize_h3_tablet};
    }
  }
  p {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "OpenSans";
    text-align: center;
    margin-bottom: 10px;
    @media (max-width: 768px) {
      font-size: ${fontSize_body_tablet};
    }
    img {
      image-rendering: pixelated;
      width: 30px;
      margin-right: 10px;
    }
  }
`;

export const UserInfo = styled.div`
  align-self: center;
  p {
    font-family: "Fredoka One", cursive;
  }
  .top_userName {
    font-size: 24px;
    color: #ffa700;
    font-family: "Fredoka One", cursive;
  }
  .total_status {
    font-size: 20px;
    color: darkslategray;
  }
`;

const blink = keyframes`
  100% {
    box-shadow: 0 0 3px #fff, 0 0 10px #fff, 0 0 20px #fff, 0 0 20px #686CD5,
      0 0 20px #686CD5, 0 0 30px #686CD5;
  }
`;

export const CharacterContainer = styled.div`
  box-shadow: 0 0 2px #fff, 0 0 10px #fff, 0 0 20px #cfb53b, 0 0 30px #cfb53b,
    0 0 30px #cfb53b, 0 0 50px #cfb53b;
  animation: ${blink} 0.6s infinite alternate;
  position: relative;
`;

export const GoldenLeaf = styled.div`
  width: 100%;
  height: 100%;
  z-index: 20;
  position: absolute;
  top: 0;
  background-image: url(${frameTopRankerIcon});
  background-size: 120% 90%;
  background-position: center;
  background-repeat: no-repeat;
`;

export const FrameTopRanker = styled.img`
  position: absolute;
  height: 150px;
  top: 0;
  right: -45px;
  z-index: 10;
  @media (max-width: 1024px) {
    height: 120px;
    top: 15px;
    right: -35px;
  }
  @media (max-width: 788px) {
    height: 150px;
    top: 0;
    right: -45px;
    z-index: 10;
  }
  @media (max-width: 550px) {
    height: 120px;
    top: 15px;
    right: -30px;
  }
`;
