import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./NavigationTypes";
import HomeScreen from "../Containters/Pages/HomeScreen";
import CategoriesScreen from "../Containters/Pages/CategoriesScreen";
import SearchScreen from "../Containters/Pages/SearchScreen";
import UserRecipesScreen from "../Containters/Pages/UserRecipesScreen";
import ProfileScreen from "../Containters/Pages/ProfileScreen";
import Home from "../Containters/Home";
const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function RootContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Recipes" component={UserRecipesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
