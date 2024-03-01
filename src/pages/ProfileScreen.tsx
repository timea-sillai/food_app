import * as React from "react";
import { View } from "react-native";
import GreenButton from "../components/GreenButton";
import { useNavigation } from "@react-navigation/native";
import { LoginScreenNavigationProps } from "../navigation/NavigationTypes";
import asyncStorage from "../storage";

export default function ProfileScreen() {
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const logoutUser = async () => {
    asyncStorage.deleteUserId();
    navigation.navigate("Login", {});
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <GreenButton inputText="logOut" action={logoutUser} />
    </View>
  );
}
