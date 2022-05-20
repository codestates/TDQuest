import styled from "styled-components";
import {
  fontSize_h1_laptop,
  fontSize_h2_laptop,
  fontSize_h3_laptop,
  fontSize_body_mobile_medium,
  fontSize_body_mobile_small,
  fontSize_body_laptop,
  color_menu_header_purple,
  color_border_yellow,
  color_border_underbar_brown,
  color_secondary_beige,
  color_context_gray,
} from "../../components/CommonStyle";

export const StatusPageContainer = styled.div<{ bgColor: string }>`
  padding-top: 80px;
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
  min-height: 90vh;
  @media (max-width: 768px) {
    height: auto;
  }
`;

export const StatusHeader = styled.div`
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
  }
`;

export const SectionContainer = styled.div`
  width: 90%;
  display: flex;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const StatusContainer = styled.div`
  width: 30%;
  height: 350px;
  padding: 15px;
  border: 1px solid ${color_border_yellow};
  background-color: ${color_secondary_beige};
  margin-right: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media (max-width: 912px) {
    width: 55%;
  }
  @media (max-width: 768px) {
    width: auto;
    margin-right: 0px;
  }
`;

export const MyToDoStatusWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: "Fredoka One", cursive;
    color: ${color_menu_header_purple};
    margin-bottom: 15px;
    border-bottom: 3px solid ${color_border_underbar_brown};
  }
`;

export const MyInfoContainer = styled.div`
  background-color: ${color_secondary_beige};
  border: 1px solid ${color_border_yellow};
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 350px;
  padding: 15px 20px;
  margin-bottom: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  @media (max-width: 768px) {
    width: auto;
  }
`;

export const MyInfoWrapper = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  @media (max-width: 912px) {
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const MyInfoDetailWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  @media (max-width: 912px) {
    width: 100%;
    margin-bottom: 20px;
  }
  @media (max-width: 768px) {
    width: 100%;
    flex-direction: column;
    margin-bottom: 10px;
  }
`;

export const MyInfo = styled.div`
  display: flex;
  font-family: "Fredoka One", cursive;
  color: ${color_context_gray};
`;

export const MyCompletedStatus = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  font-family: "Fredoka One", cursive;
  font-size: ${fontSize_body_laptop};
  @media (max-width: 768px) {
    font-size: ${fontSize_body_mobile_medium};
  }
`;

export const BearWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
  @media (max-width: 768px) {
    margin-top: 20px;
    width: 100%;
  }
`;
