import React from 'react';
import styled from 'styled-components';
import {
  fontSize_h2_laptop,
  fontSize_body_laptop,
  color_primary_green_medium
} from '../../components/CommonStyle';

 const HpBarContainer = styled.div<{max : number, current : number}>`
  /* width : 90%; */
  width : 15rem; 
  height : ${fontSize_h2_laptop};
  margin-left: 1rem;
  display : flex;
  border-radius: 5px;
  align-items: center;
  justify-content: start;
  font-size: ${fontSize_body_laptop};
  text-align: center;
  

  //전체 hp 사이즈
  > div:first-child{
    border-radius: 5px;
    background-color : #8d8c8c;
    height : ${fontSize_h2_laptop};
    width : 15rem;
  }
  //current hp 사이즈
  > div:last-child {
    position: absolute;
    border-radius: 5px;
    z-index : 1;
    height : ${fontSize_h2_laptop};
    width : ${props => 15 * (props.current / props.max)}rem;
    background-color: ${color_primary_green_medium};
  }

  > p {
    width: 15rem;
    position: absolute;
    text-align: center;
    z-index: 2;
  }

  @media (max-width:1300px) {
    width : 9rem;
    > div, > p{
      width : 9rem;
    }
    > div:last-child{
      width : ${props => 9 * (props.current / props.max)}rem;
    }
  }

  @media (max-width:768px) {
    width : 15rem;
    > div, > p{
      width : 15rem;
    }
    > div:last-child{
      width : ${props => 15 * (props.current / props.max)}rem;
    }
  }

`

function HpBar({max, current} : any) {
  return (
    <HpBarContainer max={max} current={current}>
      <div/>
      <p>{String(current)} / {String(max)}</p>
      <div/>
    </HpBarContainer>
  )
}

export default HpBar