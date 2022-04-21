import { combineReducers } from "redux";
import entitiesReducers from "./entities/reducers";
import uiReducer from "./ui";

const reducers = combineReducers({
  entities: entitiesReducers,
  ui: uiReducer,
});

export type Reducer = ReturnType<typeof reducers>;

export default reducers;
