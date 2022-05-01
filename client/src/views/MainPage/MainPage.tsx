import React from "react";
import styled from "styled-components";

const MainpageContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function MainPage({ bgColor }: { bgColor: string }) {
  return <MainpageContainer bgColor={bgColor}>Main페이지</MainpageContainer>;
}

export default MainPage;
