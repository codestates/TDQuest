import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState, AppThunk } from "../../app/store";
import axios from "axios";
import { APIMAIN } from "../../API/tdquestAPI";

export interface todoListState {
  status: "idle" | "loading" | "failed";
  rankingList: any;
  top: any;
}

const initialState: todoListState = {
  status: "idle",
  rankingList: {},
  top: {},
};

export const getRankingListAsync = createAsyncThunk(
  "get/rankingList",
  async () => {
    try {
      const data = axios.get(`${APIMAIN}/rank/status`).then((res) => {
        return res.data;
      });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const getTopRankerAsync = createAsyncThunk("get/topRanker", async () => {
  try {
    const data = axios.get(`${APIMAIN}/rank`).then((res) => {
      return res.data;
    });
    return data;
  } catch (error: any) {
    console.log(`error:${error.response}`);
  }
});

export const rankingSlice = createSlice({
  name: "ranking",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getRankingListAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getRankingListAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.rankingList = action.payload;
        console.log(action.payload);
      })
      .addCase(getTopRankerAsync.fulfilled, (state, action) => {
        state.top = action.payload.ranker[0];
      });
  },
});

export default rankingSlice.reducer;
