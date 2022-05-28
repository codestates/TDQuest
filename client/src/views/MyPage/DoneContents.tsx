import React from "react";
import styled from "styled-components";
import {
  color_context_beige_light,
  fontSize_body_laptop_small,
  fontSize_body_mobile_small
} from "../../components/CommonStyle";
import { TodoContentType } from "../../Types/generalTypes";
import { TDQuestAPI } from "../../API/tdquestAPI";

const DoneContent = styled.div`
  width: 90%;
  min-height: 35px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${color_context_beige_light};
  @media (max-width: 768px) {
    width: 95%;
  }
  .content_wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    .content {
      font-size: ${fontSize_body_laptop_small};
      display: flex;
      align-items: center;
      flex: 5 0 0;
      padding-left: 5px;
    }
    .created_contanier {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      color: gray;
      font-size: ${fontSize_body_laptop_small};
      @media (max-width: 768px) {
        font-size: ${fontSize_body_mobile_small};
      }
      flex: 3 0 0;
      button {
        border: none;
        background-color: transparent;
        margin-right: 5px;
      }
    }
  }
`;

function DoneContents({id, content, updatedAt, handleDeleteList}: TodoContentType) {

  const handleClick = (id: number) => {
    TDQuestAPI.delete(`todo/?id=${id}`).then((res) => res.data);
  }

  return (
    <DoneContent>
      <div className="content_wrapper">
        <div className="content">{content}</div>
        <div className="created_contanier">
          {updatedAt}
          <button onClick={()=>{
            handleClick(id)
            handleDeleteList(id);
          }}>⛔️</button>
        </div>
      </div>
    </DoneContent>
  );
}

export default DoneContents;

// ToDoList 삭제 요청 (parmeter: content id)