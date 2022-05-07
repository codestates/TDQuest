import styled from "styled-components";

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const CharacterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const CharacterBackground = styled.div`
  width: 100%;
  height: 150px;
  background-color: #686cd5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 5;
  .character_wrapper {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 20;
    justify-content: center;
  }
`;

export const CharacterBackgroundBottom = styled.div`
  width: 100%;
  height: 35%;
  background-color: #0ca789;
  border-radius: 10px;
  z-index: 15;
`;

export const Character = styled.img`
  image-rendering: pixelated;
  width: 70px;
  z-index: 50;
`;

export const UserNameContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: space-evenly;
  align-items: center;
`;

export const UserLevel = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #30acda;
  border-radius: 4px;
  width: 30px;
  height: 30px;
  font-size: 1rem;
  font-weight: bold;
  color: white;
`;

export const UserTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const UserNameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const UserName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
`;

export const StatusContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  img {
    width: 25px;
  }
`;
