import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

export type MainParamList = {
  TabNavigator: {};
  CategoryDetails: {
    categoryName: string;
  };
  MealDetails: {
    mealId: string;
  };
  Login: {};
};

export type BottomTabParamList = {
  Home: {};
  Profile: {};
  Categories: {};
  Search: {};
  Recipes: {};
};

//TabNavigator
export type TabNavigatorProps = StackNavigationProp<
  MainParamList,
  "TabNavigator"
>;
export type TabNavigatorRouteProps = RouteProp<MainParamList, "TabNavigator">;

//LoginScreen
export type LoginScreenNavigationProps = StackNavigationProp<
  MainParamList,
  "Login"
>;
export type LoginScreenRouteProps = RouteProp<MainParamList, "Login">;

//MealDetails
export type MealDetailsNavigationProps = StackNavigationProp<
  MainParamList,
  "MealDetails"
>;
export type MealDetailsRouteProps = RouteProp<MainParamList, "MealDetails">;
export type MealDetailsProps = {
  route: MealDetailsRouteProps;
  navigation: MealDetailsNavigationProps;
};

//CategoryDetails
export type CategoryDetailsNavigationProps = StackNavigationProp<
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
export type HomeScreenNavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Home"
>;
export type HomeScreenRouteProps = RouteProp<BottomTabParamList, "Home">;
export type HomeScreenProps = {
  route: HomeScreenRouteProps;
  navigation: HomeScreenNavigationProps;
};

//ProfileScreen
export type ProfileScreenNavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Profile"
>;
export type ProfileScreenRouteProps = RouteProp<BottomTabParamList, "Profile">;

//CategoriesScreen
export type CategoriesScreenNavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Categories"
>;
export type CategoriesScreenRouteProps = RouteProp<
  BottomTabParamList,
  "Categories"
>;

//SearchScreen
export type SearchScreenNavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Search"
>;
export type SearchScreenRouteProps = RouteProp<BottomTabParamList, "Search">;

//RecipesScreen
export type RecipesNavigationProps = BottomTabNavigationProp<
  BottomTabParamList,
  "Recipes"
>;
export type RecipesScreenRouteProps = RouteProp<BottomTabParamList, "Recipes">;
