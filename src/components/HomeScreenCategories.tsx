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
import { useTranslation } from "react-i18next";
import { CategoryDetailsNavigationProps } from "../navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import mealService from "../services";

const HomeScreenCategories = () => {
  const { t } = useTranslation();
  const [categories, onChangeCategories] = useState<
    FetchCategoriesResponse | undefined
  >(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const navigation = useNavigation<CategoryDetailsNavigationProps>();

  const onCategorySelected = (category: Category) => {
    navigation.navigate("CategoryDetails", {
      categoryName: category.strCategory,
    });
  };

  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.itemStyle}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => onCategorySelected(item)}
      >
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
      <Text style={generalStyles.fontStyle}>{t("categories")}</Text>
      {isLoading ? (
        <Loading />
      ) : (
        <FlatList<Category>
          data={categories?.categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
          horizontal={true}
          contentContainerStyle={styles.contentContainer}
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
    backgroundColor: primary.light_green,
    borderRadius: 5,
  },
  renderItemTextStyle: {
    backgroundColor: primary.white,
    borderRadius: 5,
  },
  contentContainer: {
    paddingStart: 10,
  },
});
