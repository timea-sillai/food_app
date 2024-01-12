import * as React from "react";
import { Button, Text, View } from "react-native";
import { HomeScreenProps } from "../navigation/navigationTypes";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from "../redux/actions/actions";
import { Meal } from "../types/types";

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  const dispatch = useDispatch();
  const categories = useSelector((state: any) => state.categories);

  React.useEffect(() => {
    dispatch(fetchCategories());
  }, []);
  console.log(
    "HERE ",
    categories,
    "Loading",
    categories.loading,
    " Error",
    categories.error
  );
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Home</Text>
      <Button
        title="Navigate to categories"
        onPress={() => navigation.navigate("Categories", {})}
      ></Button>
      <View>
        {categories.loading ? (
          <Text>Loading...</Text>
        ) : categories.error ? (
          <Text>Error</Text>
        ) : (
          categories?.categories?.meals?.map((meal: Meal, index: number) => (
            <Text key={index}>
              {++index}. {meal.strCategory}
            </Text>
          ))
        )}
      </View>
    </View>
  );
};

export default HomeScreen;
