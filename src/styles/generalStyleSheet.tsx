import { StyleSheet } from "react-native";

export const generalStyles = StyleSheet.create({
  loadingStyle: {
    flex: 1,
    backgroundColor: "red",
    justifyContent: "center", // Center vertically
    alignItems: "center", // Center horizontally
  },
  fontStyle: {
    fontSize: 14,
    fontWeight: "bold",
    marginHorizontal: 16,
    marginVertical: 8,
    fontFamily: "Lato, sans-serif",
  },
});
