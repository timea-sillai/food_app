import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackScreenProps } from "@react-navigation/stack";

export type MainParamList = {
  TabNavigator: {};
  CategoryDetails: {
    categoryName: string;
  };
};

export type BottomTabParamList = {
  Home: {};
  Profile: {};
  Categories: {};
  Search: {};
  Recipes: {};
};

//TabNavigator
export type TabNavigatorProps = StackScreenProps<MainParamList, "TabNavigator">;
export type TabNavigatorRouteProps = RouteProp<MainParamList, "TabNavigator">;

//CategoryDetails
export type CategoryDetailsNavigationProps = StackScreenProps<
  MainParamList,
  "CategoryDetails"
>;
export type CategoryDetailsRouteProps = RouteProp<
  MainParamList,
  "CategoryDetails"
>;
export type CategoryDetailsProps = {
  route: CategoryDetailsRouteProps;
  navigation: CategoryDetailsNavigationProps;
};

//HomeScreen
export type HomeScreenNavigationProps = BottomTabScreenProps<
  BottomTabParamList,
  "Home"
>;
export type HomeScreenRouteProps = RouteProp<BottomTabParamList, "Home">;
export type HomeScreenProps = {
  route: HomeScreenRouteProps;
  navigation: HomeScreenNavigationProps;
};

//ProfileScreen
export type ProfileScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Profile"
>;
export type ProfileScreenRouteProps = RouteProp<BottomTabParamList, "Profile">;

//CategoriesScreen
export type CategoriesScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Categories"
>;
export type CategoriesScreenRouteProps = RouteProp<
  BottomTabParamList,
  "Categories"
>;

//SearchScreen
export type SearchScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Search"
>;
export type SearchScreenRouteProps = RouteProp<BottomTabParamList, "Search">;

//RecipesScreen
export type RecipesScreenProps = BottomTabScreenProps<
  BottomTabParamList,
  "Recipes"
>;
export type RecipesScreenRouteProps = RouteProp<BottomTabParamList, "Recipes">;
