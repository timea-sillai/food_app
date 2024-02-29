import * as React from "react";
import FavouritesMeals from "../components/FavouritesMeals";
import { View } from "react-native";
import { generalStyles } from "../styles/generalStyleSheet";
import TransparentToolbar from "../components/TransparentToolbar";

export default function UserRecipesScreen() {
  return (
    <View style={generalStyles.mainViewStyle}>
      <FavouritesMeals />
    </View>
  );
}
