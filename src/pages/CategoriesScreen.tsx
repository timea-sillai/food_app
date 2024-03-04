import * as React from "react";
import { Image, StyleSheet, View } from "react-native";
import { generalStyles } from "../styles/generalStyleSheet";
import HomeScreenCategories from "../components/Categories";

export default function CategoriesScreen() {
  return (
    <View style={generalStyles.mainViewStyle}>
      <HomeScreenCategories />
    </View>
  );
}
