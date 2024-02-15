import { StyleSheet } from "react-native";
import { paddings } from "./branding";

export const generalStyles = StyleSheet.create({
  fontStyle: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: paddings.padding_16,
    marginVertical: paddings.padding_8,
    fontFamily: "Lato, sans-serif",
  },
});
