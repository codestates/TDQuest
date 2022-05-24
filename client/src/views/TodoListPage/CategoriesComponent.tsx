import React, { useState } from 'react';
import styled from 'styled-components';
import { color_context_blue_light } from '../../components/CommonStyle';

const IconBox = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

const Icon = styled.div<{ selected: boolean }>`
  border: ${(props) =>
    props.selected ? `3px ridge ${color_context_blue_light}` : ''};
  cursor: pointer;
  margin: 0 10px;
  border-radius: 5px;
  img {
    height: 30px;
  }
`;

function CategoriesComponent({
  category,
  categoryHandler,
}: {
  category: string;
  categoryHandler: any;
}) {
  return (
    <IconBox>
      <Icon
        onClick={() => {
          categoryHandler('phy');
        }}
        selected={category === 'phy' ? true : false}
      >
        <img src={require(`../../static/images/Physical.png`)} alt='Physical' />
      </Icon>
      <Icon
        onClick={() => {
          categoryHandler('int');
        }}
        selected={category === 'int' ? true : false}
      >
        <img
          src={require(`../../static/images/Intelligence.png`)}
          alt='Intelligence'
        />
      </Icon>
      <Icon
        onClick={() => {
          categoryHandler('spi');
        }}
        selected={category === 'spi' ? true : false}
      >
        <img src={require(`../../static/images/Spirit.png`)} alt='Spirit' />
      </Icon>
      <Icon
        onClick={() => {
          categoryHandler('exp');
        }}
        selected={category === 'exp' ? true : false}
      >
        <img src={require(`../../static/images/Exp.png`)} alt='Exp' />
      </Icon>
    </IconBox>
  );
}

export default CategoriesComponent;
