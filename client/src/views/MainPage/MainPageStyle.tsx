import styled from "styled-components";
import {
  fontSize_h1_laptop,
  fontSize_h1_tablet,
  fontSize_body_laptop,
  fontSize_body_tablet,
} from "../../components/CommonStyle";

// 고정 px들 반응형에 맞게 수정
export const MainpageContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  overflow: hidden;
`;

export const LogoWrapper = styled.section`
  padding-top: 5rem;
  padding-bottom: 3rem;

  div {
    display: flex;
    flex-direction: row;
  }

  img {
    width: 94px;
    image-rendering: pixelated;
  }

  h1 {
    font-family: "Fredoka One", cursive;
    font-size: 94px;
  }

  p {
    padding-top: 15px;
    text-align: center;
  }

  @media (max-width: 768px) {
    h1 {
      font-size: 48px;
    }

    img {
      width: 50px;
    }
  }
`;

export const Wrapper = styled.section<{
  bgColor: string; 
  direction: string;
  type? : string;
  }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction};
  justify-content: ${(props) =>
    props.direction === "column" ? "space-around" : "center"};
  align-items: center;
  padding: 5%;
  height: ${(props) =>
    props.type === "signup" ? "none" : "50vh"};;

  > div > img {
    width: 700px;
    box-shadow: 0 0 10px black;

    @media (max-width: 1215px) and (min-width: 769px) {
      width: 50vw;
    }
  }

  @media (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    height: fit-content;

    > div {
      flex-direction: column;
    }

    > div > img {
      width: 90vw;
      box-shadow: 0 0 10px black;
      margin: 2rem;
    }
  }
`;

export const DesCard = styled.section`
  width: 400px;
  padding: 3rem;
  text-align: center;

  h1 {
    font-family: "Fredoka One", cursive;
    font-size: ${fontSize_h1_laptop};
  }

  p {
    padding-top: 18px;
    font-size: ${fontSize_body_laptop};
  }

  @media (max-width: 768px) {
    padding: 0;
    width: 80vw;
    text-align: left;

    h1 {
      font-size: ${fontSize_h1_tablet};
    }

    p {
      font-size: ${fontSize_body_tablet};
      padding-top: 0;
    }
  }
`;

export const StatCard = styled.section`
  padding-top: 1rem;
  padding-left: 1rem;
  padding-right: 1rem;
  width: 300px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  span {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  h1 {
    font-family: "Fredoka One", cursive;
    font-size: ${fontSize_h1_laptop};
    text-align: center;
  }

  p {
    width: 60%;
    padding-top: 18px;
    text-align: center;
  }

  @media (max-width: 768px) {
    padding: 0;
    width: 80vw;
    margin: 1rem;

    h1 {
      font-size: ${fontSize_h1_tablet};
    }
    p {
      font-size: 14px;
    }
  }
`;

export const BearWrapper = styled.section`
  display: flex;

  > img {
    width: 100px;
    margin-right: 2rem;
    image-rendering: pixelated;
  }

  > span {
    background-color: white;
    border-radius: 20px;
    border: 3px solid gray;
    text-align: center;
    padding: 2rem;

    p {
      font-family: "Fredoka One", cursive;
      font-size: 24px;
    }
  }

  @media (max-width: 768px) {
    margin-top: 1rem;
    > img {
      width: 50px;
      margin-right: 0.5rem;
    }
    > span {
      width: 50vw;
      padding: 1rem;

      p {
        font-size: 14px;
      }
    }
  }
`;
