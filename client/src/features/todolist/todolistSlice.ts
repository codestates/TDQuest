import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import axios from 'axios';
import { APIMAIN } from '../../API/tdquestAPI';

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
  'get/todo/incomplete',
  async (arg: any) => {
    try {
      const data = axios
        .get(`${APIMAIN}/todo/incomplete`, {
          params: { user_id: arg.user_id, is_complete: arg.is_complete },
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
        .post(`${APIMAIN}/todo`, {
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
  'put/todo',
  async (arg: any) => {
    try {
      const data = axios
        .patch(
          `${APIMAIN}/todo?id=${arg.id}`,
          {
            content: arg.content,
            kind: arg.kind,
          }
          // {
          //   headers: {
          //     Authorization: `accessToken ${arg.accessToken}`,
          //   },
          // }
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

export const deleteTodoListAsync = createAsyncThunk(
  'delete/todo',
  async (arg: any) => {
    try {
      const data = axios
        .delete(`${APIMAIN}/todo`, {
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
      let patchAPIAddress;
      if (arg.raid_id) {
        patchAPIAddress = `${APIMAIN}/todo/complete?user_id=${arg.user_id}&status=${arg.kind}&id=${arg.id}&is_complete=${arg.is_complete}&raid_id=${arg.raid_id}`;
      } else {
        patchAPIAddress = `${APIMAIN}/todo/complete?user_id=${arg.user_id}&status=${arg.kind}&id=${arg.id}&is_complete=${arg.is_complete}`;
      }

      const data = axios
        .patch(patchAPIAddress, {
          // is_complete: arg.is_complete,
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

export const getCompletedTodoListAsync = createAsyncThunk(
  'todo/complete',
  async (arg: any) => {
    try {
      const data = axios
        .get(`${APIMAIN}/todo/complete`, {
          params: {
            user_id: arg.user_id,
            time: arg.time,
            is_complete: arg.is_complete,
          },
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
        // todo 추가
        const tempArray = state.todo.todoInfo;
        tempArray.push({ ...action.payload.todoInfo });
        state.todo.todoInfo = tempArray;
      })
      .addCase(deleteTodoListAsync.fulfilled, (state, action) => {
        // todo 삭제
        const targetId: number = action.payload.todoInfo.id;
        const tempArray = state.todo.todoInfo;
        const index: any = state.todo.todoInfo.findIndex(
          (el: any) => el.id === targetId
        );
        tempArray.splice(index, 1);
        state.todo.todoInfo = tempArray;
      })
      .addCase(patchTodoListAsync.fulfilled, (state, action) => {
        // 수정 했을때
        // console.log(action.payload.todoInfo);

        const tempArray = state.todo.todoInfo;
        const targetId: number = action.payload.todoInfo.id;
        const index: any = state.todo.todoInfo.findIndex(
          (el: any) => el.id === targetId
        );
        tempArray[index] = action.payload.todoInfo;
        state.todo.todoInfo = tempArray;
      })
      .addCase(todoStatusChangeAsync.fulfilled, (state, action) => {
        // todo완료/취소 했을때
        // console.log(action.payload);

        const is_complete: any = action.payload.todoInfo.is_complete;

        const targetId: number = action.payload.todoInfo.id;
        // 추가해야할 부분 => 스토어의 케릭터 스탯 업데이트 ::

        if (is_complete) {
          // delete one from todo list
          const todoArray = state.todo.todoInfo;
          const index: any = state.todo.todoInfo.findIndex(
            (el: any) => el.id === targetId
          );
          todoArray.splice(index, 1);
          state.todo.todoInfo = todoArray;

          // add one to completedTodo
          const completedArray = state.completedTodo.todoInfo;
          completedArray.push({ ...action.payload.todoInfo });
          state.completedTodo.todoInfo = completedArray;
        } else {
          // delete one from completedTodo
          const completedArray = state.completedTodo.todoInfo;
          const index: any = state.completedTodo.todoInfo.findIndex(
            (el: any) => el.id === targetId
          );
          completedArray.splice(index, 1);
          state.completedTodo.todoInfo = completedArray;

          // add one to todo list
          const todoArray = state.todo.todoInfo;
          todoArray.push({ ...action.payload.todoInfo });
          state.todo.todoInfo = todoArray;
        }
      })
      .addCase(getCompletedTodoListAsync.fulfilled, (state, action) => {
        // 완료한 todo list 오늘 날짜 기준
        state.completedTodo = action.payload;
      });
  },
});

// export const {  } = characterSlice.actions;

export default todolistSlice.reducer;
