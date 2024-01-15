import axios from "axios";
import { all, call, put, takeLatest } from "redux-saga/effects";
import { IPost } from "../../../types/types";
import { postTypes } from "../../../actions/ActionTypes";

const getPosts = () => {
  console.log("getPosts");
  return axios
    .get(
      "https://teams.microsoft.com/l/message/19:0280d640-8902-4e14-91ff-078020ee8bf9_ec30fd6d-ffd3-4be3-bbcb-06cd331e123f@unq.gbl.spaces/1705069848641?context=%7B%22contextType%22%3A%22chat%22%7D"
    )
    .then((res) => {
      console.log("RES " + res?.data);
      return res?.data;
    })
    .catch((err) => console.log(err));
};
function* fetchPostsSaga() {
  try {
    console.log("fetchPostsSaga");
    const response = yield call(getPosts);
    console.log("ABC");
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
