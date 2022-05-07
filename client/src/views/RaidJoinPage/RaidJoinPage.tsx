import React from 'react';
import styled from 'styled-components';
import { color_primary_green_light } from '../../components/CommonStyle';

const RaidJoinContainer = styled.div`
  background-color: ${color_primary_green_light};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function RaidJoinPage() {
  return <RaidJoinContainer>Boss Page</RaidJoinContainer>;
}

export default RaidJoinPage;
