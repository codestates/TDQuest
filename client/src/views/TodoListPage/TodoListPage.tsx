import React from "react";
import styled from "styled-components";

// App.tsx에서 선언한 bgColor를 props로 받아온다.
const TodoContainer = styled.div<{ bgColor: string }>`
  background-color: ${(props) => props.bgColor};
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function TodoListPage({ bgColor }: { bgColor: string }) {
  return <TodoContainer bgColor={bgColor}>To-Do List Page</TodoContainer>;
}

export default TodoListPage;
