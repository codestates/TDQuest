import React from 'react';
import styled from 'styled-components';
import { color_primary_green_light } from '../../components/CommonStyle';

// App.tsx에서 선언한 bgColor를 props로 받아온다.
const TodoContainer = styled.div`
  background-color: ${color_primary_green_light};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function TodoListPage() {
  return <TodoContainer>To-Do List Page</TodoContainer>;
}

export default TodoListPage;
