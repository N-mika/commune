import { configureStore } from "@reduxjs/toolkit";
import birthAct from "./features/birthAct";
import user from "./features/user";

export const store = configureStore({
  reducer: {
    birthAct: birthAct,
    user : user
  },
});

// Types exportés
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;