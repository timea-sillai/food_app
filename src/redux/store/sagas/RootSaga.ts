import { all, fork } from "redux-saga/effects";
import postsSaga from "../../sagas/postsSaga/PostSagas";
export function* rootSaga() {
  yield all([fork(postsSaga)]);
}
