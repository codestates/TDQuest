import styled from "styled-components";
import {
  fontSize_h1_laptop,
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  fontSize_h2_tablet,
  fontSize_h3_tablet,
  fontSize_body_mobile_medium,
  fontSize_body_mobile_small,
  fontSize_body_laptop_big,
  fontSize_body_laptop,
  color_menu_header_purple,
  color_border_yellow,
  color_context_brown,
  color_white,
  color_secondary_beige,
} from "../../components/CommonStyle";

export const TodoContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  min-height: 90vh;
  padding-top: 80px;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const TodoListPageHeader = styled.div`
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
      @media (max-width: 768px) {
        font-size: ${fontSize_h2_tablet};
      }
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
    width: 90%;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  }
`;

export const StatusContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: auto;
  border: 1px solid ${color_border_yellow};
  border-radius: 5px;
  display: flex;
  padding: 10px;
  justify-content: center;
  @media (max-width: 768px) {
    height: auto;
    padding: 15px;
    margin-bottom: 15px;
  }
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
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
  @media (max-width: 768px) {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: auto;
  }
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
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "OpenSans";
    text-align: center;
    @media (max-width: 768px) {
      font-size: ${fontSize_h3_tablet};
    }
  }
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    height: auto;
    padding: 15px 0;
  }
`;

export const RewardInfo = styled.div`
  h3 {
    font-family: "Fredoka One", cursive;
    font-size: ${fontSize_body_laptop_big};
  }
`;
