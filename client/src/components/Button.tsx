import React from 'react';
import styled from 'styled-components';
import {
  color_primary_green_dark,
  color_primary_green_medium,
  fontSize_bigButton_laptop,
} from './CommonStyle';

const ButtonContainer = styled.button<{
  width?: string;
  fontSize?: string;
  padding?: string;
  height?: string;
  marginBottom?: string;
}>`
  width: ${(props) => props.width || '120px'};
  font-size: ${(props) => props.fontSize || fontSize_bigButton_laptop};
  padding: ${(props) => props.padding || null};
  background-color: ${color_primary_green_dark};
  font-family: 'Fredoka One', cursive;
  height: ${(props) => props.height || '50px'};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: pointer;
  margin-bottom: ${(props) => props.marginBottom || null};
  &:hover {
    background-color: ${color_primary_green_medium};
  }
  min-width: 100px;
`;

// Button 컴포넌트는 width, fontSize, padding, text를 넣어 사용할 수 있습니다.
// 값을 지정하지 않은 경우, 기본 설정값으로 버튼이 생성됩니다.
//! 기본 설정값 : width: 120px, fontSize: 20px, padding: null
// text에는 버튼 안에 넣고 싶은 텍스트를 할당하면 됩니다.
function Button({
  width,
  fontSize,
  padding,
  text,
  height,
  marginBottom,
}: {
  width?: string;
  fontSize?: string;
  padding?: string;
  text: string;
  height?: string;
  marginBottom?: string;
}) {
  return (
    <ButtonContainer
      width={width}
      fontSize={fontSize}
      padding={padding}
      height={height}
      marginBottom={marginBottom}
    >
      {text}
    </ButtonContainer>
  );
}

export default Button;
