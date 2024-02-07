import * as React from "react";
import { StyleSheet, View } from "react-native";
import { HomeScreenProps } from "../navigation/navigationTypes";
import SearchBar from "../components/SearchBar";
import { primary } from "../styles/styleGuide";
import HomeScreenCategories from "../components/homeScreen/Categories";
import RandomMealsList from "../components/homeScreen/RandomMeals";
import { generalStyles } from "../styles/generalStyleSheet";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={[style.mainViewStyle, generalStyles.mainViewStyle]}>
      <View style={style.searchViewStyle}>
        <SearchBar></SearchBar>
      </View>
      <View
        style={{
          backgroundColor: primary.white,
          paddingTop: 16,
          elevation: 2,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          height: "100%",
        }}
      >
        <HomeScreenCategories />
        <RandomMealsList />
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  searchViewStyle: {
    ...StyleSheet.absoluteFillObject,
    marginVertical: 30,
    marginHorizontal: 10,
    zIndex: 2,
    position: "relative",
  },
  mainViewStyle: {
    flex: 1,
  },
  randomMealStyle: {
    justifyContent: "center",
    flex: 1,
    alignContent: "center",
  },
});
export default HomeScreen;
