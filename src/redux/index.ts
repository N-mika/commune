import { configureStore } from "@reduxjs/toolkit";
import birthAct from "./features/birthAct";

export const store = configureStore({
  reducer: {
    birthAct: birthAct
  },
});

// Types exportés
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;