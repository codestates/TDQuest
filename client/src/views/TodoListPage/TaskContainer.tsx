import React, { useState } from 'react';
import styled from 'styled-components';
import {
  fontSize_h3_laptop,
  color_context_gray,
  color_menu_header_purple,
  color_border_yellow,
  color_context_beige,
  color_context_brown,
  color_white,
  fontSize_body_laptop,
  color_context_blue_light,
  color_context_beige_light,
} from '../../components/CommonStyle';
import PlusIcon from '../../static/images/icons/icon_plus.svg';

const Container = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  height: 450px;
  border: 1px solid ${color_border_yellow};
  display: grid;
  grid-template-rows: 40px 1fr;
`;
const TitleContainer = styled.div`
  width: 100%;
  background-color: ${color_context_brown};
  display: flex;
  justify-content: center;
  img {
    height: 20px;
    align-self: center;
    margin-right: 5px;
  }
  h3 {
    font-size: ${fontSize_h3_laptop};
    height: 2rem;
    font-family: 'Fredoka One', cursive;
    color: ${color_white};
    align-self: center;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

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

const InputBox = styled.div`
  width: 85%;
  border: 2px ridge ${color_context_blue_light};
  /* border-style: ridge; */
  display: grid;
  grid-template-columns: 1fr 30px;
  height: 40px;
  input {
    border: none;
    padding: 5px;
    font-size: ${fontSize_body_laptop};
    font-family: 'Fredoka One', cursive;
    outline: none;
    ::placeholder {
      color: ${color_context_beige};
    }
  }
`;

const InputIcon = styled.div`
  background-color: ${color_white};
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 30px;
  }
`;

function TaskContainer({
  title,
  icon,
  reqireInput,
}: {
  title: string;
  icon?: string | undefined;
  reqireInput?: boolean | undefined;
}) {
  const [category, setCategory] = useState('phy');

  const categoryHandler = (el: string) => {
    setCategory(el);
  };

  return (
    <Container bgColor={color_context_beige}>
      <TitleContainer>
        {icon ? (
          <img src={require(`../../static/images/icons/${icon}`)} alt='Ring' />
        ) : (
          ''
        )}
        <h3>{title}</h3>
      </TitleContainer>
      <ContentContainer>
        {reqireInput ? (
          <InputContainer>
            <IconBox>
              <Icon
                onClick={() => {
                  categoryHandler('phy');
                }}
                selected={category === 'phy' ? true : false}
              >
                <img
                  src={require(`../../static/images/Physical.png`)}
                  alt='Physical'
                />
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
                <img
                  src={require(`../../static/images/Spirit.png`)}
                  alt='Spirit'
                />
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
            <InputBox>
              <input placeholder='Add to-do'></input>
              <InputIcon>
                <img src={PlusIcon} alt='Plus' />
              </InputIcon>
            </InputBox>
          </InputContainer>
        ) : (
          ''
        )}
      </ContentContainer>
    </Container>
  );
}

export default TaskContainer;