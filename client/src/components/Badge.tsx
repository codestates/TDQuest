import React from "react";
import styled from "styled-components";
import { color_primary_green_dark } from "./CommonStyle";

const BadgeContainer = styled.div<{ color?: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 45px;
  min-width: 45px;
  margin-left: 10px;
  height: 25px;
  padding: 1px;
  background-color: ${({ color }) => color || color_primary_green_dark};
  color: white;
  font-size: 15px;
  border-radius: 3px;
  &:hover {
    cursor: pointer;
  }
`;

function Badge({ color, text }: { color?: string; text: string }) {
  return (
    <BadgeContainer color={color}>
      <p>{text}</p>
    </BadgeContainer>
  );
}

export default Badge;
