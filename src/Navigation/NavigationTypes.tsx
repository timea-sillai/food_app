import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";

export type BottomTabParamList = {
  Home: {};
  Profile: {};
  Categories: {};
  Search: {};
  Recipes: {};
};

export type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;
export type ProfileScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Profile"
>;
export type CategoriesScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Categories"
>;
export type SearchScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Search"
>;
export type RecipesScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Recipes"
>;
