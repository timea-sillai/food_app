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
import { TouchableOpacity } from "react-native-gesture-handler";

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
        <TouchableOpacity onPress={onBackPressed}>
          <Back style={style.buttonStyle} width={30} height={30} />
        </TouchableOpacity>
      )}
      <Text
        style={[
          style.title,
          {
            paddingEnd: props.showBackButton ? width * 0.2 : 0,
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
