import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IPost } from "../../../types/types";
import { postTypes } from "../../../actions/ActionTypes";

const getPosts = () =>
  axios.get<IPost[]>("https://jsonplaceholder.typicode.com/todos");

function* fetchPostsSaga() {
  try {
    const response = yield call(getPosts);
    yield put(
      fetchPostsSuccess({
        posts: response.data,
      })
    );
  } catch (e) {
    yield put(
      fetchPostsFailure({
        error: e.message,
      })
    );
  }
}

function* postsSaga() {
  yield all([takeLatest(postTypes.FETCH_POST_REQUEST, fetchPostsSaga)]);
}

export default postsSaga;
function fetchPostsSuccess(arg0: { posts: any }): any {
  throw new Error("Function not implemented.");
}

function fetchPostsFailure(arg0: { error: any }): any {
  throw new Error("Function not implemented.");
}
