import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TDQuestAPI } from '../../API/tdquestAPI';

export const getUserData = createAsyncThunk("userinfo", async (user_id: any) => {
  try {
    await TDQuestAPI.get(`todo/complete/?user_id=${user_id}`)
  } catch (err) {
    throw console.log(err);
  }
});