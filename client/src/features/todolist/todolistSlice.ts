import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import axios from 'axios';
const url = 'http://localhost:3001';

export interface todoListState {
  status: 'idle' | 'loading' | 'failed';
  todo: any;
  completedTodo: any;
}

const initialState: todoListState = {
  status: 'idle',
  todo: {},
  completedTodo: {},
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const getTodoListAsync = createAsyncThunk(
  'get/todo',
  async (arg: any) => {
    try {
      const data = axios
        .get(`${url}/todo`, {
          params: { user_id: arg.user_id, is_complete: arg.is_complete },
          // headers: {
          //   Authorization: `token ${access_token}`,
          // },
        })
        .then((res) => {
          return res.data;
        });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const postTodoListAsync = createAsyncThunk(
  'post/todo',
  async (arg: any) => {
    try {
      const data = axios
        .post(`${url}/todo`, {
          user_id: arg.user_id,
          content: arg.content,
          kind: arg.kind,
        })
        .then((res) => {
          return res.data;
        });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const patchTodoListAsync = createAsyncThunk(
  'patch/todo',
  async (arg: any) => {
    try {
      const data = axios
        .patch(`${url}/todo`, {
          id: arg.id,
          content: arg.content,
          kind: arg.kind,
        })
        .then((res) => {
          return res.data;
        });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const deleteTodoListAsync = createAsyncThunk(
  'delete/todo',
  async (arg: any) => {
    try {
      const data = axios
        .delete(`${url}/todo`, {
          params: { id: arg.id },
        })
        .then((res) => {
          return res.data;
        });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const todoStatusChangeAsync = createAsyncThunk(
  'todo/complete/status',
  async (arg: any) => {
    try {
      const data = axios
        .put(
          `${url}/todo/complete?user_id=${arg.user_id}&status=${arg.kind}&id=${arg.id}`,
          {
            is_complete: arg.is_complete,
          }
        )
        .then((res) => {
          return res.data;
        });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const getCompletedTodoListAsync = createAsyncThunk(
  'todo/complete',
  async (arg: any) => {
    try {
      const data = axios
        .get(`${url}/todo/complete`, {
          params: { user_id: arg.user_id, time: arg.time },
        })
        .then((res) => {
          return res.data;
        });
      return data;
    } catch (error: any) {
      console.log(`error:${error.response}`);
    }
  }
);

export const todolistSlice = createSlice({
  name: 'todolist',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    // increment: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1;
    // },
    // decrement: (state) => {
    //   state.value -= 1;
    // },
    // // Use the PayloadAction type to declare the contents of `action.payload`
    // incrementByAmount: (state, action: PayloadAction<number>) => {
    //   state.value += action.payload;
    // },
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(getTodoListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getTodoListAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.todo = action.payload;
      })
      .addCase(postTodoListAsync.fulfilled, (state, action) => {
        const tempArray = state.todo.todoInfo;
        tempArray.push({ ...action.payload.todoInfo });
        state.todo.todoInfo = tempArray;
      })
      .addCase(deleteTodoListAsync.fulfilled, (state, action) => {
        const targetId: number = action.payload.todoInfo.id;
        const tempArray = state.todo.todoInfo;
        const index: any = state.todo.todoInfo.findIndex(
          (el: any) => el.id === targetId
        );
        tempArray.splice(index, index + 1);
        state.todo.todoInfo = tempArray;
      })
      .addCase(patchTodoListAsync.fulfilled, (state, action) => {
        console.log('success');
        console.log(action.payload);
        // 수정 했을때 수정된 todoInfo
      })
      .addCase(todoStatusChangeAsync.fulfilled, (state, action) => {
        console.log('success');
        console.log(action.payload);
        const is_complete: boolean = action.payload.todoInfo.is_complete;
        console.log(is_complete);

        // todo완료/취소 했을때 수정된 todoInfo
      })
      .addCase(getCompletedTodoListAsync.fulfilled, (state, action) => {
        state.completedTodo = action.payload;
      });
  },
});

// export const {  } = characterSlice.actions;

export default todolistSlice.reducer;
