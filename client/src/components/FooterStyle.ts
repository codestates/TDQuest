import styled from "styled-components";

export const FooterContainer = styled.footer<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  height: 150px;
  padding-left: 25px;
  padding-right: 25px;

  @media (max-width: 768px) {
    height: auto;
    padding-top: 25px;
    display: flex;
    flex-direction: column;
    align-content: space-around;
  }
`;

export const Description = styled.section`
  height: 100px;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-around;
  }
`;

export const DescWrapper = styled.section`
  width : 200px;
  font-size: 18px;
  color: white;

  > p {
    &:hover {
      cursor: pointer;
    }
  }

  @media (max-width: 768px) {
    width: auto;
    line-height: 70%;
  }
`;

export const LogoWrapper = styled.div`
  text-align: right;
  height: 100px;
  font-size: 18px;
  color: white;

  >h1{
    font-family: "Fredoka One", cursive;
    font-size: 35px;
  }

  @media (max-width: 768px) {
    text-align: center;
    line-height: 70% ;
    height: auto;
    padding-bottom: 25px;
  }
`;

