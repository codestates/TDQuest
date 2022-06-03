import React from "react";
import styled from "styled-components";
import { color_primary_deactivate } from "./CommonStyle";
import {
  color_primary_green_dark,
  color_primary_green_medium,
  fontSize_bigButton_laptop,
} from "./CommonStyle";

type ButtonData = {
  width?: string;
  fontSize?: string;
  padding?: string;
  text?: string;
  height?: string;
  marginBottom?: string;
  deactive?: boolean;
  onClick?: any;
  //!
  type?: any;
  bgColor?: string;
  img? : any;
  //!
};

const ButtonContainer = styled.button<ButtonData>`
  width: ${(props) => props.width || "120px"};
  font-size: ${(props) => props.fontSize || fontSize_bigButton_laptop};
  padding: ${(props) => props.padding || null};
  background-color: ${(props) => {
    if (props.bgColor){
      return props.bgColor;
    } else {
      if (props.deactive === true) {
        return color_primary_deactivate;
      }
      return color_primary_green_dark;
    }
  }};
  font-family: "Fredoka One", cursive;
  height: ${(props) => props.height || "50px"};
  color: white;
  border-radius: 5px;
  border: none;
  cursor: ${(props) => {
    if (props.deactive === true) {
      return null;
    }
    return "pointer";
  }};
  margin-bottom: ${(props) => props.marginBottom || null};
  &:hover {
    background-color: ${(props) => {
      if (props.deactive === true) {
        return null;
      }
      if (props.bgColor){
        return null;
      } else {
        return color_primary_green_medium;
      }
    }};

    filter : ${(props) => {
      if (props.bgColor){
        return "brightness(110%)";
      }
    }}
  }
  min-width: 100px;

  > img {
    width : ${(props) => {
      if(props.bgColor === "#f9e000"){
        return "23px";
      }else if(props.bgColor === "#fa6c67"){
        return "20px";
      } else {
        return "22px";
      }
    }};
    position: relative;
    top : 3px;
    right : ${(props) => {
      if(props.bgColor === "#f9e000"){
        return "2.3rem";
      }else if(props.bgColor === "#fa6c67"){
        return "2rem";
      } else {
        return "5.7rem";
      }
    }};
        
    @media(max-width : 768px){      
      /* width : ${(props) => props.bgColor === "#f9e000"? "15px" : "12px"};
      right : ${(props) => props.bgColor === "#f9e000"? "0.6rem" : "0.5rem"}; */

      width : ${(props) => {
          if(props.bgColor === "#f9e000"){
            return "15px";
          }else if(props.bgColor === "#fa6c67"){
            return "12px";
          } else {
            return "14px";
          }
        }};
      right : ${(props) => {
          if(props.bgColor === "#f9e000"){
            return "0.6rem";
          }else if(props.bgColor === "#fa6c67"){
            return "0.5rem";
          } else {
            return "2.5rem";
          }
        }};
    }
  }


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
  deactive,
  onClick,
  type,
  bgColor,
  img
}: ButtonData) {
  return (
    <ButtonContainer
      width={width}
      fontSize={fontSize}
      padding={padding}
      height={height}
      marginBottom={marginBottom}
      deactive={deactive}
      onClick={onClick}
      type={type}
      bgColor={bgColor}
      img={img}
    >
      {img}
      {text}
    </ButtonContainer>
  );
}

export default Button;
