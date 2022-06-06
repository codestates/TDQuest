import styled from 'styled-components';
import {
  color_primary_green_light,
  color_context_brown,
  fontSize_body_laptop,
  color_white,
  color_context_beige,
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  fontSize_h2_mobile,
} from '../../components/CommonStyle';

export const RaidContainer = styled.div<{ bgColor: string }>`
  padding-top: 80px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 90vh;
  padding-bottom: 20px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const RaidPageHeader = styled.div`
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
      color: #414693;
    }
  }
`;

export const SectionContainer = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const RaidDetailContainer = styled.div`
  display: flex;
  width: 90%;
  height: 350px;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const MonsterContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 30%;
  min-width: 350px;
  min-height: 250px;
  height: 100%;
  position: relative;
  @media (max-width: 768px) {
    min-height: 330px;
  }
`;

export const MonsterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  .background {
    width: 100%;
    height: 100%;
    border-radius: 20px;
    background: linear-gradient(#686cd5 75%, #997a66 25%);
    z-index: 5;
  }
  /* .ground {
    width: 100%;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    height: 20%;
    background-color: #997a66;
    z-index: 20;
  } */
  .monster_wrapper {
    position: absolute;
    width: 100%;
    height: 80%;
    display: flex;
    align-items: center;
    z-index: 20;
    justify-content: center;
  }
`;

export const Monster = styled.img`
  image-rendering: pixelated;
  width: 220px;
  z-index: 50;
`;

export const MonsterInfoContainer = styled.div<{ monster_hp: number }>`
  display: flex;
  flex-direction: column;
  margin-top: 10px;
  .monster_name_wrapper {
    display: flex;
    justify-content: center;
    img {
      image-rendering: pixelated;
      width: 30px;
      margin-right: 10px;
    }
    h2 {
      font-size: 28px;
      height: 1.5rem;
      font-family: 'Fredoka One', cursive;
      text-align: center;
    }
  }
  .monster_hp_wrapper {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    h3 {
      font-family: 'Fredoka One', cursive;
      font-size: ${fontSize_body_laptop};
      margin-right: 10px;
    }
    .hp_container {
      width: 100%;
      height: 20px;
      background-color: ${color_context_beige};
      display: flex;
      justify-content: flex-start;
      align-items: center;
      position: relative;
      border-radius: 5px;
      .current_hp {
        width: ${(props) => `${(props.monster_hp / 5000) * 100}%`};
        height: 100%;
        background-color: #8fd14f;
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
      }
      .current_hp_text {
        position: absolute;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        h3 {
          position: absolute;
          font-family: 'Fredoka One', cursive;
          z-index: 50;
          font-size: 16px;
        }
      }
    }
  }
`;

export const DamageGraphContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
  min-width: 400px;
  min-height: 250px;
  height: 100%;
  margin-left: 50px;
  box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
  @media (max-width: 768px) {
    min-width: 300px;
    margin-top: 20px;
    margin-left: 0px;
    width: 100%;
  }
`;

export const TitleContainer = styled.div`
  width: 100%;
  min-height: 40px;
  background-color: ${color_context_brown};
  border-top-left-radius: 3px;
  border-top-right-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  .damaged_icon {
    width: 25px;
    margin-right: 10px;
    image-rendering: pixelated;
  }
  h3 {
    font-size: ${fontSize_h3_laptop};
    font-family: 'Fredoka One', cursive;
    color: ${color_white};
    @media (max-width: 768px) {
      font-size: ${fontSize_h2_mobile};
    }
  }
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
  padding: 15px 0;
  background-color: ${color_context_beige};
  h3 {
    font-size: ${fontSize_body_laptop};
    height: 1.5rem;
    font-family: 'OpenSans';
    text-align: center;
  }
`;

export const DamageStatusContainer = styled.div`
  width: 85%;
  margin-top: 30px;
  height: 300px;
  background-color: ${color_context_beige};
  box-shadow: rgba(99, 99, 99, 0.4) 0px 2px 8px 0px;
  display: flex;
  padding-top: 20px;
  padding-left: 10px;
  display: flex;
  justify-content: space-evenly;
  @media (max-width: 768px) {
    flex-direction: column;
    width: 90%;
    margin-top: 20px;
    height: auto;
    padding-top: 0;
    padding-bottom: 10px;
  }
`;

export const CharContainer = styled.div`
  width: 40%;
  height: 80%;
  image-rendering: pixelated;
  z-index: 200;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  .effect {
    image-rendering: pixelated;
    width: 100px;
    height: 100px;
    transform: rotate(180deg);
  }
  .charcter {
    width: 70px;
  }
`;

export const HelperBearContainer = styled.div`
  width: 40%;
  height: 80%;
  image-rendering: pixelated;
  display: flex;
  justify-content: center;
  align-items: center;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
  }
`;
