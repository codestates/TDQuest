import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

const RootToast = styled.div`
  .display_none {
    display: none;
  }
  white-space: pre-wrap;
`;

const PopOver = keyframes`
  0% {
    transform: rotateZ(0);
    transform: translateX(500px);
  }
  15% {
    transform: rotateZ(-3deg);
  }
  20% {
    transform: rotateZ(3deg);
  }
  25% {
    transform: rotateZ(-1deg);
  }
  30% {
    transform: rotateZ(1deg);
  }
  35% {
    transform: rotateZ(-3deg);
  }
  40%, 100% {
    transform: rotateZ(0);
    transform: translateX(0px); 
  }
`;
const PopHide = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(500px); 
  }
`;

const Wiggle = keyframes`
  0%, 7% {
    transform: rotateZ(0);
  }
  15% {
    transform: rotateZ(-15deg);
  }
  20% {
    transform: rotateZ(10deg);
  }
  25% {
    transform: rotateZ(-10deg);
  }
  30% {
    transform: rotateZ(6deg);
  }
  35% {
    transform: rotateZ(-4deg);
  }
  40%, 100% {
    transform: rotateZ(0);
  }
`;

const ToastContainer = styled.div`
  .toast_wrapper {
    width: 300px;
    height: 80px;
    background-color: white;
    position: fixed;
    top: 100px;
    right: 0px;
    z-index: 999;
    border-radius: 5px;
    border-left: 5px solid green;
    box-shadow: rgba(99, 99, 99, 0.2) 1px 5px 10px 0px;
    animation: ${PopOver} 1.5s;
  }
  .hide {
    animation-delay: 3s;
    animation: ${PopHide} 1s;
  }
`;

const CloseButton = styled.button`
  border: none;
  color: transparent;
  text-shadow: 0 0 0 gray;
  background-color: transparent;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ToastBody = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  margin-left: 5%;
  align-items: center;
  font-family: "Fredoka One", cursive;
  font-size: 15px;
`;

export function Toast({ text }: { text: string }) {
  const [showToast, setShowToast] = useState(true);
  const [hideToast, setHideToast] = useState(false);

  const handleClose = () => {
    setShowToast(false);
  };

  const HideToast = (time: number) => {
    setTimeout(() => {
      setHideToast(true);
    }, 4000);

    setTimeout(() => {
      setShowToast(false);
    }, time);
  };

  HideToast(4900);

  return (
    <RootToast>
      <ToastContainer className={`${showToast ? null : "display_none"}`}>
        <div className={`toast_wrapper ${hideToast ? "hide" : null}`}>
          <CloseButton onClick={handleClose}>❌</CloseButton>
          <ToastBody>{text}</ToastBody>
        </div>
      </ToastContainer>
    </RootToast>
  );
}

// export const createToast = (text: string, time?: number) => {
//   Toast({ text });
// };
