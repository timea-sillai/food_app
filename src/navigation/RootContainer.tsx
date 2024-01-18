import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabParamList } from "./NavigationTypes";
import HomeScreen from "../pages/HomeScreen";
import CategoriesScreen from "../pages/CategoriesScreen";
import SearchScreen from "../pages/SearchScreen";
import UserRecipesScreen from "../pages/UserRecipesScreen";
import ProfileScreen from "../pages/ProfileScreen";
import { Image, StyleSheet, Text } from "react-native";
import { primary } from "../styles/styleGuide";

const Tab = createBottomTabNavigator<BottomTabParamList>();
const tabBarLabel = (focused: boolean, name: string, icon?: string) => {
  return focused ? <Text style={styles.tabLabelStyle}>{name}</Text> : null;
};

export default function RootContainer() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarStyle: styles.tabBarStyle,
          tabBarLabelStyle: styles.tabBarLabelStyle,
          tabBarLabel: ({ focused }) => tabBarLabel(focused, route.name),
        })}
      >
        <Tab.Screen
          name="Home"
          options={{
            tabBarIcon: () => (
              <Image source={require("../../assets/images/home.png")} />
            ),
          }}
          component={HomeScreen}
        />
        <Tab.Screen
          name="Categories"
          options={{
            tabBarIcon: ({ focused }) => (
              <Image source={require("../../assets/images/category.png")} />
            ),
          }}
          component={CategoriesScreen}
        />
        <Tab.Screen
          name="Search"
          options={{
            tabBarIcon: () => (
              <Image source={require("../../assets/images/search.png")} />
            ),
          }}
          component={SearchScreen}
        />
        <Tab.Screen
          name="Recipes"
          options={{
            tabBarIcon: () => (
              <Image source={require("../../assets/images/bag.png")} />
            ),
          }}
          component={UserRecipesScreen}
        />
        <Tab.Screen
          name="Profile"
          options={{
            tabBarIcon: () => (
              <Image source={require("../../assets/images/profile.png")} />
            ),
          }}
          component={ProfileScreen}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: primary.green,
  },
  tabBarLabelStyle: {
    color: primary.white,
  },
  tabLabelStyle: {
    color: primary.white,
    fontSize: 12,
  },
  tabImageStyle: {
    width: 40,
    height: 40,
  },
});
