import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../configStore";

type UserProperties = "firstName" | "lastName" | "email" | "imageURL";

interface UserInitialState {
  isLoggedIn: boolean;
  firstName: string;
  lastName: string;
  email: string;
  imageURL: string;
}

interface LogInAction {
  login: boolean;
}

interface UserCredentials {
  property: UserProperties;
  value: string;
}

const initialState: UserInitialState = {
  isLoggedIn: true,
  firstName: "",
  lastName: "",
  email: "",
  imageURL: "",
};

const user = createSlice({
  name: "user",
  initialState,
  reducers: {
    LOG_IN: (store, action: PayloadAction<LogInAction>) => {
      store.isLoggedIn = action.payload.login;
    },
    SET_USER_CREDENTIALS: (store, action: PayloadAction<UserCredentials>) => {
      store[action.payload.property] = action.payload.value;
    },
  },
});

export const selectIsLoggedIn = (store: RootState) =>
  store.entities.user.isLoggedIn;

export const selectImageURL = (store: RootState) =>
  store.entities.user.imageURL;

export default user.reducer;

export const { LOG_IN } = user.actions;
