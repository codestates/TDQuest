import React, { useState } from "react";
import styled from "styled-components";

const DeleteUserAlert_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DeleteUserAlert_Msg = styled.div`
  font-size: 18px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .confirm_user_id {
    width: 100%;
    height: 40px;
    margin-top: 50px;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
  }
  .change_pw_input {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
  }
`;

export const DeleteUserAlertModal = (): JSX.Element => {
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
          className="confirm_user_id"
        />
      </DeleteUserAlert_Msg>
    </DeleteUserAlert_Container>
  );
};
