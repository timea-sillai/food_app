import { combineReducers } from "redux";
import postReducer from "./postsReducers/PostReducer";

const rootReducer = combineReducers({
  posts: postReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
