import * as React from "react";
import FavouritesMeals from "../components/FavouritesMeals";
import { generalStyles } from "../styles/generalStyleSheet";

export default function UserRecipesScreen() {
  return <FavouritesMeals style={generalStyles.mainViewStyle} />;
}
