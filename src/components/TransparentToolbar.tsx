import React from "react";
import {
  BackHandler,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { generalStyles } from "../styles/generalStyleSheet";
import { Back } from "../utils/svg";
import { useNavigation } from "@react-navigation/native";
import { paddings } from "../styles/branding";

interface TransparentToolbarProps {
  showBackButton: boolean;
  title: string;
}

const TransparentToolbar: React.FC<TransparentToolbarProps> = (props) => {
  const navigation = useNavigation();
  const { width } = useWindowDimensions();
  const onBackPressed = () => {
    navigation.goBack();
  };
  return (
    <View style={style.mainView}>
      {props.showBackButton && (
        <Back
          style={style.buttonStyle}
          width={30}
          height={30}
          onPress={onBackPressed}
        />
      )}
      <Text
        style={[
          style.title,
          {
            paddingEnd: width * 0.2,
          },
        ]}
      >
        {props.title}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  buttonStyle: {
    marginHorizontal: paddings.padding_8,
  },
  mainView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    ...generalStyles.titleStyle,
    alignSelf: "center",
    width: "100%",
  },
});

export default TransparentToolbar;
