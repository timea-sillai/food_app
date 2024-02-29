import React, { FunctionComponent, useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { CategoryDetailsProps } from "../navigation/NavigationTypes";
import mealService from "../services";
import { paddings } from "../styles/branding";
import { generalStyles } from "../styles/generalStyleSheet";
import { primary } from "../styles/styleGuide";
import { FetchMealResponse, Meal } from "../types/types";
import Loading from "./Loading";
import ListHeader from "./ListHeader";

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  route,
  navigation,
}) => {
  const [categoryDetails, onChangeCategoryDetails] =
    useState<FetchMealResponse>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const categoryName = route.params?.categoryName;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    const getCategoryDetails = async () => {
      try {
        setLoading(true);
        const response = await mealService.fetchCategoriesDetailsApi(
          categoryName
        );
        onChangeCategoryDetails(response);
      } catch (e) {
        console.error("Error while fetching categories details", e);
      } finally {
        setLoading(false);
      }
    };
    getCategoryDetails();
  }, []);

  const onMealClicked = (id: string) => {
    navigation.navigate("MealDetails", {
      mealId: id,
    });
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.renderItemStyle}
      onPress={() => onMealClicked(item.idMeal)}
    >
      <Image style={styles.imageStyle} source={{ uri: item.strMealThumb }} />
      <Text numberOfLines={2} style={styles.textStyle}>
        {item.strMeal}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={generalStyles.mainViewStyle}>
      <View style={styles.categoriesViewStyle}>
        {isLoading ? (
          <Loading style={styles.loadingStyle} />
        ) : (
          <FlatList
            ListHeaderComponent={() => {
              return (
                <ListHeader categoryName={categoryName} showBackButton={true} />
              );
            }}
            data={categoryDetails?.meals}
            renderItem={renderItem}
            keyExtractor={(item) => item.idMeal}
            numColumns={3}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  renderItemStyle: {
    flexDirection: "column",
    margin: paddings.padding_8,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: primary.search_bar_border_color,
    backgroundColor: primary.white,
    borderWidth: 1,
    paddingHorizontal: paddings.padding_10,
    paddingVertical: paddings.padding_10,
    width: "30%",
    height: 180,
  },
  imageStyle: {
    width: "100%",
    height: "80%",
  },
  textStyle: {
    width: "100%",
    height: "100%",
    fontWeight: "bold",
    color: primary.black,
  },
  backgroundStyle: {
    position: "absolute",
    backgroundColor: primary.light_green,
    zIndex: 0,
  },
  categoriesViewStyle: {
    flex: 1,
    backgroundColor: primary.white,
  },
  loadingStyle: {
    backgroundColor: primary.white,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default CategoryDetails;
