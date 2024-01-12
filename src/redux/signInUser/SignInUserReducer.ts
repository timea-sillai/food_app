import { createActions, createReducer } from "reduxsauce";
import {
  SignInActionCreators,
  SignInActionType,
  SignInActionTypes,
  SignInActions,
  SignInInitialStateTypes,
} from "../../Types";

/* ------------- Initial State ------------- */
export const INITIAL_STATE: SignInInitialStateTypes = {
  data: undefined,
  fetching: false,
  error: undefined,
};

/* ------------- Reducers ------------- */
// API request
export const request = (_state: SignInInitialStateTypes) => {
  return {
    fetching: true,
    data: undefined,
    error: undefined,
  };
};

// API success
export const success = (
  state: SignInInitialStateTypes,
  action: SignInActionType
) => {
  const { data }: SignInActionType = action;
  return {
    fetching: false,
    error: false,
    data: { token: data?.token },
  };
};

// API failure
export const failure = (
  state: SignInInitialStateTypes,
  action: SignInActionType
) => {
  const { error }: { error: string } = action;
  return {
    data: undefined,
    fetching: false,
    error,
  };
};

// Types and action creator
const { Types, Creators } = createActions<
  SignInActionTypes,
  SignInActionCreators
>({
  signInUserRequest: ["payload"],
  signInUserSuccess: ["data"],
  signInUserFailure: ["error"],
});

/* ------------- Reducer Types ------------- */
export const signInUserReducer = createReducer<
  SignInInitialStateTypes,
  SignInActions
>(INITIAL_STATE, {
  [Types.SIGN_IN_USER_REQUEST]: request,
  [Types.SIGN_IN_USER_SUCCESS]: success,
  [Types.SIGN_IN_USER_FAILURE]: failure,
});

export const SignInUserTypes: SignInActionTypes = Types;
export default Creators;
