import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import { generalStyles } from "../styles/generalStyleSheet";
import GreenButton from "../components/GreenButton";
import AppTextInput from "../components/AppTextInput";
import { primary } from "../styles/styleGuide";
import { paddings } from "../styles/branding";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import {
  RegistrationNavigationProps,
  TabNavigatorProps,
} from "../navigation/NavigationTypes";
import auth from "@react-native-firebase/auth";
import asyncStorage from "../storage";
import { FirebaseUser } from "../types/types";
import { showFirebaseMessage } from "../utils/TextUtils";

const LoginScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigationToMainScreen = useNavigation<TabNavigatorProps>();
  const navigationToRegistration = useNavigation<RegistrationNavigationProps>();

  const navigateToHomeScreen = () => {
    setEmail("");
    setPassword("");
    navigationToMainScreen.navigate("TabNavigator", {});
  };

  const navigateToRegistration = () => {
    navigationToRegistration.navigate("Registration", {});
  };

  const signIn = () => {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then((firebaseUser: FirebaseUser) => {
        asyncStorage.storeUserId(firebaseUser.user.uid);
        navigateToHomeScreen();
      })
      .catch((error) => {
        Alert.alert(t("error"), showFirebaseMessage(error.message));
        console.error(error);
      });
  };

  return (
    <View style={styles.mainViewStyle}>
      <Image source={require("../../assets/images/splash_image.png")} />
      <Text style={generalStyles.titleStyle}>{t("signIn")}</Text>
      <View>
        <AppTextInput
          onChangeText={(text: string) => setEmail(text)}
          label={t("email")}
          value={email}
        />
        <AppTextInput
          onChangeText={(text: string) => setPassword(text)}
          label={t("password")}
          value={password}
          isPassword={true}
        />
      </View>
      <GreenButton inputText={t("signIn")} action={signIn} />
      <TouchableOpacity
        style={styles.textViewStyle}
        onPress={navigateToRegistration}
      >
        <Text style={styles.fontStyle}>{t("accountQuestion")}</Text>
        <Text
          style={[
            styles.fontStyle,
            {
              color: primary.green,
            },
          ]}
        >
          {t("signUp")}
        </Text>
      </TouchableOpacity>
      <View style={styles.skipLoginViewStyle}>
        <TouchableOpacity onPress={navigateToHomeScreen}>
          <Text style={styles.skipLogin}>{t("skipLogin")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export const styles = StyleSheet.create({
  skipLoginViewStyle: {
    width: "100%",
    alignContent: "center",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  skipLogin: {
    padding: paddings.padding_20,
    width: "auto",
    fontSize: 14,
    color: primary.green,
  },
  textViewStyle: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: paddings.padding_20,
  },
  fontStyle: {
    fontSize: 16,
    padding: paddings.padding_4,
  },
  mainViewStyle: {
    backgroundColor: primary.white,
    flex: 1,
  },
});

export default LoginScreen;
