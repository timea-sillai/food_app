import { Image, StyleSheet, Text, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { primary } from "../styles/styleGuide";
import TransparentToolbar from "./TransparentToolbar";
import { generalStyles } from "../styles/generalStyleSheet";
import { paddings } from "../styles/branding";

interface ListHeaderProps {
  categoryName: string;
  showBackButton: boolean;
}

const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const gradientColors = ["transparent", primary.shadowColor];
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradientStyle}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image
        source={require("../../assets/images/background_image.png")}
        style={styles.backgroundImageStyle}
      />
      <View style={styles.toolBarStyle}>
        <TransparentToolbar showBackButton={props.showBackButton} title={""} />
      </View>
      <Text style={styles.textStyle}>{props.categoryName}</Text>
      <View style={styles.topViewStyle}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  toolBarStyle: {
    width: 50,
    height: 40,
    marginVertical: paddings.padding_16,
  },
  textStyle: {
    ...generalStyles.titleStyle,
    width: "100%",
    textAlignVertical: "center",
    alignContent: "center",
  },
  gradientStyle: {
    flex: 1,
    width: "100%",
    height: 200,
  },
  backgroundImageStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: primary.light_green,
  },
  topViewStyle: {
    backgroundColor: primary.white,
    width: "100%",
    height: 30,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
});

export default ListHeader;
