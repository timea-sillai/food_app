import React, { FunctionComponent, useEffect, useState } from "react";
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
import {
  CategoryDetailsNavigationProps,
  HomeScreenProps,
} from "../../navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";

const HomeScreenCategories = () => {
  const navigation = useNavigation<CategoryDetailsNavigationProps>();

  const [categories, onChangeCategories] = useState<
    FetchCategoriesResponse | undefined
  >(undefined);

  const [isLoading, setLoading] = useState<boolean>(false);
  interface FlatListProps {
    item: Category;
    index: number;
  }

  const onCategorySelected = (category: Category) => {
    navigation.navigate("CategoryDetails", {
      categoryName: category.strCategory,
    });
  };

  const renderItem = ({ item, index }: FlatListProps) => {
    const isItemPositionEven = index % 2 === 0;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onCategorySelected(item);
        }}
        style={{ marginLeft: 50, marginRight: 50 }}
      >
        <View
          style={[
            styles.container,
            {
              flexDirection: isItemPositionEven ? "row" : "row-reverse",
              elevation: 10,
            },
          ]}
        >
          <View
            style={[
              styles.textItemViewStyle,
              {
                marginLeft: isItemPositionEven ? 50 : 0,
                marginRight: isItemPositionEven ? 0 : 50,
              },
            ]}
          >
            <CategoryBackground
              style={styles.categoryBackgroundStyle}
              width="100%"
              height="100%"
            ></CategoryBackground>
            <Text
              style={[
                styles.text,
                {
                  marginLeft: isItemPositionEven ? 50 : 0,
                  marginRight: isItemPositionEven ? 0 : 50,
                },
              ]}
            >
              {item.strCategory}
            </Text>
          </View>

          <View style={styles.imageContainer}>
            <Image
              source={{ uri: item.strCategoryThumb }}
              style={styles.image}
            />
          </View>
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
          contentContainerStyle={styles.contentContainer}
          scrollEnabled={false}
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
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    color: primary.black,
    marginTop: 30,
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    overflow: "hidden",
    backgroundColor: primary.white,
    justifyContent: "center",
    alignItems: "center",
    borderColor: primary.greenDO,
    borderWidth: 5,
  },
  contentContainer: {
    paddingTop: 20,
  },
  categoryBackgroundStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    backgroundColor: primary.light_green,
  },
  textItemViewStyle: {
    flex: 1,
    marginVertical: 50,
    zIndex: 0,
    width: "100%",
    height: 100,
    position: "absolute",
    alignContent: "center",
    justifyContent: "center",
  },
});
