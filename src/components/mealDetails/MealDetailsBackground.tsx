import { useTranslation } from "react-i18next";
import {
  useWindowDimensions,
  View,
  Image,
  Text,
  StyleSheet,
} from "react-native";
import { paddings } from "../../styles/branding";
import { generalStyles } from "../../styles/generalStyleSheet";
import { primary } from "../../styles/styleGuide";

const MealDetailsBackground = () => {
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  return (
    <View>
      <Image
        source={require("../../../assets/images/background_image.png")}
        style={styles.backgroundImageStyle}
      />
      <Text
        style={[
          generalStyles.titleStyle,
          {
            marginTop: paddings.padding_30,
            marginBottom: height * 0.2,
          },
        ]}
      >
        {t("mealDetails")}
      </Text>
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
