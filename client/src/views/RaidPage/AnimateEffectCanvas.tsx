import React, { useEffect, useRef, RefObject } from "react";
import styled from "styled-components";

export const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
  z-index: 100;

  position: absolute;
  image-rendering: pixelated;
`;

function AnimateEffectCanvas({imageX, imageY}: {imageX?: string, imageY?: string}) {
  const canvasRef: RefObject<HTMLCanvasElement> =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    let CANVAS_WIDTH = canvas?.width as number;
    let CANVAS_HEIGHT = canvas?.height as number;
    const ctx = canvas?.getContext("2d");

    const image = new Image();
    if (imageX && !imageY) {
      image.src = require("../../static/images/monsters/effects/" + imageX + ".png");
    } else if (!imageX && imageY) {
      image.src = require("../../static/images/monsters/effects/" + imageY + ".png");
    }
    const spriteWidth = 32;
    const spriteHeight = 32;
    const FireWidth = 32;
    const FireHeight = 53;
    let frameX = 0;
    let frameY = 0;
    let frameX_column = 0;
    let frameY_column = 0;
    let effectFrame = 0;
    let staggerFrame = 8;

    function animateEffect(image: HTMLImageElement): number {
      ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      if (imageX && !imageY) {
        ctx?.drawImage(
          image,
          frameX * spriteWidth,
          frameY * spriteHeight,
          spriteWidth,
          spriteHeight,
          30,
          35,
          spriteWidth,
          spriteHeight
        );
  
        ctx?.drawImage(
          image,
          frameX * spriteWidth,
          frameY * spriteHeight,
          spriteWidth,
          spriteHeight,
          230,
          75,
          spriteWidth,
          spriteHeight
        );
      }

      if (!imageX && imageY) {
        ctx?.drawImage(
          image,
          frameX_column * FireWidth,
          frameY_column * FireHeight,
          FireWidth,
          FireHeight,
          30,
          35,
          FireWidth,
          FireHeight,
        );
        
        ctx?.drawImage(
          image,
          frameX_column * FireWidth,
          frameY_column * FireHeight,
          FireWidth,
          FireHeight,
          230,
          60,
          FireWidth,
          FireHeight
        );
      }

      if (effectFrame % staggerFrame == 0) {
        if (frameX < 6 || frameY_column < 4) {
          frameX++;
          frameY_column++;
        } else {
          frameX = 0;
          frameY_column = 0;
        }
      }
      effectFrame++;
      return requestAnimationFrame(() => animateEffect(image));
    }
    animateEffect(image);
  }, []);

  return <Canvas ref={canvasRef}></Canvas>;
}

export default AnimateEffectCanvas;