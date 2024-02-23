import { useTranslation } from "react-i18next";
import { useWindowDimensions, View, Image, StyleSheet } from "react-native";
import { paddings } from "../../styles/branding";
import { primary } from "../../styles/styleGuide";
import TransparentToolbar from "../TransparentToolbar";

const MealDetailsBackground = () => {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();
  const title = t("mealDetails");
  return (
    <View>
      <Image
        source={require("../../../assets/images/background_image.png")}
        style={styles.backgroundImageStyle}
      />
      <View
        style={{
          marginTop: paddings.padding_30,
          marginBottom: height * 0.2,
        }}
      >
        <TransparentToolbar
          showBackButton={true}
          title={title}
        ></TransparentToolbar>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  backgroundImageStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    backgroundColor: primary.light_green,
  },
});

export default MealDetailsBackground;
