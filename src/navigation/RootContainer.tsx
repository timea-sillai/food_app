import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import { StyleSheet, Text } from "react-native";
import CategoryDetails from "../components/CategoryDetails";
import MealDetails from "../components/mealDetails";
import CategoriesScreen from "../pages/CategoriesScreen";
import HomeScreen from "../pages/HomeScreen";
import ProfileScreen from "../pages/ProfileScreen";
import UserRecipesScreen from "../pages/UserRecipesScreen";
import { primary } from "../styles/styleGuide";
import { Bag, Category, Home, Profile } from "../utils/svg";
import { BottomTabParamList, MainParamList } from "./NavigationTypes";
import LoginScreen from "../pages/LoginScreen";
import RegistrationScreen from "../pages/RegistrationScreen";

const Tab = createBottomTabNavigator<BottomTabParamList>();
const Stack = createStackNavigator<MainParamList>();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: styles.tabBarStyle,
        tabBarLabelStyle: styles.tabBarLabelStyle,
        tabBarLabel: ({ focused }) => tabBarLabel(focused, route.name),
        tabBarHideOnKeyboard: true,
      })}
    >
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: () => <Home width={25} height={25} />,
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="Categories"
        options={{
          tabBarIcon: ({ focused }) => (
            <Category width={20} height={20}></Category>
          ),
        }}
        component={CategoriesScreen}
      />
      <Tab.Screen
        name="Recipes"
        options={{
          tabBarIcon: () => <Bag width={25} height={25}></Bag>,
        }}
        component={UserRecipesScreen}
      />
      <Tab.Screen
        name="Profile"
        options={{
          tabBarIcon: () => <Profile width={20} height={20}></Profile>,
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
};
const tabBarLabel = (focused: boolean, name: string, icon?: string) => {
  return focused ? <Text style={styles.tabLabelStyle}>{name}</Text> : null;
};

export default function RootContainer() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: primary.light_green,
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TabNavigator"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="MealDetails" component={MealDetails} />
      </Stack.Navigator>
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
