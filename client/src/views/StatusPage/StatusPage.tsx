import React from "react";
import styled from "styled-components";
import Button from "../../components/Button";

const StatusContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function StatusPage({ bgColor }: { bgColor: string }) {
  return (
    <StatusContainer bgColor={bgColor}>
      Status Page
      <Button width="120px" text="text here"></Button>
    </StatusContainer>
  );
}

export default StatusPage;
