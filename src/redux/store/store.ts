import { applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { legacy_createStore as createStore } from "redux";
import rootReducer from "../reducers/reducers";
import rootSaga from "../sagas/sagas";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;
