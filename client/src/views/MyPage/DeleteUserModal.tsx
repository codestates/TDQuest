import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";

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
  .alert_msg {
    margin: 10px 0;
    color: red;
    font-size: 14px;
    font-weight: bold;
  }
  .buttonContainer{
    display: flex;
    margin: 10px 0;
    justify-content: center;
  }
`;

export const DeleteUserAlertModal = ({
  transferNickName,
  curNickName,
}: {
  transferNickName: any;
  curNickName: string;
}): JSX.Element => {
  const [userName, setUserName] = useState("");

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setUserName(e.currentTarget.value);
    console.log("current Target: ", e.currentTarget.value);
    console.log("cur user", userName);
  };

  return (
    <DeleteUserAlert_Container>
      <DeleteUserAlert_Msg>
        <p>Are you want to sure delete account?</p>
        <p>Then, please enter your user name.</p>
        <input
          type="text"
          placeholder="Enter your user name"
          onChange={(e) => {
            handleChange(e);
          }}
          className="confirm_user_id"
        />
        <p className="alert_msg">
          {userName !== curNickName ? "Enter correct nickname" : null}
        </p>
        <div className="buttonContainer">
          <Button
            text="Confirm"
            onClick={() => transferNickName(userName)}
          ></Button>
        </div>
      </DeleteUserAlert_Msg>
    </DeleteUserAlert_Container>
  );
};
