import React, { useState } from "react";
import styled from "styled-components";

const DeleteUserAlert_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteUserAlert_Msg = styled.div`
  font-size: 18px;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  input {
    width: 100%;
    margin-top: 50px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
  }
`;

const DeleteUserAlert_Modal = (): JSX.Element => {
  const [userName, setUserName] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
  };

  console.log(userName);

  return (
    <DeleteUserAlert_Container>
      <DeleteUserAlert_Msg>
        <p>Are you want to sure delete account?</p>
        <p>Then, please enter your user name.</p>
        <input
          type="text"
          placeholder="Enter your user name"
          onChange={handleChange}
        />
      </DeleteUserAlert_Msg>
    </DeleteUserAlert_Container>
  );
};

export default DeleteUserAlert_Modal;
