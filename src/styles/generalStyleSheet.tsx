import { Platform, StyleSheet } from "react-native";
import { primary } from "./styleGuide";
import { dimensions } from "./branding";

export const generalStyles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center",
    alignItems: "center",
  },
  fontStyle: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 8,
    color: primary.black,
    fontFamily: "Lato, sans-serif",
  },
  mainViewStyle: {
    marginTop: Platform.OS === "ios" ? 30 : 0,
    backgroundColor: primary.light_green,
  },
});
