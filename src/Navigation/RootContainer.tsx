import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./navigationTypes";
import HomeScreen from "../pages/HomeScreen";
import CategoriesScreen from "../pages/CategoriesScreen";
import SearchScreen from "../pages/SearchScreen";
import UserRecipesScreen from "../pages/UserRecipesScreen";
import ProfileScreen from "../pages/ProfileScreen";
import SignInScreen from "../modules/SignInScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function RootContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={SignInScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Recipes" component={UserRecipesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
