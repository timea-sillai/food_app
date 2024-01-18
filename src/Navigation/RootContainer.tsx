import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./NavigationTypes";
import HomeScreen from "../pages/HomeScreen";
import CategoriesScreen from "../pages/CategoriesScreen";
import SearchScreen from "../pages/SearchScreen";
import UserRecipesScreen from "../pages/UserRecipesScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { Image } from "react-native";

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function RootContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarStyle: {
            backgroundColor: "#40AA54", // Change colors based on the screen name
          },
          tabBarLabelStyle: {
            color: "white", // Change this color to the desired text color
          },
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarLabel: "Profile",
            tabBarIcon: ({ color, size }) => (
              <Image
                source={require("../../assets/images/home.png")}
                style={{ tintColor: color, width: size, height: size }}
              />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen name="Categories" component={CategoriesScreen} />
        <Tab.Screen name="Search" component={SearchScreen} />
        <Tab.Screen name="Recipes" component={UserRecipesScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
