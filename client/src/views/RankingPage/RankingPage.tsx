import React from "react";
import styled from "styled-components";

const RankingContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RankingPage({ bgColor }: { bgColor: string }) {
  return <RankingContainer bgColor={bgColor}>Ranking Page</RankingContainer>;
}

export default RankingPage;
