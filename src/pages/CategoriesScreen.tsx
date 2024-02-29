import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import Categories from "../components/Categories";
import { useTranslation } from "react-i18next";
import { generalStyles } from "../styles/generalStyleSheet";

export default function CategoriesScreen() {
  return (
    <View style={generalStyles.mainViewStyle}>
      <Categories />
    </View>
  );
}
