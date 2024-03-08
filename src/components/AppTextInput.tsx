import { StyleSheet, Text, TextInput, View, ViewStyle } from "react-native";
import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";
import { generalStyles } from "../styles/generalStyleSheet";
import { SeePassword } from "../utils/svg";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

interface AppTextInputProps {
  style?: ViewStyle;
  onChangeText: (text: string) => void;
  value: string;
  label: string;
  isPassword?: boolean;
  errorMessage?: string;
  validationRegex?: RegExp;
  isValid?: boolean;
}

const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const [validationMessage, setValidationMessage] = useState("");
  const [isValid, setIsValid] = useState(true);

  const togglePasswordVisibility = () => {
    setPasswordVisibility((isPasswordVisiblePrev) => !isPasswordVisiblePrev);
  };

  const validateInput = (input: string) => {
    if (props.validationRegex) {
      const isValid = props.validationRegex.test(input);
      setIsValid(isValid);
      if (!isValid) {
        setValidationMessage(props.errorMessage ?? "");
      } else {
        setValidationMessage("");
      }
    }
  };

  return (
    <View>
      <View>
        <TextInput
          style={[
            props.style,
            styles.textInput,
            {
              borderColor: isValid ? primary.grayD7 : primary.red,
            },
          ]}
          onChangeText={(text) => {
            props.onChangeText(text);
            validateInput(text);
          }}
          autoCapitalize="none"
          value={props.value}
          onEndEditing={() => validateInput(props.value)}
          secureTextEntry={props.isPassword && !isPasswordVisible}
        />
        {props.isPassword && (
          <View style={styles.passwordImageStyle}>
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <SeePassword width={20} height={20} />
            </TouchableOpacity>
          </View>
        )}
        <Text
          style={[
            styles.labelStyle,
            { color: isValid ? primary.grayA3 : primary.red },
          ]}
        >
          {props.label}
        </Text>
      </View>
      <Text style={styles.errorStyle}>{validationMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorStyle: {
    color: primary.red,
    marginHorizontal: paddings.padding_16,
    alignSelf: "flex-end",
  },
  passwordImageStyle: {
    right: 0,
    marginTop: paddings.padding_20,
    marginEnd: paddings.padding_30,
    position: "absolute",
  },
  textInput: {
    ...generalStyles.fontStyle,
    height: 48,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: paddings.padding_10,
    marginHorizontal: paddings.padding_16,
    fontSize: 16,
    textDecorationLine: "none",
  },
  labelStyle: {
    marginHorizontal: paddings.padding_30,
    backgroundColor: primary.white,
    position: "absolute",
    fontSize: 16,
    paddingHorizontal: paddings.padding_8,
  },
});

export default AppTextInput;
