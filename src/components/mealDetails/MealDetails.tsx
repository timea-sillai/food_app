import { useTranslation } from "react-i18next";
import { Text, View, Linking, StyleSheet } from "react-native";
import { Meal } from "../../types/types";
import AddToFavourites from "./AddToFavourites";
import { paddings } from "../../styles/branding";
import { generalStyles } from "../../styles/generalStyleSheet";
import { primary } from "../../styles/styleGuide";

interface MealDetailsViewProps {
  mealDetails: Meal | undefined;
  isLoading: boolean;
}
interface DetailsProps {
  mealDetails: Meal | undefined;
}
interface DisplayInformation {
  header: string;
  content: string | undefined;
}
interface VideoDetailsProps {
  videoUrl: string | undefined;
}

const MealDetailsView: React.FC<MealDetailsViewProps> = (props) => {
  const mealDetails = props.mealDetails;
  const Details: React.FC<DetailsProps> = (props) => {
    const mealDetails = props.mealDetails;
    const { t } = useTranslation();

    const headers: DisplayInformation[] = [
      {
        header: t("instructions"),
        content: mealDetails?.strInstructions,
      },
      {
        header: t("category"),
        content: mealDetails?.strCategory,
      },
      {
        header: t("originalCountry"),
        content: mealDetails?.strArea,
      },
      {
        header: t("keyWords"),
        content: mealDetails?.strTags,
      },
    ];

    return (
      <>
        <Text style={styles.subtitle}>{mealDetails?.strMeal}</Text>
        {headers.map((item, index) => (
          <View key={index}>
            {item.content && (
              <>
                <Text style={styles.headerTitle}>{item.header}</Text>
                <Text style={styles.contentText}>{item.content}</Text>
              </>
            )}
          </View>
        ))}
      </>
    );
  };

  const VideoDetails: React.FC<VideoDetailsProps> = (props) => {
    const { t } = useTranslation();
    return (
      <>
        <Text style={styles.headerTitle}>{t("video")}</Text>
        <Text
          style={extendedStyles.hyperLink}
          onPress={() => props.videoUrl && Linking.openURL(props.videoUrl)}
        >
          {props.videoUrl}
        </Text>
      </>
    );
  };

  return (
    <View style={styles.mainView}>
      <View style={styles.favouritesStyle}>
        <AddToFavourites />
      </View>
      <Details mealDetails={mealDetails} />
      <VideoDetails videoUrl={mealDetails?.strYoutube} />
    </View>
  );
};

export default MealDetailsView;

const styles = StyleSheet.create({
  subtitle: {
    ...generalStyles.fontStyle,
    marginVertical: 0,
    fontSize: 20,
    paddingTop: paddings.padding_16,
  },
  headerTitle: {
    ...generalStyles.fontStyle,
    marginVertical: 0,
    marginTop: paddings.padding_8,
    fontSize: 16,
  },
  contentText: {
    marginHorizontal: paddings.padding_16,
    color: primary.gray,
    fontSize: 16,
  },
  mainView: {
    flex: 1,
    backgroundColor: primary.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 2,
    paddingBottom: paddings.padding_30,
  },
  favouritesStyle: {
    margin: paddings.padding_30,
    alignItems: "flex-end",
  },
  imageContainer: {
    alignSelf: "center",
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
});

const extendedStyles = StyleSheet.create({
  hyperLink: {
    ...styles.contentText,
    color: primary.blue,
  },
});
