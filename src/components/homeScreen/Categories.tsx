import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Category, FetchCategoriesResponse } from "../../types/types";
import businessManagerService from "../../services";
import { dimensions } from "../../styles/branding";
import { primary } from "../../styles/styleGuide";
import { generalStyles } from "../../styles/generalStyleSheet";
import { useTranslation } from "react-i18next";

const onClick = () => {};

const HomeScreenCategories = () => {
  const { t } = useTranslation();
  const [categories, onChangeCategories] = useState<
    FetchCategoriesResponse | undefined
  >(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.itemStyle}>
      <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
      <Text
        style={[{ backgroundColor: primary.white }, generalStyles.fontStyle]}
      >
        {item.strCategory}
      </Text>
    </View>
  );

  const getCategories = async () => {
    try {
      setLoading(true);
      const response = await businessManagerService.fetchCategoriesApi();
      onChangeCategories(response);
    } catch (e) {
      console.error("[ CATEGORIES]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <View>
      <Text style={generalStyles.fontStyle}>{t("categories")}</Text>
      {isLoading ? (
        <View style={generalStyles.loadingStyle}>
          <ActivityIndicator
            size={dimensions.loadingSize}
            color={primary.green}
          />
        </View>
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
    marginHorizontal: 8,
  },
  imageStyle: {
    width: 74,
    height: 63,
    backgroundColor: primary.light_green,
    borderRadius: 5,
  },
  contentContainer: {
    paddingStart: 10,
  },
});
