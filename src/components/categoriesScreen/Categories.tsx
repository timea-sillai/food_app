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
import { CategoryBackground } from "../../utils/svg";

const onClick = () => {};

const HomeScreenCategories = () => {
  const [categories, onChangeCategories] = useState<
    FetchCategoriesResponse | undefined
  >(undefined);
  const [isLoading, setLoading] = useState<boolean>(false);

  interface FlatListProps {
    item: Category;
    index: number;
  }

  const renderItem = ({ item, index }: FlatListProps) => {
    const isItemPositionEven = index % 2 === 0;
    return (
      <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
        <View
          style={[
            styles.container,
            {
              flexDirection: isItemPositionEven ? "row" : "row-reverse",
              borderTopLeftRadius: isItemPositionEven ? 0 : 75,
              borderBottomLeftRadius: isItemPositionEven ? 0 : 75,
              borderTopRightRadius: isItemPositionEven ? 75 : 0,
              borderBottomRightRadius: isItemPositionEven ? 75 : 0,
            },
          ]}
        >
          <Text style={styles.text}>{item.strCategory}</Text>
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={styles.image}
            />
          </View>
          <CategoryBackground
            style={{ position: "absolute", top: 0, left: 0 }}
            width="100%"
            height="100%"
          ></CategoryBackground>
        </View>
      </TouchableOpacity>
    );
  };

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
  container: {
    flex: 1,
    flexDirection: "row-reverse",
    alignItems: "center",
    margin: 10,
    backgroundColor: primary.light_green,
  },
  text: {
    flex: 1,
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageContainer: {
    width: 150, // Adjust as needed
    height: 150, // Adjust as needed
    borderRadius: 75, // Half of width and height to make it circular
    overflow: "hidden", // This ensures the image is clipped to the rounded shape
    backgroundColor: primary.white,
    justifyContent: "center",
    alignItems: "center",
    borderColor: primary.search_bar_border_color,
    borderWidth: 5,
  },
});
