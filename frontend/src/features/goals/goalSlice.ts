import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "../../services/goalService";
import { IGoal } from "../../types";

export type TGoal = {
  goals: String[];
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  message: String;
};

const initialState: TGoal = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const createGoal = createAsyncThunk(
  "goal/create",
  async (goalData: IGoal, thunkAPI: any) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error: any) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();

      return thunkAPI.rejectWithValue(message);
    }
  }
);

export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGoal.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = [...state.goals, action.payload] as any;
      })
      .addCase(createGoal.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload as any;
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
