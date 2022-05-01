import React from "react";
import styled from "styled-components";

const RaidContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RaidPage({ bgColor }: { bgColor: string }) {
  return <RaidContainer bgColor={bgColor}>Boss Raid Page</RaidContainer>;
}

export default RaidPage;
