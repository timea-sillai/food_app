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
      <View>
        {categories?.loading ? (
          <Text>Loading...</Text>
        ) : categories?.error ? (
          <Text>Error</Text>
        ) : (
          categories?.categories?.map((category: Category, index: number) => (
            <View key={index}>
              <Text> {category.strCategory}</Text>
              <Image
                style={{ width: "100%", height: "20%" }}
                source={{
                  uri: category.strCategoryThumb,
                }}
              ></Image>
            </View>
          ))
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
