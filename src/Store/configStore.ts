import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import reducer, { Reducer } from "./reducers";

const storeFactory = (reducer: any) => {
  return configureStore({
    reducer,
  });
};

const store = storeFactory(reducer);

type AppDispatch = typeof store.dispatch;

const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
