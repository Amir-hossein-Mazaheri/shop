import { combineReducers } from "redux";
import cartReducer from "./cart";

const entitiesReducers = combineReducers({
  cart: cartReducer,
});

export default entitiesReducers;
