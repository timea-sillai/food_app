import React from "react";
import {
  TouchableOpacity,
  View,
  Image,
  Text,
  StyleSheet,
  GestureResponderEvent,
} from "react-native";
import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";
import { generalStyles } from "../styles/generalStyleSheet";
import AddToFavourites, { FavouritesDetails } from "./AddToFavourites";

interface MealLargeContainerProps {
  onContainerClicked: (event: GestureResponderEvent) => void;
  imageUrl: string;
  title: string;
  id: string;
  showFavourites?: boolean;
  doAfterRemoveFromfavourites?: () => void;
}

const MealLargeContainer: React.FC<MealLargeContainerProps> = (props) => {
  const mealDetails: FavouritesDetails = {
    strMealThumb: props.imageUrl,
    strMeal: props.title,
    idMeal: props.id,
  };

  return (
    <TouchableOpacity activeOpacity={0.8} onPress={props.onContainerClicked}>
      <View style={styles.itemStyle}>
        <View style={styles.imageViewStyle}>
          <Image
            source={{ uri: props.imageUrl }}
            style={styles.imageStyle}
            resizeMode="cover"
          />
          {props.showFavourites && (
            <AddToFavourites
              meal={mealDetails}
              style={styles.favourites}
              doAfterRemoveFromFavourites={() =>
                props.doAfterRemoveFromfavourites &&
                props.doAfterRemoveFromfavourites()
              }
            />
          )}
        </View>
        <Text style={styles.mealText}>{props.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  imageViewStyle: {
    flex: 1,
    width: "100%",
  },
  textStyle: {
    fontSize: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    height: 110,
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
  },
  itemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: paddings.padding_16,
    marginVertical: paddings.padding_8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: primary.search_bar_border_color,
    backgroundColor: primary.light_green,
    elevation: 2,
  },
  mealText: {
    ...generalStyles.fontStyle,
    fontSize: 20,
  },
  favourites: {
    position: "absolute",
    padding: paddings.padding_10,
    backgroundColor: "white",
    elevation: 2,
    margin: 8,
    right: 0,
    borderRadius: 90,
  },
});
export default MealLargeContainer;
