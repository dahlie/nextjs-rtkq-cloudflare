import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { aivenApi } from "./aivenApi";

export const makeStore = () =>
  configureStore({
    reducer: {
      [aivenApi.reducerPath]: aivenApi.reducer,
    },
    middleware: (gDM) => gDM().concat(aivenApi.middleware),
  });

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
