import styled from "styled-components";

export const StatusPageContainer = styled.div<{ bgColor: string }>`
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
    h1 {
      font-size: 1.5rem;
      font-family: "Fredoka One", cursive;
      color: #414693;
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
  border: 1px solid #dbae0d;
  margin-right: 10px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
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
  h1 {
    font-size: 1.3rem;
    height: 2rem;
    font-family: "Fredoka One", cursive;
    color: #414693;
    margin-bottom: 15px;
    border-bottom: 3px solid #c38b8b;
  }
`;

export const MyInfoContainer = styled.div`
  border: 1px solid #dbae0d;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 350px;
  padding: 15px 20px;
  margin-bottom: 20px;
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
`;

export const MyCompletedStatus = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
  @media (max-width: 768px) {
    font-size: 16px;
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
