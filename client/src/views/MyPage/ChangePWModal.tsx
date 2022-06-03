import React, { useState } from "react";
import styled from "styled-components";
import Button from "../../components/Button";
import { Toast } from "../../components/Toast";
import { TDQuestAPI } from "../../API/tdquestAPI";

const ChangePw_Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const ChangePw_Msg = styled.div`
  font-size: 18px;
  height: auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin_bottom: 20px;
  .change_pw_input {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
  }
`;

const ChangePW_Wrapper = styled.form`
  font-size: 16px;
  width: 80%;
  height: auto;
  font-weight: bold;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 10px;
  .change_pw_input {
    width: 100%;
    border-top: none;
    border-left: none;
    border-right: none;
    border-bottom: 1px solid gray;
    margin: 20px 0;
  }
  span {
    color: red;
    font-weight: 400;
  }
`;

export const ChangePasswordModal = ({
  user_id,
  email,
  saveChange,
  setShowToast,
}: {
  user_id: string;
  email: string;
  close: () => void;
  saveChange: () => void;
  setShowToast: ()=> void;
}) => {
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showAlert, setAlert] = useState(false);
  const [showCurPWAlert, setShowCurPWAlert] = useState(false);

  const checkValidation = (passwords: string[]) => {
    for (let i = 0; i < 1; i++) {
      if (passwords[i].length < 4) {
        return false;
      }
    }
    return true;
  };

  const handleChange_cur = (e: React.FormEvent<HTMLInputElement>) => {
    setCurPassword(e.currentTarget.value);
  };

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

  const handleChangePwAction = async () => {
    if (checkValidation([newPassword, confirmPassword])) {
      await TDQuestAPI.post(`log/in`, {
        email: email,
        password: curPassword,
      })
        .then((res) => {
          if (res.status === 200) {
            TDQuestAPI.patch(`userInfo/?id=${user_id}`, {
              password: newPassword,
            }).then((res) => {
              saveChange();
              setShowCurPWAlert(false);
              setShowToast();
            });
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Check Current Password");
            setShowCurPWAlert(true);
          }
        });
    }
    return null;
  };

  return (
    <ChangePw_Container>
      <ChangePW_Wrapper>
        <p>Current Password</p>
        <input
          type="password"
          placeholder="Current password"
          onChange={handleChange_cur}
          className="change_pw_input"
          autoComplete="off"
        />
        <p>New Password</p>
        <input
          type="password"
          placeholder="New password"
          onChange={handleChange_new}
          className="change_pw_input"
          autoComplete="off"
        />
        <p>Confirm Password</p>
        <input
          type="password"
          placeholder="Confirm password"
          onChange={handleChange_confirm}
          className="change_pw_input"
          autoComplete="off"
        />
        {showAlert ? <span>Input same Password!</span> : null}
        {showCurPWAlert ? <span>Check current Password!</span> : null}
      </ChangePW_Wrapper>
      <Button text="Confirm" onClick={handleChangePwAction}></Button>   
    </ChangePw_Container>
  );
};
