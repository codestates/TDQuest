import React from "react";
import styled from "styled-components";
import {
  fontSize_body_laptop,
  fontSize_body_laptop_small,
} from "./CommonStyle";

const HelperBearContainer = styled.div<{
  width?: string;
  height?: string;
  bearSize?: string;
}>`
  display: flex;
  align-items: center;
  img {
    image-rendering: pixelated;
    width: 70px;
    height: 70px;
    margin-right: 30px;
  }
  .bubble {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    width: ${(prop) => prop.width || "180px"};
    height: ${(prop) => prop.height || "50px"};
    padding: 10px;
    background: #ffffff;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    border: #7f7f7f solid 3px;
    text-align: center;
    /* custom code */
    font-size: ${fontSize_body_laptop_small};
    font-family: "Fredoka One", cursive;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }

  .bubble:after {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 8px 18px 8px 0;
    border-color: transparent #ffffff;
    display: block;
    width: 0;
    z-index: 1;
    margin-top: -8px;
    left: -18px;
    top: 35%;
  }

  .bubble:before {
    content: "";
    position: absolute;
    border-style: solid;
    border-width: 10px 20px 10px 0;
    border-color: transparent #7f7f7f;
    display: block;
    width: 0;
    z-index: 0;
    margin-top: -10px;
    left: -23px;
    top: 35%;
  }
`;

function HelperBear({
  width,
  height,
  text,
}: {
  width?: string;
  height?: string;
  text: string;
}) {
  return (
    <HelperBearContainer width={width} height={height}>
      <img
        src={require("../static/images/HelperBear.png")}
        alt="HelperBear_image"
      ></img>
      <div className="bubble">{text}</div>
    </HelperBearContainer>
  );
}

export default HelperBear;
