import React from "react";
import { StyleSheet, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { primary } from "../styles/styleGuide";
import { generalStyles } from "../styles/generalStyleSheet";
import { paddings } from "../styles/branding";

interface GreenButtonProps {
  inputText: string;
  action: () => void;
}

const GreenButton: React.FC<GreenButtonProps> = (props) => {
  return (
    <TouchableOpacity style={styles.button} onPress={props.action}>
      <Text style={styles.textStyle}>{props.inputText}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: primary.green,
    borderRadius: 5,
    marginVertical: paddings.padding_10,
    marginHorizontal: paddings.padding_16,
    color: primary.white,
  },
  textStyle: {
    ...generalStyles.fontStyle,
    fontSize: 16,
    color: primary.white,
    textTransform: "uppercase",
    textAlign: "center",
  },
});

export default GreenButton;
