import styled from 'styled-components';
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
} from '../../components/CommonStyle';

export const TodoContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
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
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: 'OpenSans';
    text-align: center;
  }
`;

export const RewardInfo = styled.div``;
