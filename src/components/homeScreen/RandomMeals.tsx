import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  Image,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { FetchRandomMealResponse, Meal } from "../../types/types";
import businessManagerService from "../../services";
import { dimensions } from "../../styles/branding";
import { primary } from "../../styles/styleGuide";
import { useIsFocused } from "@react-navigation/native";
import Constants from "../../utils/constants";
import { generalStyles } from "../../styles/generalStyleSheet";

const RandomMealsList = () => {
  const [ramdomMeals, onChangeRandomMeals] = useState<Set<Meal>>(new Set());
  const [isLoading, setLoading] = useState<boolean>(false);
  const isFocused = useIsFocused();

  const renderItem = ({ item }: { item: Meal }) => (
    <TouchableOpacity activeOpacity={0.8} onPress={onClick}>
      <View style={styles.itemStyle}>
        <Image
          source={{ uri: item.strMealThumb }}
          style={styles.imageStyle}
          resizeMode="cover"
        ></Image>
        <View style={styles.textViewStyle}>
          <Text style={[generalStyles.fontStyle, styles.textStyle]}>
            {item.strMeal}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const getRandomMeal = async () => {
    try {
      setLoading(true);
      const response: FetchRandomMealResponse =
        await businessManagerService.fetchRandomMealApi();
      response?.meals.map((meal) => {
        onChangeRandomMeals((prevSet) => {
          const newSet = new Set(prevSet);
          newSet.add(meal);
          return newSet;
        });
      });
    } catch (e) {
      console.error("[ CATEGORIES]", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    onChangeRandomMeals(new Set());
    for (let i = 1; i <= Constants.RANDOM_MEALS_SIZE; i++) {
      getRandomMeal();
    }
  }, [isFocused]);

  return (
    <View>
      {isLoading ? (
        <View style={{ flex: 1, padding: 200 }}>
          <ActivityIndicator
            size={dimensions.loadingSize}
            color={primary.green}
          />
        </View>
      ) : (
        <View>
          <FlatList<Meal>
            data={Array.from(ramdomMeals)}
            renderItem={renderItem}
            keyExtractor={(item) => item.idMeal}
            scrollEnabled={false}
          ></FlatList>
        </View>
      )}
    </View>
  );
};

export default RandomMealsList;

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
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  textStyle: {
    fontSize: 20,
  },
  textViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
function onClick(): void {}
