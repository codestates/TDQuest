import React from 'react';
import styled from 'styled-components';
import { color_primary_green_light } from '../../components/CommonStyle';

const RaidContainer = styled.div`
  background-color: ${color_primary_green_light};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RaidPage() {
  return <RaidContainer>Boss Raid Page</RaidContainer>;
}

export default RaidPage;
