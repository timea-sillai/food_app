import { all } from "redux-saga/effects";
import homeSaga from "../Containters/Home/Saga";

function* rootSaga() {
  yield all([homeSaga()]);
}

export default rootSaga;
