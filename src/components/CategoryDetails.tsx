import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CategoryDetailsProps } from "../navigation/NavigationTypes";
import { FetchRandomMealResponse, Meal } from "../types/types";
import businessManagerService from "../services";
import { FlatList } from "react-native-gesture-handler";
import { primary } from "../styles/styleGuide";
import { generalStyles } from "../styles/generalStyleSheet";
import LinearGradient from "react-native-linear-gradient";
import Loading from "./Loading";

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
      <View style={styles.categoriesViewStyle}>
        {isLoading ? (
          <View
            style={{
              backgroundColor: primary.white,
              width: "100%",
              height: "100%",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Loading />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={() => {
              return (
                <LinearGradient
                  colors={[
                    "rgba(0,0,0,0)",
                    "rgba(0,0,0,0)",
                    "rgba(128,128,128,0.1)",
                  ]}
                  style={{ flex: 1, width: "100%", height: 120 }}
                  start={{ x: 1, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Text style={styles.titleStyle}>{categoryName}</Text>
                  <Image
                    source={require("../../assets/images/background_image.png")}
                    style={{
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      zIndex: -1,
                      borderWidth: 1,
                      backgroundColor: primary.light_green,
                    }}
                  />

                  <View
                    style={{
                      backgroundColor: primary.white,
                      width: "100%",
                      height: 20,
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      borderTopLeftRadius: 50,
                      borderTopRightRadius: 50,
                    }}
                  ></View>
                </LinearGradient>
              );
            }}
            data={categoryDetails?.meals}
            renderItem={renderItem}
            keyExtractor={(item) => item.idMeal}
            numColumns={3}
          ></FlatList>
        )}
      </View>
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
    backgroundColor: primary.white,
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
    zIndex: 1,
    marginTop: 30,
    color: primary.black,
  },
  categoriesViewStyle: {
    flex: 1,
    backgroundColor: primary.white,
  },
});
export default CategoryDetails;
