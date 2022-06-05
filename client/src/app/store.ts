import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";
import characterReducer from "../features/character/characterSlice";
import signReducer from "../features/sign/signSlice";
import todoListReducer from "../features/todolist/todolistSlice";
import myPageUserReducer from "../features/userinfo/userInfoSlice";
import rankingReducer from "../features/ranking/rankingSlice";
import raidjoinReducer from '../features/raidjoin/raidjoinSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    character: characterReducer,
    sign: signReducer,
    todoList: todoListReducer,
    MyPageInfo: myPageUserReducer,
    ranking: rankingReducer,
    raidjoin: raidjoinReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
