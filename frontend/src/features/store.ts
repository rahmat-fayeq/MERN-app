import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import goalReducer from "./goals/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
