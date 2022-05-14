import React from "react";
import styled from "styled-components";
import {
  color_context_beige_light,
  fontSize_body_laptop,
} from "../../components/CommonStyle";
import { TodoContentType } from "../../Types/generalTypes";

const DoneContent = styled.div`
  width: 90%;
  height: 35px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-color: ${color_context_beige_light};
  .content_wrapper {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-left: 5px;
    .content {
      font-size: ${fontSize_body_laptop};
      display: flex;
      align-items: center;
      flex: 5 0 0;
    }
    .created_contanier {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      flex: 3 0 0;
      button {
        border: none;
        background-color: transparent;
        margin-right: 5px;
      }
    }
  }
`;

function DoneContents({content, created_at}: TodoContentType) {
  return (
    <DoneContent>
      <div className="content_wrapper">
        <div className="content">{content}</div>
        <div className="created_contanier">
          {created_at}
          <button>⛔️</button>
        </div>
      </div>
    </DoneContent>
  );
}

export default DoneContents;
