import React, { FunctionComponent, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { CategoryDetailsProps } from "../navigation/NavigationTypes";
import { FetchMealResponse, Meal } from "../types/types";
import { FlatList } from "react-native-gesture-handler";
import { primary } from "../styles/styleGuide";
import { generalStyles } from "../styles/generalStyleSheet";
import LinearGradient from "react-native-linear-gradient";
import Loading from "./Loading";
import mealService from "../services";
import { paddings } from "../styles/branding";

const CategoryDetails: FunctionComponent<CategoryDetailsProps> = ({
  route,
  navigation,
}) => {
  const [categoryDetails, onChangeCategoryDetails] =
    useState<FetchMealResponse>();
  const [isLoading, setLoading] = useState<boolean>(false);
  const categoryName = route.params?.categoryName;

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    const getCategoryDetails = async () => {
      try {
        setLoading(true);
        const response = await mealService.fetchCategoriesDetailsApi(
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

  const onMealClicked = (id: string) => {
    navigation.navigate("MealDetails", {
      mealId: id,
    });
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity
      style={styles.renderItemStyle}
      onPress={() => onMealClicked(item.idMeal)}
    >
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
          <View style={styles.loadingStyle}>
            <Loading />
          </View>
        ) : (
          <FlatList
            ListHeaderComponent={() => {
              return <ListHeader categoryName={categoryName} />;
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
interface ListHeaderProps {
  categoryName: string;
}
const ListHeader: React.FC<ListHeaderProps> = (props) => {
  const gradientColors = ["transparent", primary.shadowColor];
  return (
    <LinearGradient
      colors={gradientColors}
      style={styles.gradientStyle}
      start={{ x: 1, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Text
        style={[
          generalStyles.titleStyle,
          {
            marginTop: paddings.padding_30,
          },
        ]}
      >
        {props.categoryName}
      </Text>
      <Image
        source={require("../../assets/images/background_image.png")}
        style={styles.backgroundImageStyle}
      />

      <View style={styles.topViewStyle}></View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  topViewStyle: {
    backgroundColor: primary.white,
    width: "100%",
    height: paddings.padding_20,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  renderItemStyle: {
    flexDirection: "column",
    margin: paddings.padding_8,
    alignContent: "flex-start",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    borderColor: primary.search_bar_border_color,
    backgroundColor: primary.white,
    borderWidth: 1,
    paddingHorizontal: paddings.padding_10,
    paddingVertical: paddings.padding_10,
    width: "30%",
    height: 180,
  },
  backgroundImageStyle: {
    width: "100%",
    height: "100%",
    position: "absolute",
    zIndex: -1,
    backgroundColor: primary.light_green,
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
  categoriesViewStyle: {
    flex: 1,
    backgroundColor: primary.white,
  },
  loadingStyle: {
    backgroundColor: primary.white,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  gradientStyle: {
    flex: 1,
    width: "100%",
    height: 120,
  },
});

export default CategoryDetails;
