import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  useWindowDimensions,
} from "react-native";
import { Category, FetchCategoriesResponse } from "../types/types";
import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";
import { CategoryDetailsNavigationProps } from "../navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";
import mealService from "../services";

const HomeScreenCategories = () => {
  const navigation = useNavigation<CategoryDetailsNavigationProps>();
  const [categories, onChangeCategories] = useState<FetchCategoriesResponse>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const onCategorySelected = (category: Category) => {
    navigation.navigate("CategoryDetails", {
      categoryName: category.strCategory,
    });
  };

  interface RenderCategoryItem {
    item: Category;
    index: number;
  }

  const renderItem = ({ item, index }: RenderCategoryItem) => {
    const isItemPositionEven = index % 2 === 0;
    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => {
          onCategorySelected(item);
        }}
        style={[
          styles.container,
          index == 0 ? styles.firstListElementStyle : null,
        ]}
      >
        <View
          style={[
            styles.innerViewStyle,
            isItemPositionEven
              ? styles.evenListElementStyle
              : styles.oddListElementStyle,
          ]}
        >
          <View style={styles.centerAbsoluteStyle}>
            <Image
              source={require("../../assets/images/background_image.png")}
              style={[
                isItemPositionEven
                  ? styles.evenPositionListElementStyle
                  : styles.oddPositionListElementStyle,
                styles.categoryBackgroundStyle,
              ]}
            />
          </View>
          <View style={styles.textItemViewStyle}>
            <Text style={styles.text}>{item.strCategory}</Text>
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
      const response = await mealService.fetchCategoriesApi();
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
    <View style={styles.mainViewStyle}>
      {isLoading ? (
        <View style={styles.loadingStyle}>
          <Loading />
        </View>
      ) : (
        <FlatList<Category>
          ListHeaderComponent={() => {
            return (
              <View
                style={[
                  {
                    height: height * 0.2,
                  },
                  styles.listHeaderComponent,
                ]}
              >
                <Text style={[styles.textStyle]}>{t("categories")}</Text>
              </View>
            );
          }}
          data={categories?.categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  firstListElementStyle: {
    backgroundColor: primary.white,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    elevation: 2,
    paddingTop: paddings.padding_30,
  },
  itemStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: paddings.padding_16,
    marginVertical: paddings.padding_8,
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
    alignItems: "center",
    width: "100%",
    height: 200,
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    color: primary.black,
    alignSelf: "center",
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
  categoryBackgroundStyle: {
    top: 0,
    left: 0,
    width: "100%",
    height: 100,
    backgroundColor: primary.light_green,
  },
  textItemViewStyle: {
    flex: 1,
    zIndex: 0,
    width: "100%",
    height: 100,
    alignContent: "center",
    justifyContent: "center",
  },
  textStyle: {
    textAlign: "center",
    textAlignVertical: "center",
    alignSelf: "center",
    fontSize: 26,
    fontWeight: "bold",
    marginTop: paddings.padding_30,
    color: primary.black,
  },
  evenListElementStyle: {
    flexDirection: "row",
  },
  oddListElementStyle: {
    flexDirection: "row-reverse",
  },
  evenPositionListElementStyle: {
    borderTopRightRadius: 50,
    borderBottomRightRadius: 50,
  },
  oddPositionListElementStyle: {
    borderTopLeftRadius: 50,
    borderBottomLeftRadius: 50,
  },
  listHeaderComponent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
  innerViewStyle: {
    flex: 1,
    paddingRight: 50,
    alignItems: "center",
  },
  centerAbsoluteStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: "100%",
    height: 100,
    position: "absolute",
  },
  loadingStyle: {
    backgroundColor: primary.white,
    width: "100%",
    height: "80%",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopRightRadius: 50,
    borderTopLeftRadius: 50,
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  mainViewStyle: {
    flex: 1,
  },
});
export default HomeScreenCategories;
