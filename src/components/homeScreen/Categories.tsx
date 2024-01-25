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

const onClick = () => {
  console.log("CLICK");
};

const HomeScreenCategories = () => {
  const [categories, onChangeCategories] = useState<
    FetchCategoriesResponse | undefined
  >(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);
  const renderItem = ({ item }: { item: Category }) => (
    <View style={styles.itemStyle}>
      <TouchableOpacity onPress={onClick}>
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
    marginHorizontal: 8,
  },
  imageStyle: {
    width: 74,
    height: 63,
    elevation: 1,
    backgroundColor: primary.light_green,
    borderRadius: 5,
  },
});
