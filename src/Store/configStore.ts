import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";

type rootReducer = typeof reducers;

const storeFactory = (reducer: rootReducer) => {
  return configureStore({
    reducer,
  });
};

const store = storeFactory(reducers);

export type AppDispatch = typeof store.dispatch;

export type RootState = ReturnType<typeof store.getState>;

export default store;
