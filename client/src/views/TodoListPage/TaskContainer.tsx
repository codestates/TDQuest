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
import MenuIcon from '../../static/images/icons/three-dots-icon.jpeg';
import CategoriesComponent from './CategoriesComponent';

const Container = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  width: 100%;
  min-height: 400px;
  max-height: 550px;
  /* border: 1px solid ${color_border_yellow}; */
  display: grid;
  grid-template-rows: 40px 1fr;
  overflow: auto;
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
  /* justify-content: center; */
  flex-direction: column;
  padding-top: 10px;
  padding-bottom: 10px;
  align-items: center;
  width: 100%;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;

const InputBox = styled.div`
  width: 85%;
  border: 2px ridge ${color_context_blue_light};
  /* border-style: ridge; */
  display: grid;
  grid-template-columns: 1fr 30px;
  height: 50px;
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
    cursor: pointer;
    height: 30px;
  }
`;

const Item = styled.div`
  width: 85%;
  border: none;
  background-color: ${color_white};
  min-height: 50px;
  margin-top: 15px;
  display: flex;
  align-items: center;
  /* display: grid;
  grid-template-columns: 30px 1fr 30px;
  align-items: center; */
  img {
    cursor: pointer;
    height: 30px;
  }
  div {
    width: 100%;
    padding: 0 10px;
  }
`;

function TaskContainer({
  title,
  icon, // title 앞에 있는 아이콘
  todoCreator, // task 생성을 위한 버튼과 input 창 생성 여부
  itemModalBtn,
  itemIcon,
  openModalFunction,
  itemBtnActionFunction, // task 아이템의 버튼을 클릭 했을때 동작되는 함수
  itemCreateFunction,
  todoList,
}: {
  title: string;
  icon?: string | undefined;
  todoCreator?: boolean | undefined;
  itemModalBtn?: boolean | undefined;
  itemIcon?: any | undefined;
  openModalFunction?: any | undefined;
  itemBtnActionFunction?: any | undefined;
  itemCreateFunction?: any | undefined;
  todoList?: any | undefined;
}) {
  const [category, setCategory] = useState('phy');
  const [tastContent, setTastContent] = useState('');

  const categoryHandler = (el: string) => {
    setCategory(el);
  };
  const inputHandler = (el: string) => {
    setTastContent(el);
  };

  // empty object checking function
  const isEmptyObj = (obj: object) => {
    return JSON.stringify(obj) === '{}';
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
        {/*  todolist 생성을 위한 컴포넌트 */}
        {todoCreator ? (
          <InputContainer>
            <CategoriesComponent
              category={category}
              categoryHandler={categoryHandler}
            ></CategoriesComponent>
            <InputBox>
              <input
                placeholder='Add to-do'
                value={tastContent}
                onChange={(el) => {
                  inputHandler(el.target.value);
                }}
              ></input>
              <InputIcon>
                <img
                  src={PlusIcon}
                  alt='Plus'
                  onClick={() => {
                    itemCreateFunction(tastContent, category);
                    setTastContent('');
                  }}
                />
              </InputIcon>
            </InputBox>
          </InputContainer>
        ) : (
          ''
        )}
        {/*  Todo list empty 여부 확인 */}
        {todoList && !isEmptyObj(todoList) ? (
          <>
            {todoList.todoInfo.map((el: any) => (
              <Item key={el.id}>
                {itemModalBtn ? (
                  <img
                    src={MenuIcon}
                    alt='Menu'
                    onClick={() => {
                      openModalFunction(el.content, el.id, el.kind);
                    }}
                  />
                ) : (
                  ''
                )}
                <div>{el.content}</div>
                {itemIcon ? (
                  <img
                    src={itemIcon}
                    alt='Menu'
                    onClick={() => {
                      itemBtnActionFunction(el.id, el.kind);
                    }}
                  />
                ) : (
                  ''
                )}
              </Item>
            ))}
          </>
        ) : (
          'Empty...'
        )}
      </ContentContainer>
    </Container>
  );
}

export default TaskContainer;
