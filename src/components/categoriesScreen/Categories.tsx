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

const onClick = () => {};

const HomeScreenCategories = () => {
  const [categories, onChangeCategories] = useState<
    FetchCategoriesResponse | undefined
  >(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);

  const renderItem = ({ item }: { item: Category }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
      <View style={styles.itemStyle}>
        <Image
          source={{ uri: item.strCategoryThumb }}
          style={styles.imageStyle}
          resizeMode="cover"
        ></Image>
        <View style={styles.textViewStyle}>
          <Text style={[generalStyles.fontStyle]}>{item.strCategory}</Text>
        </View>
      </View>
    </TouchableOpacity>
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
      <Text style={generalStyles.fontStyle}>Categories</Text>
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
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: primary.search_bar_border_color,
    backgroundColor: primary.light_green,
  },
  imageStyle: {
    flex: 1,
    width: "100%",
    height: 110,
  },
  textViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
