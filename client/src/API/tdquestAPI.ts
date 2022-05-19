import React from "react";
import axios, { AxiosResponse } from "axios";

const APIMAIN = "https://tdquest.api/";

export const getCharacterInfo = async (user_Id: string) => {
  let characterData = {};
  try {
    const response: AxiosResponse<any> = await axios
      .get(`${APIMAIN}/character/${user_Id}`)
      .then((res) => (characterData = res.data));
  } catch (e) {
    if (e instanceof Error) {
      console.log("getCharacterInfo Error :", e.message);
    }
  }
  return characterData;
};
// response type :
// {
//   characterInfo : {
//       id : id,
//       user_id : user_id,
//       image : image,
//       level : level,
//       status_phy : status_phy,
//       status_int : status_int,
//       status_spl : status_spl,
//       medal : medal,
//       created_at : create_at,
//       updated_at : update_at
//   },
// }

export const dummyRes_getCharacterInfo = {
  data: {
    characterInfo: {
      id: 0,
      user_id: "TEST_USER_1",
      image: "char_default",
      level: 1250,
      status_phy: 50,
      status_int: 20,
      status_spl: 30,
      medal: "medal",
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
      // Server 측에서 추가로 계산하여 보내줄 데이터 (요청예정)
      userLevel: 13,
      userExp: 50,
    },
  },
};

export const getUserInfo = async (user_Id: string) => {
  let userData = {};
  try {
    const response: AxiosResponse<any> = await axios
      .get(`${APIMAIN}/userInfo/${user_Id}`)
      .then((res) => (userData = res.data));
  } catch (e) {
    if (e instanceof Error) {
      console.log("getUserInfo Error :", e.message);
    }
  }
  return userData;
};

// response type :
// {
//   userInfo : {
//       id : id,
//       nickname : nickname,
//       email : email,
//       created_at : created_at,
//       updated_at : updated_at
//   }
// }

export const dummyRes_getUserInfo = {
  data: {
    userInfo: {
      id: 1,
      nickname: "TEST_USER_1",
      email: "test@example.com",
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
    },
  },
};

export const dummyRes_getTodolist = {
  todoInfo: [
    {
      id: 1,
      user_id: 1,
      content: "푸쉬업 10번 하기",
      kind: "Physical",
      is_complete: true,
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
    },
    {
      id: 2,
      user_id: 1,
      content: "푸쉬업 20번 하기",
      kind: "Physical",
      is_complete: true,
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
    },
    {
      id: 3,
      user_id: 1,
      content: "푸쉬업 30번 하기",
      kind: "Physical",
      is_complete: true,
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
    },
    {
      id: 4,
      user_id: 1,
      content: "푸쉬업 40번 하기",
      kind: "Physical",
      is_complete: true,
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
    },
    {
      id: 5,
      user_id: 1,
      content: "푸쉬업 50번 하기",
      kind: "Physical",
      is_complete: true,
      created_at: "2022-05-08",
      updated_at: "2022-05-08",
    },
  ],
};