import React, { FunctionComponent, useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { CategoryDetailsProps } from "../navigation/NavigationTypes";
import { FetchRandomMealResponse, Meal } from "../types/types";
import businessManagerService from "../services";
import { FlatList } from "react-native-gesture-handler";
import { primary } from "../styles/styleGuide";
import { dimensions } from "../styles/branding";
import { t } from "i18next";
import { generalStyles } from "../styles/generalStyleSheet";
import { CategoryBackground } from "../utils/svg";
import Categories from "./Categories";

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  route,
  navigation,
}) => {
  const [categoryDetails, onChangeCategoryDetails] =
    useState<FetchRandomMealResponse>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const categoryName = route.params?.categoryName;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    const getCategoryDetails = async () => {
      try {
        setLoading(true);
        const response = await businessManagerService.fetchCategoriesDetailsApi(
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

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity style={styles.renderItemStyle}>
      <Image style={styles.imageStyle} source={{ uri: item.strMealThumb }} />
      <Text numberOfLines={2} style={styles.textStyle}>
        {item.strMeal}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={[generalStyles.mainViewStyle, styles.mainViewStyle]}>
      <ScrollView>
        <CategoryBackground
          style={styles.backgroundStyle}
          width="100%"
          height="200"
        ></CategoryBackground>

        <Text style={[styles.titleStyle]}>{categoryName}</Text>
        <View style={styles.categoriesViewStyle}>
          <FlatList
            data={categoryDetails?.meals}
            renderItem={renderItem}
            keyExtractor={(item) => item.idMeal}
            numColumns={3}
            scrollEnabled={false}
          ></FlatList>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  renderItemStyle: {
    flexDirection: "column",
    margin: 8,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: primary.search_bar_border_color,
    backgroundColor: primary.grey_light,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 10,
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
  mainViewStyle: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  backgroundStyle: {
    position: "absolute",
    backgroundColor: primary.light_green,
    zIndex: 0,
  },
  titleStyle: {
    textAlign: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: 30,
    zIndex: 1,
    color: primary.black,
  },
  categoriesViewStyle: {
    backgroundColor: primary.white,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: 30,
    paddingTop: 20,
    paddingHorizontal: 8,
    elevation: 3,
  },
});
export default CategoryDetails;
