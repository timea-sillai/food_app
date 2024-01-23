import * as React from "react";
import { Button, Image, Text, View } from "react-native";
import { HomeScreenProps } from "../navigation/navigationTypes";
import { useDispatch, useSelector } from "react-redux";
import { Category, Meal } from "../types/types";
import { fetchCategories } from "../redux/actions/categoriesActions";
import { fetchRandomMeal } from "../redux/actions/mealsActions";
import { searchMeal } from "../redux/actions/searchActions";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);
  const randomMeal = useSelector((state: any) => state.randomMeal);
  const searchMealResults = useSelector(
    (state: any) => state.searchMealResults
  );

  React.useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchRandomMeal());
    dispatch(searchMeal("Arrabiata"));
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button
        title="Navigate to categories"
        onPress={() => navigation.navigate("Categories", {})}
      ></Button>
    </View>
  );
};

export default HomeScreen;
