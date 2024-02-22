import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import Constants from "../utils/constants";
import { generalStyles } from "../styles/generalStyleSheet";
import mealService from "../services";
import Loading from "./Loading";
import { Meal } from "../types/types";
import { MealDetailsNavigationProps } from "../navigation/NavigationTypes";

const RandomMealsList = () => {
  const [ramdomMeals, onChangeRandomMeals] = useState<Set<Meal>>(new Set());
  const [isLoading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();
  const navigation = useNavigation<MealDetailsNavigationProps>();

  const onRandomMealClicked = (id: string) => {
    navigation.navigate("MealDetails", {
      mealId: id,
    });
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => onRandomMealClicked(item.idMeal)}
    >
      <View style={styles.itemStyle}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.imageStyle}
          resizeMode="cover"
        />
        <Text style={textStyle.mealText}>{item.strMeal}</Text>
      </View>
    </TouchableOpacity>
  );

  const getRandomMeals = async () => {
    try {
      setLoading(true);
      const meals: Set<Meal> = await mealService.fetchRandomMeals(
        Constants.RANDOM_MEALS_SIZE
      );
      onChangeRandomMeals(meals);
    } catch (e) {
      console.error("[ CATEGORIES]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMeals();
  }, [isFocused]);

  return (
    <View style={styles.mainViewStyle}>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList<Meal>
          data={Array.from(ramdomMeals)}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

export default RandomMealsList;

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
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
  imageStyle: {
    flex: 1,
    width: "100%",
    height: 110,
  },
  textStyle: {
    fontSize: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

const textStyle = StyleSheet.create({
  mealText: {
    ...generalStyles.fontStyle,
    ...styles.textStyle,
  },
});
