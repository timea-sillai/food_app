import { paddings } from "./branding";
import { Platform, StyleSheet } from "react-native";
import { primary } from "./styleGuide";

export const generalStyles = StyleSheet.create({
  fontStyle: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: paddings.padding_16,
    marginVertical: paddings.padding_8,
    color: primary.black,
    fontFamily: "Lato, sans-serif",
  },
  mainViewStyle: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 30 : 0,
    backgroundColor: primary.light_green,
  },
  backgroundStyle: {
    position: "absolute",
    backgroundColor: primary.light_green,
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    color: primary.black,
  },
});
