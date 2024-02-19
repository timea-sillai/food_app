import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Categories from "../components/Categories";
import { primary } from "../styles/styleGuide";
import { useTranslation } from "react-i18next";

export default function CategoriesScreen() {
  const { t } = useTranslation();
  return (
    <View style={{ flex: 1 }}>
      <Image
        source={require("../../assets/images/background_image.png")}
        style={styles.backgroundStyle}
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
  backgroundStyle: {
    position: "absolute",
    backgroundColor: primary.light_green,
  },
});
