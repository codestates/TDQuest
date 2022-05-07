import React from 'react';
import styled from 'styled-components';
import { color_primary_green_light } from '../../components/CommonStyle';

const RankingContainer = styled.div`
  background-color: ${color_primary_green_light};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RankingPage() {
  return <RankingContainer>Ranking Page</RankingContainer>;
}

export default RankingPage;
