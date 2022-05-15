import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const url = "http://localhost:3001"

export interface SignUserInfo {
  status : string;
  userInfo : object;
  characterInfo : object;
}

export const initialState: SignUserInfo = {
  status : '',
  userInfo : {},
  characterInfo : {},
};


export const signIn = createAsyncThunk(
  "sign/in",
  async (data : any) => {
    try{
      const response = await axios.post(`${url}/log/in`, data);
      console.log("response:", response);
      const isLogin = {status : "loggedIn", ...response.data};
      localStorage.setItem("isLogin", JSON.stringify(isLogin));
      //
      window.location.assign('/todo')
      // 
      return isLogin
    }
    catch (err : any){
      console.log(err.response)
      if (err.response.status === 404){
        alert("입력하신 정보가 올바르지 않습니다")
      }
    }
  },
);

export const signUp = createAsyncThunk(
  "sign/up",
  async (data : any) => {
    try {
      const response = await axios.post(`${url}/sign/in`, data);
      console.log(response)
      window.location.href = "/sign"
      alert("회원가입 완료!")
    } catch (err : any){
      console.log(err.response.status)
      if (err.response.status === 409) {
        alert("이미 존재하는 아이디가 있습니다.")
      }
    }
  },
);

export const signSlice = createSlice({
  name: 'sign',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
    .addCase(signIn.fulfilled, (state, action) => {
      return {...state, ...action.payload}
    })
  },
});

export default signSlice.reducer;