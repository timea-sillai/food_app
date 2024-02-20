import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Categories from "../components/Categories";
import { useTranslation } from "react-i18next";
import { generalStyles } from "../styles/generalStyleSheet";

export default function CategoriesScreen() {
  return (
    <View style={styles.mainViewStyle}>
      <Image
        source={require("../../assets/images/background_image.png")}
        style={generalStyles.backgroundStyle}
      />
      <Categories />
    </View>
  );
}

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
});
