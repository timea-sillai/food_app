import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Category, FetchCategoriesResponse } from "../types/types";
import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";
import { generalStyles } from "../styles/generalStyleSheet";
import mealService from "../services";
import Loading from "./Loading";

const HomeScreenCategories = () => {
  const [categories, onChangeCategories] = useState<FetchCategoriesResponse>();
  const [isLoading, setLoading] = useState<boolean>(false);

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.itemStyle}>
      <TouchableOpacity>
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
      <Text style={[styles.renderItemTextStyle, generalStyles.fontStyle]}>
        {item.strCategory}
      </Text>
    </View>
  );

  useEffect(() => {
    const getCategories = async () => {
      try {
        setLoading(true);
        const response = await mealService.fetchCategoriesApi();
        onChangeCategories(response);
      } catch (e) {
        console.error("[ CATEGORIES]", e);
      } finally {
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  return (
    <View>
      <Text style={generalStyles.fontStyle}>Categories</Text>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList<Category>
          data={categories?.categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
          horizontal={true}
        />
      )}
    </View>
  );
};

export default HomeScreenCategories;

const styles = StyleSheet.create({
  itemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: paddings.padding_8,
  },
  imageStyle: {
    width: 74,
    height: 63,
    elevation: 1,
    backgroundColor: primary.light_green,
    borderRadius: 5,
  },
  renderItemTextStyle: {
    backgroundColor: primary.white,
  },
});
