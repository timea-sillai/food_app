import * as React from "react";
import { View } from "react-native";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProps } from "../navigation/NavigationTypes";
import asyncStorage from "../storage";
import auth from "@react-native-firebase/auth";
import LoginScreen from "./LoginScreen";
import { useEffect } from "react";
import GreenButton from "../components/GreenButton";

export default function ProfileScreen() {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const [isUserLoggedIn, setUserLoggedIn] = React.useState<boolean>(false);
  const isFocused = useIsFocused();
  const onLoginSuccess = () => {
    setUserLoggedIn(true);
  };

  useEffect(() => {
    asyncStorage
      .isUserLoggedIn()
      .then((isUserLoggedIn) => {
        setUserLoggedIn(isUserLoggedIn);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [isFocused]);

  const logoutUser = async () => {
    auth().signOut();
    asyncStorage.deleteUserId();
    navigation.navigate("Login", {});
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {isUserLoggedIn ? (
        <GreenButton inputText="logOut" action={logoutUser} />
      ) : (
        <LoginScreen
          hideSkipLogin={true}
          onLoginSuccess={() => onLoginSuccess()}
        />
      )}
    </View>
  );
}
