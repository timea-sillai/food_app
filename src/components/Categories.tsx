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
import businessManagerService from "../services";
import { paddings } from "../styles/branding";
import { primary } from "../styles/styleGuide";
import { CategoryDetailsNavigationProps } from "../navigation/NavigationTypes";
import { useNavigation } from "@react-navigation/native";
import Loading from "./Loading";
import { useTranslation } from "react-i18next";

const HomeScreenCategories = () => {
  const navigation = useNavigation<CategoryDetailsNavigationProps>();
  const [categories, onChangeCategories] = useState<FetchCategoriesResponse>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { t } = useTranslation();
  const { height } = useWindowDimensions();

  const customStyle = StyleSheet.create({
    listHeaderComponent: {
      height: height * 0.2,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "transparent",
    },
  });

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
      >
        <View
          style={[
            {
              flex: 1,
              width: "100%",
              height: 200,
              alignContent: "center",
              justifyContent: "center",
              backgroundColor: "white",
            },
            styles.container,
            index == 0 ? styles.firstListElementStyle : null,
          ]}
        >
          <View
            style={[
              {
                flex: 1,
                paddingRight: 50,
                alignItems: "center",
              },
              isItemPositionEven
                ? styles.evenListElementStyle
                : styles.oddListElementStyle,
            ]}
          >
            <View
              style={{
                justifyContent: "center",
                alignItems: "center",
                alignSelf: "center",
                width: "100%",
                height: 100,
                position: "absolute",
              }}
            >
              <Image
                source={require("../../assets/images/background_image.png")}
                style={[
                  {},
                  isItemPositionEven
                    ? {
                        borderTopRightRadius: 50,
                        borderBottomRightRadius: 50,
                      }
                    : {
                        borderTopLeftRadius: 50,
                        borderBottomLeftRadius: 50,
                      },
                  styles.categoryBackgroundStyle,
                ]}
              />
            </View>
            <View style={[styles.textItemViewStyle]}>
              <Text
                style={[
                  styles.text,
                  {
                    alignSelf: "center",
                  },
                ]}
              >
                {item.strCategory}
              </Text>
            </View>
            <View style={[{ opacity: 1 }, styles.imageContainer]}>
              <Image
                source={{ uri: item.strCategoryThumb }}
                style={styles.image}
              />
            </View>
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
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <View
          style={{
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
          }}
        >
          <Loading />
        </View>
      ) : (
        <FlatList<Category>
          ListHeaderComponent={() => {
            return (
              <View style={customStyle.listHeaderComponent}>
                <Text style={[styles.textStyle]}>{t("categories")}</Text>
              </View>
            );
          }}
          data={categories?.categories}
          renderItem={renderItem}
          keyExtractor={(item) => item.idCategory}
          style={{ elevation: 10 }}
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
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    width: "100%",
    color: primary.black,
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
    marginVertical: 50,
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
});
export default HomeScreenCategories;
