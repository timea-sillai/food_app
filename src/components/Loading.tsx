import React, { CSSProperties } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  StyleProp,
  ViewStyle,
} from "react-native";
import { primary } from "../styles/styleGuide";

interface LoadingInterface {
  style?: ViewStyle;
}

const Loading: React.FC<LoadingInterface> = (props) => {
  return (
    <View style={[style.mainViewStyle, props.style]}>
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
