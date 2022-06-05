import styled, { keyframes } from 'styled-components';
import {
  fontSize_h1_laptop,
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  fontSize_body_mobile_medium,
  fontSize_body_mobile_small,
  fontSize_body_laptop,
  color_menu_header_purple,
  color_border_yellow,
  color_context_brown,
  color_white,
  color_secondary_beige,
  color_primary_green_light,
} from '../../components/CommonStyle';

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
      font-family: 'Fredoka One', cursive;
      color: ${color_menu_header_purple};
    }
  }
`;

export const SectionContainer = styled.div`
  width: 90%;
  display: grid;
  column-gap: 10px;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  margin-bottom: 20px;
`;

export const StatusContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  height: 250px;
  border: 1px solid ${color_border_yellow};
  display: flex;
  justify-content: center;
`;
export const RewardContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  height: 250px;
  border: 1px solid ${color_border_yellow};
  display: grid;
  grid-template-rows: 40px 100%;
`;

export const TitleContainer = styled.div`
  width: 100%;
  background-color: ${color_context_brown};
  display: flex;
  justify-content: center;
  img {
    height: 20px;
    align-self: center;
    margin-right: 5px;
  }
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: 'Fredoka One', cursive;
    color: ${color_white};
    align-self: center;
  }
`;

export const ContentContainer = styled.div`
  display: grid;
  grid-template-columns: 0.9fr 1fr;
  align-self: center;
  justify-self: center;
  grid-gap: 20px;
  margin-top: -20px;
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: 'Fredoka One', cursive;
    text-align: center;
  }
  p {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: 'OpenSans';
    text-align: center;
    margin-bottom: 10px;
    img {
      image-rendering: pixelated;
      width: 30px;
      margin-right: 10px;
    }
  }
`;

export const UserInfo = styled.div`
  align-self: center;
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
