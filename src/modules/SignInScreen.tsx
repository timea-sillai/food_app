import React, { useEffect } from 'react';
import {
  AuthSelectors,
  signInUserAction,
  useAppDispatch,
  useAppSelector,
} from '../redux';
import { ActivityIndicator, Text, View } from 'react-native';

const SignInScreen = () => {
  const dispatch = useAppDispatch();
  const loading = useAppSelector<boolean>(AuthSelectors.getLoading);
  const error = useAppSelector<string | undefined>(AuthSelectors.getError);

  const onSubmit = () => {
    dispatch(
      signInUserAction.signInUserRequest({
        email: 'vixita@gmail.com',
        password: 'Test@123',
      }),
    );
  };

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <View>
      {loading ? (
        <ActivityIndicator />
      ) : error ? (
        <Text>{error}</Text>
      ) : (
        <View>{/*...Sign-in form*/}</View>
      )}
    </View>
  );
};

export default SignInScreen;
