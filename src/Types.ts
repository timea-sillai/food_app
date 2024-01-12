import { ApiResponse } from 'apisauce';
import { AnyAction } from 'redux';
import { DefaultActionCreators, DefaultActionTypes } from 'reduxsauce';

export interface SignInActionTypes extends DefaultActionTypes {
  signInRequest: 'signInRequestProp';
  signInSuccess: 'signInSuccessProp';
  signInFailure: 'signInFailureProp';
}

export interface PayloadType {
  email: string;
  password: String;
}

export interface SignInInitialStateTypes {
  data: undefined | SignInDataTypes;
  fetching: boolean;
  error: string | undefined;
}

export interface SignInActionCreators extends DefaultActionCreators {
  signInRequestProp: (payload: PayloadType) => SignInPropAction;
  signInSuccessProp: (data: SignInDataTypes) => SignInSuccessPropAction;
  signInFailureProp: (error: string) => SignInFailurePropAction;
}

export interface SignInDataTypes {
  token: string;
}

export interface SignInActionType {
  data: SignInDataTypes;
  error: string;
}

export interface SignInPropAction extends AnyAction {
  payload: PayloadType;
}

export interface SignInSuccessPropAction extends AnyAction {
  data: SignInDataTypes;
}

export interface SignInFailurePropAction extends AnyAction {
  error: string;
}

export interface SignInUserTypes {
  data: { data?: { token: string } };
  status: number;
  message?: string;
}

export interface ErrorTypes {
  error: string;
  message?: string;
  status?: number;
}

export type SignInActions =
  | SignInPropAction
  | SignInSuccessPropAction
  | SignInFailurePropAction
  | AnyAction;

export interface SignInUserActionTypes {
  payload: PayloadType;
  type: string;
}

export interface SignInUserType {
  fetching?: boolean;
  error?: string;
  data?: SignInDataTypes;
}

export interface SignInUserAPITypes {
  signInUser: (
    payload: PayloadType,
  ) => ApiResponse<SignInUserTypes, ErrorTypes>;
}
