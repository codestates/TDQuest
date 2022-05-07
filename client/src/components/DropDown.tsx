import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';
import {
  color_primary_green_dark,
  color_primary_green_light,
  color_context_blue,
  fontSize_smallButton_laptop,
} from './CommonStyle';

const DropDownContainer = styled.div<{}>`
  background-color: ${color_primary_green_light};
  border: 2px solid ${color_primary_green_dark};
  border-radius: 10px;
  position: absolute;
  right: 1vw;
  top: 60px;
`;

const MenuItems = styled.li<{}>`
  display: flex;
  flex-direction: column;
  padding: 15px;
`;

const Item = styled.p<{}>`
  color: black;
  font-size: ${fontSize_smallButton_laptop};
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: ${color_context_blue};
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

function DropDown() {
  return (
    <DropDownContainer>
      <MenuItems>
        <Item>
          <Link to={'/status'}>My Status</Link>
        </Item>
        <Item>
          <Link to={'/todo'}>To-Do List</Link>
        </Item>
        <Item>
          <Link to={'/raid'}>Boss Raid</Link>
        </Item>
        <Item>
          <Link to={'/ranking'}>Ranking</Link>
        </Item>
        <Button
          width='100%'
          fontSize={fontSize_smallButton_laptop}
          padding='3px'
          text='My page'
          height='100%'
          marginBottom='10px'
        ></Button>
        <Button
          width='100%'
          fontSize={fontSize_smallButton_laptop}
          padding='3px'
          text='Sign out'
          height='100%'
        ></Button>
      </MenuItems>
    </DropDownContainer>
  );
}

export default DropDown;
