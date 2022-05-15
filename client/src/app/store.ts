import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import chracterReducer from '../features/character/characterSlice';
import signReducer from '../features/sign/signSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    chracter: chracterReducer,
    sign : signReducer,
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
