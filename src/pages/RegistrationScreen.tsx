import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import AppTextInput from "../components/AppTextInput";
import GreenButton from "../components/GreenButton";
import {
  LoginScreenNavigationProps,
  TabNavigatorProps,
} from "../navigation/NavigationTypes";
import { generalStyles } from "../styles/generalStyleSheet";
import { primary } from "../styles/styleGuide";
import { styles } from "./LoginScreen";
import auth from "@react-native-firebase/auth";
import asyncStorage from "../storage";
import { FirebaseUser } from "../types/types";
import { showFirebaseMessage } from "../utils/TextUtils";
import Constants from "../utils/constants";
import TransparentToolbar from "../components/TransparentToolbar";
import { paddings } from "../styles/branding";

const RegistrationScreen = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation<LoginScreenNavigationProps>();
  const navigationToMainScreen = useNavigation<TabNavigatorProps>();

  const navigateToLogin = () => {
    setName("");
    setEmail("");
    setPassword("");
    navigation.navigate("Login", {});
  };

  const navigateToHomeScreen = () => {
    setEmail("");
    setPassword("");
    navigationToMainScreen.navigate("TabNavigator", {});
  };

  const register = async () => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(
        email,
        password
      );

      if (user) {
        await user.updateProfile({
          displayName: name,
        });
      }

      signIn();
    } catch (error) {
      Alert.alert(t("error"), showFirebaseMessage(error.message));
      console.error(error);
    }
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
      <Image source={require("../../assets/images/registration.png")} />
      <TransparentToolbar
        style={{ position: "absolute", marginTop: paddings.padding_30 }}
        showBackButton={true}
        title=""
      />
      <Text style={styles.titleStyle}>{t("signUp")}</Text>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <AppTextInput
          onChangeText={(text: string) => setName(text)}
          label={t("name")}
          value={name}
          errorMessage={t("emptyTextError")}
          validationRegex={Constants.NOT_EMPTY_TEXT_REGEX}
        />
        <AppTextInput
          onChangeText={(text: string) => setEmail(text)}
          label={t("email")}
          value={email}
          errorMessage={t("emailError")}
          validationRegex={Constants.EMAIL_REGEX}
        />
        <AppTextInput
          onChangeText={(text: string) => setPassword(text)}
          label={t("password")}
          value={password}
          isPassword={true}
          errorMessage={t("passwordError")}
          validationRegex={Constants.PASSWORD_REGEX}
        />
      </KeyboardAvoidingView>
      <GreenButton inputText={t("signUp")} action={register} />
      <TouchableOpacity style={styles.textViewStyle} onPress={navigateToLogin}>
        <Text style={styles.fontStyle}>{t("alreadyHaveAccount")}</Text>
        <Text
          style={[
            styles.fontStyle,
            {
              color: primary.green,
            },
          ]}
        >
          {t("signIn")}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegistrationScreen;
