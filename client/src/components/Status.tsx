import React from "react";
import styled from "styled-components";

const StatusContainer = styled.div<{ direction?: string }>`
  height: 40%;
  width: 100%;
  display: flex;
  flex-direction: ${(props) => props.direction || "row"};
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const CharacterContainer = styled.div`
  width: 95%;
  display: flex;
  flex-direction: column;
`;

const CharacterBackground = styled.div`
  width: 250px;
  height: 150px;
  background-color: #686cd5;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  z-index: 5;
  position: absolute;
`;

const CharacterBackground_Bottom = styled.div`
  width: 100%;
  height: 30%;
  position: absolute;
  background-color: #0ca789;
  border-radius: 10px;
  z-index: 10;
`;

const Character = styled.img`
  image-rendering: pixelated;
  width: 70px;
  z-index: 20;
`;

function Status({
  direction,
  character,
}: {
  direction?: string;
  character: string;
}) {
  return (
    <StatusContainer>
      <CharacterContainer>
        <CharacterBackground>
          <Character
            src={require(`../static/images/character/${character}.png`)}
          />
          <CharacterBackground_Bottom />
        </CharacterBackground>
      </CharacterContainer>
    </StatusContainer>
  );
}

export default Status;
