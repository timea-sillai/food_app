import { SignInDataTypes } from '../../Types';
import type { RootStateType } from '../Store';

type AuthSelectorsType = {
  getLoading: (state: RootStateType) => boolean;
  getUser?: (state: RootStateType) => SignInDataTypes | undefined;
  getError: (state: RootStateType) => string | undefined;
};

const AuthSelectors: AuthSelectorsType = {
  getLoading: (state: RootStateType): boolean => state.data.fetching,
  getUser: (state: RootStateType): SignInDataTypes | undefined =>
    state.data.data,
  getError: (state: RootStateType): string | undefined => state.data.error,
};

export default AuthSelectors;
