import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga";
import { signInUserReducer } from "./signInUser";

// Managing the state of redux
const rootReducer = combineReducers({
  data: signInUserReducer,
});

// Create middleware
const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware];

// Connect our middleware to the Store
const middlewares = applyMiddleware(...middleware);

// Store holds the complete state of app
const store = createStore(rootReducer, compose(middlewares));

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootStateType = ReturnType<typeof store.getState>;

export default store;
