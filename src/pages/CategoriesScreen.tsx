import * as React from "react";
import { StyleSheet, Text, View } from "react-native";
import Categories from "../components/categoriesScreen/Categories";
import { primary } from "../styles/styleGuide";
import { useTranslation } from "react-i18next";
import { CategoryBackground } from "../utils/svg";
import { dimensions } from "../styles/branding";
import { generalStyles } from "../styles/generalStyleSheet";

export default function CategoriesScreen() {
  const { t } = useTranslation();
  return (
    <View style={[generalStyles.mainViewStyle, styles.mainViewStyle]}>
      <CategoryBackground
        style={styles.backgroundStyle}
        width="100%"
        height="30%"
      ></CategoryBackground>

      <Text style={[styles.textStyle]}>{t("categories")}</Text>
      <View style={styles.categoriesViewStyle}>
        <Categories></Categories>
      </View>
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
    zIndex: 0,
  },
  textStyle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 30,
    zIndex: 1,
    color: primary.black,
  },
  categoriesViewStyle: {
    backgroundColor: primary.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    marginTop: 30,
    elevation: 3,
  },
});
