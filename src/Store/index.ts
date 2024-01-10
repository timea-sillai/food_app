import createSagaMiddleware from "redux-saga";
import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import { combinedReducers } from "../Store/Reducers";
import rootSaga from "../Store/Sagas";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

export const store = createStore(
  combinedReducers,
  applyMiddleware(...middlewares)
);

sagaMiddleware.run(rootSaga);
