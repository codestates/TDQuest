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

const ChangePW_Wrapper = styled.div`
  font-size: 16px;
  width:80%;
  height: auto;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  .change_pw_input {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    margin: 15px 0;
  }
  span {
    color: red;
    font-weight: 400;
  }
`;

export const ChangePasswordModal = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setAlert] = useState(false);

  const handleChange_new = (e: React.FormEvent<HTMLInputElement>) => {
    setNewPassword(e.currentTarget.value);
    if (newPassword === confirmPassword) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  const handleChange_confirm = (e: React.FormEvent<HTMLInputElement>) => {
    setConfirmPassword(e.currentTarget.value);
    if (newPassword === confirmPassword) {
      setAlert(true);
    } else {
      setAlert(false);
    }
  };

  return (
    <DeleteUserAlert_Container>
      <ChangePW_Wrapper>
        <p>Current Password</p>
        <input
          type="password"
          placeholder="Current password"
          onChange={handleChange_new}
          className="change_pw_input"
        />
        <p>New Password</p>
        <input
          type="password"
          placeholder="New password"
          onChange={handleChange_new}
          className="change_pw_input"
        />
        <p>Confirm Password</p>
        <input
          type="password"
          placeholder="Confirm password"
          onChange={handleChange_confirm}
          className="change_pw_input"
        />
        {showAlert ? <span>Input same password!</span> : null}
      </ChangePW_Wrapper>
    </DeleteUserAlert_Container>
  );
};

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
