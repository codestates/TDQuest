import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import { color_primary_green_light } from '../../components/CommonStyle';

const StatusContainer = styled.div`
  background-color: ${color_primary_green_light};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function StatusPage() {
  return (
    <StatusContainer>
      Status Page
      <Button width='120px' text='text here'></Button>
    </StatusContainer>
  );
}

export default StatusPage;
