import * as React from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import { HomeScreenProps } from "../navigation/navigationTypes";
import SearchBar from "../components/SearchBar";
import { primary } from "../styles/styleGuide";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <View style={style.mainViewStyle}>
      <View style={style.searhViewStyle}>
        <SearchBar></SearchBar>
      </View>

      <View style={{ marginTop: 100 }}></View>
      <Text>Categories</Text>
    </View>
  );
};

const style = StyleSheet.create({
  searhViewStyle: {
    ...StyleSheet.absoluteFillObject,
    marginVertical: 30,
    marginHorizontal: 10,
    zIndex: 2,
  },
  mainViewStyle: {
    flex: 1,
    marginTop: Platform.OS === "ios" ? 30 : 0,
    backgroundColor: primary.light_green,
  },
});
export default HomeScreen;
