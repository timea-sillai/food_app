import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View, ViewStyle } from "react-native";
import asyncStorage from "../storage";
import { generalStyles } from "../styles/generalStyleSheet";
import { primary } from "../styles/styleGuide";
import { Meal } from "../types/types";
import MealLargeContainerList from "./MealLargeContainerList";

interface FavouritesMealsProps {
  style?: ViewStyle;
}

const FavouritesMeals: React.FC<FavouritesMealsProps> = (props) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const [favouritesMeals, onChangeMeals] = useState<Meal[]>([]);
  const isFocused = useIsFocused();

  const getFavourites = async () => {
    try {
      setLoading(true);
      const meals: Meal[] = await asyncStorage.getFavourites();
      onChangeMeals(meals);
    } catch (e) {
      console.error("[ Favourites Meals ]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getFavourites();
  }, [isFocused]);

  return (
    <View style={props.style}>
      {favouritesMeals.length == 0 ? (
        <View style={styles.centerView}>
          <Text style={styles.emptyListMessage}>
            {t("noFavouritesMessage")}
          </Text>
        </View>
      ) : (
        <MealLargeContainerList
          isLoading={isLoading}
          meals={favouritesMeals}
          useHeader={true}
          headerTitle={t("favourites")}
          showFavourites={true}
          refreshList={getFavourites}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  centerView: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  emptyListMessage: {
    ...generalStyles.fontStyle,
    textAlign: "center",
    padding: 100,
    borderRadius: 10,
    backgroundColor: primary.white,
    alignContent: "center",
  },
});
export default FavouritesMeals;
