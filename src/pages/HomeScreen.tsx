import * as React from "react";
import { Button, Image, Text, View } from "react-native";
import { HomeScreenProps } from "../navigation/navigationTypes";
import { useDispatch, useSelector } from "react-redux";
import { Category, Meal } from "../types/types";
import { fetchCategories } from "../redux/actions/categoriesActions";
import { fetchRandomMeal } from "../redux/actions/mealsActions";
import { searchMeal } from "../redux/actions/searchActions";
import SearchBar from "../components/SearchBar";
import { primary } from "../styles/styleGuide";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);
  const randomMeal = useSelector((state: any) => state.randomMeal);
  const searchMealResults = useSelector(
    (state: any) => state.searchMealResults
  );

  React.useEffect(() => {
    //dispatch(fetchCategories());
    //dispatch(fetchRandomMeal());
  }, []);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: primary.light_green,
      }}
    >
      <View style={{ marginVertical: 30, marginHorizontal: 10 }}>
        <SearchBar></SearchBar>
      </View>
    </View>
  );
};

export default HomeScreen;
