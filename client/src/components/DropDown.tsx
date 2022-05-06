import React from 'react';
import styled from 'styled-components';
import Button from './Button';
import { Link } from 'react-router-dom';

const DropDownContainer = styled.div<{
  headerColor: string;
  bodyColor: string;
}>`
  background-color: ${(props) => props.bodyColor};
  border: 2px solid ${(props) => props.headerColor};
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
  font-size: 18px;
  cursor: pointer;
  margin-bottom: 10px;
  &:hover {
    color: #194795;
  }
  @media (min-width: 768px) {
    display: none;
  }
`;

function DropDown({
  headerColor,
  bodyColor,
}: {
  headerColor: string;
  bodyColor: string;
}) {
  return (
    <DropDownContainer headerColor={headerColor} bodyColor={bodyColor}>
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
          fontSize='18px'
          padding='3px'
          text='My page'
          height='100%'
          marginBottom='10px'
        ></Button>
        <Button
          width='100%'
          fontSize='18px'
          padding='3px'
          text='Sign out'
          height='100%'
        ></Button>
      </MenuItems>
    </DropDownContainer>
  );
}

export default DropDown;
