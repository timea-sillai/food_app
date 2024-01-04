import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./NavigationTypes";
import HomeScreen from "../Pages/HomeScreen";
import CategoriesScreen from "../Pages/CategoriesScreen";
import SearchScreen from "../Pages/SearchScreen";
import UserRecipesScreen from "../Pages/UserRecipesScreen";
import ProfileScreen from "../Pages/ProfileScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function RootContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Recipes" component={UserRecipesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
