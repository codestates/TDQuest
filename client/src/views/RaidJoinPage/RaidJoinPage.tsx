import React from "react";
import styled from "styled-components";

const RaidJoinContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RaidJoinPage({ bgColor }: { bgColor: string }) {
  return <RaidJoinContainer bgColor={bgColor}>Boss Page</RaidJoinContainer>;
}

export default RaidJoinPage;
