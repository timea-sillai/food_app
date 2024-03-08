import React, { useEffect, useState } from "react";

import { useIsFocused } from "@react-navigation/native";
import mealService from "../services";
import { Meal } from "../types/types";
import Constants from "../utils/constants";
import MealLargeContainerList from "./MealLargeContainerList";

const RandomMealsList = () => {
  const [ramdomMeals, onChangeRandomMeals] = useState<Set<Meal>>(new Set());
  const [isLoading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const getRandomMeals = async () => {
    try {
      setLoading(true);
      const meals: Set<Meal> = await mealService.fetchRandomMeals(
        Constants.RANDOM_MEALS_SIZE
      );
      onChangeRandomMeals(meals);
    } catch (e) {
      console.error("[ Random Meals ]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRandomMeals();
  }, [isFocused]);

  return (
    <MealLargeContainerList
      isLoading={isLoading}
      meals={Array.from(ramdomMeals)}
      useHeader={false}
      showFavourites={true}
    />
  );
};

export default RandomMealsList;
