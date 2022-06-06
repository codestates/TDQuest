import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import { TDQuestAPI } from "../../API/tdquestAPI";

export interface CharacterState {
  createdAt: string;
  exp: number;
  id: number;
  image: any;
  level: number;
  medal: any;
  status_int: number;
  status_phy: number;
  status_spi: number;
  totalExp: number;
  updatedAt: string;
  user_id: number;
  status: string;
}

const initialState: CharacterState = {
  status: "",
  createdAt: "",
  exp: 0,
  id: 0,
  image: 0,
  level: 0,
  medal: "",
  status_int: 0,
  status_phy: 0,
  status_spi: 0,
  totalExp: 0,
  updatedAt: "",
  user_id: 0,
};

export const getCharacterAsync = createAsyncThunk(
  "get/:id",
  async (arg: string) => {
    try {
      const response = await TDQuestAPI.get(`character/?user_id=${arg}`);
      return response.data;
    } catch (err: any) {
      console.log(err.response);
    }
  }
);

export const characterSlice = createSlice({
  name: "character",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCharacterAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCharacterAsync.fulfilled, (state, action) => {
        return { ...action.payload.characterInfo };
      })
      .addCase(getCharacterAsync.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export default characterSlice.reducer;
