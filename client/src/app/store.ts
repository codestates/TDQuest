import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chracterReducer from '../features/character/characterSlice';
import signReducer from '../features/sign/signSlice';
import todoListReducer from '../features/todolist/todolistSlice';
import myPageUserReducer from '../features/userinfo/userInfoSlice';
import rankingReducer from '../features/ranking/rankingSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chracter: chracterReducer,
    sign: signReducer,
    todoList: todoListReducer,
    MyPageInfo: myPageUserReducer,
    ranking: rankingReducer,
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
