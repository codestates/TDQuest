import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { stat } from "fs";
import { TDQuestAPI } from "../../API/tdquestAPI";
import { UserDataType } from "../../Types/generalTypes";

const initialUserData: UserDataType = {
  email: "",
  nickname: "",
  loading: true,
  error: false,
};

export const getUserData = createAsyncThunk(
  "userinfo",
  async (user_id: string) => {
    try {
      const userData = await TDQuestAPI.get(`userinfo/?id=${user_id}`);
      const response = {
        email: userData.data.userInfo.email,
        nickname: userData.data.userInfo.nickname,
      };
      return response;
    } catch (err) {
      throw console.log(`Get User info Error: ${err}`);
    }
  }
);

export const modifyNickname = createAsyncThunk(
  "modifyNickname",
  async (args: any, { rejectWithValue }) => {
    try {
      const response = await TDQuestAPI.patch(`userInfo/?id=${args.user_id}`, {
        nickname: args.nickname,
      }).then((res) => res.data);
      return response;
    } catch (err: any) {
      console.log(`Modify User Nickname failed: ${err}`);
      return rejectWithValue(err);
    }
  }
);

export const myPageUserDataSlice = createSlice({
  name: "userData",
  initialState: initialUserData,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserData.pending, (state) => {
        state.loading = true;
        state.error = false;
      })
      .addCase(getUserData.fulfilled, (state, { payload }) => {
        state.nickname = payload.nickname;
        state.email = payload.email;
        state.error = false;
        state.loading = false;
      })
      .addCase(getUserData.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      })
      .addCase(modifyNickname.fulfilled, (state, { payload }) => {
        state.nickname = payload.userInfo.nickname;
        state.loading = false;
        state.error = false;
      })
      .addCase(modifyNickname.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = true;
      });
  },
});

export default myPageUserDataSlice.reducer;
