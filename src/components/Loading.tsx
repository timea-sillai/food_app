import React from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";

const Loading = () => {
  return (
    <View style={style.mainViewStyle}>
      <ActivityIndicator
        style={style.indicatorStyle}
        size={30}
        color={primary.green}
      />
    </View>
  );
};

const style = StyleSheet.create({
  mainViewStyle: {
    justifyContent: "center",
    alignContent: "center",
  },
  indicatorStyle: {
    width: "100%",
  },
});
export default Loading;
