// src/store/features/todo/todoSlice.ts
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { todoService } from "@/service/todo-service";
import { Todo, TodoCreateRequest, TodoDeleteRequest } from "@/types/todo";

interface TodoState {
  todos: Todo[];
  loading: boolean;
  error: string | null;
}

const initialState: TodoState = {
  todos: [],
  loading: false,
  error: null,
};

export const index = createAsyncThunk(
  "todo/index",
  async (_, { rejectWithValue }) => {
    try {
      const response = await todoService.index();
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Login failed");
    }
  }
);

export const create = createAsyncThunk(
  "todo/create",
  async (data: TodoCreateRequest, { rejectWithValue }) => {
    try {
      const response = await todoService.create(data);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);
export const remove = createAsyncThunk(
  "todo/remove",
  async (data: TodoDeleteRequest, { rejectWithValue }) => {
    try {
      const response = await todoService.remove(data);
      return response;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

const todoSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    remove: (state, action) => {
      state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      // Login
      .addCase(index.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(index.fulfilled, (state, action) => {
        state.loading = false;
        state.todos = action.payload;
      })
      .addCase(index.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Register
      .addCase(create.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(create.fulfilled, (state, action) => {
        if (action.payload) state.todos.push(action.payload);
        state.loading = false;
      })
      .addCase(create.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Remove
      .addCase(remove.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(remove.fulfilled, (state, action) => {
        if (action.payload)
          state.todos.filter((todo) => todo.id !== action.payload);
        state.loading = false;
      })
      .addCase(remove.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { remove: removeById } = todoSlice.actions;
export default todoSlice.reducer;
