import { configureStore } from "@reduxjs/toolkit";
import contactListReducer from "./src/screens/home/home.reducer";
export const store = configureStore({
  reducer: {
    contact: contactListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
