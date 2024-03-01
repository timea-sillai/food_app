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
}

const AppTextInput: React.FC<AppTextInputProps> = (props) => {
  const [isPasswordVisible, setPasswordVisibility] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordVisibility((isPasswordVisiblePrev) => !isPasswordVisiblePrev);
  };
  return (
    <View style={{}}>
      <TextInput
        style={[props.style, styles.textInput]}
        onChangeText={props.onChangeText}
        value={props.value}
        secureTextEntry={props.isPassword && !isPasswordVisible}
      />
      {props.isPassword && (
        <View style={styles.passwordImageStyle}>
          <TouchableOpacity onPress={togglePasswordVisibility}>
            <SeePassword width={20} height={20} />
          </TouchableOpacity>
        </View>
      )}
      <Text style={styles.labelStyle}>{props.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  passwordImageStyle: {
    right: 0,
    marginTop: paddings.padding_20,
    marginEnd: paddings.padding_30,
    position: "absolute",
  },
  textInput: {
    ...generalStyles.fontStyle,
    height: 48,
    borderColor: primary.grayD7,
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
    color: primary.grayA3,
    fontSize: 16,
    paddingHorizontal: paddings.padding_8,
  },
});

export default AppTextInput;
