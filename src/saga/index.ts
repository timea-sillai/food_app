import { all, takeLatest } from 'redux-saga/effects';
import { SignInUserTypes } from '../redux';
import { AuthServices } from '../services';
import { signInUser } from './AuthSaga';

const apiAuth = AuthServices.auth();

export default function* rootSaga() {
  yield all([
    takeLatest(SignInUserTypes.SIGN_IN_USER_REQUEST, signInUser, apiAuth),
  ]);
}
