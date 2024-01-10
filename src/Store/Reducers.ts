import { combineReducers } from "redux";
import homeReducer from "../Containters/Home/Reducer";

export const combinedReducers = combineReducers({
  home: homeReducer,
});
