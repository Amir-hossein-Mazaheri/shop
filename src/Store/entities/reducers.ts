import { combineReducers } from "redux";
import cartReducer from "./cart";
import userReducer from "./user";

const entitiesReducers = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export default entitiesReducers;
