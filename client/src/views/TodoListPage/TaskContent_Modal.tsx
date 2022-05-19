import React, { useState } from 'react';
import styled from 'styled-components';
import {
  fontSize_body_laptop,
  color_context_blue_light,
} from '../../components/CommonStyle';
import CategoriesComponent from './CategoriesComponent';

const TaskContent_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const InputBox = styled.div`
  font-size: ${fontSize_body_laptop};
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  label {
    margin: 10px 0;
  }
  input {
    width: 100%;
    min-height: 50px;
    border: 2px solid ${color_context_blue_light};
    border-radius: 1px;
  }
`;

const TaskContent_Modal = ({
  selectedTaskContent,
  selectedTaskKind,
  selectedTaskContentHandler,
  selectedTaskKindHandler,
}: {
  selectedTaskContent: string;
  selectedTaskKind: string;
  selectedTaskContentHandler: any;
  selectedTaskKindHandler: any;
}) => {
  return (
    <TaskContent_Container>
      <InputBox>
        <label>category</label>
        <CategoriesComponent
          category={selectedTaskKind}
          categoryHandler={selectedTaskKindHandler}
        ></CategoriesComponent>
        <label>To-do</label>
        <input
          type='text'
          placeholder='Edit to do'
          value={selectedTaskContent}
          onChange={(el) => {
            selectedTaskContentHandler(el.target.value);
          }}
        />
      </InputBox>
    </TaskContent_Container>
  );
};

export default TaskContent_Modal;
