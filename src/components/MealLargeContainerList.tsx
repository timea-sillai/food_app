import React from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { useNavigation } from "@react-navigation/native";
import { MealDetailsNavigationProps } from "../navigation/NavigationTypes";
import { primary } from "../styles/styleGuide";
import { Meal } from "../types/types";
import ListHeader from "./ListHeader";
import Loading from "./Loading";
import MealLargeContainer from "./MealLargeContainter";
import { FavouritesDetails } from "./AddToFavourites";

interface MealLargeContainerListProps {
  isLoading: boolean;
  meals: Meal[] | FavouritesDetails[];
  headerTitle?: string;
  useHeader: boolean;
  showFavourites?: boolean;
  refreshList?: () => void;
}

const MealLargeContainerList: React.FC<MealLargeContainerListProps> = (
  props
) => {
  const navigation = useNavigation<MealDetailsNavigationProps>();

  const onMealClicked = (id: string) => {
    navigation.navigate("MealDetails", {
      mealId: id,
    });
  };

  const renderItem = ({ item }: { item: Meal }) => (
    <MealLargeContainer
      onContainerClicked={() => onMealClicked(item.idMeal)}
      id={item.idMeal}
      title={item.strMeal}
      imageUrl={item.strMealThumb}
      showFavourites={props.showFavourites}
      doAfterRemoveFromfavourites={props.refreshList}
    />
  );

  return (
    <View style={styles.mainViewStyle}>
      {props.isLoading ? (
        <Loading />
      ) : (
        <FlatList<Meal>
          ListHeaderComponent={
            props.useHeader
              ? () => {
                  return (
                    <ListHeader
                      title={props.headerTitle || ""}
                      showBackButton={false}
                    />
                  );
                }
              : null
          }
          data={props.meals}
          renderItem={renderItem}
          keyExtractor={(item) => item.idMeal}
        />
      )}
    </View>
  );
};

export default MealLargeContainerList;

const styles = StyleSheet.create({
  mainViewStyle: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
    backgroundColor: primary.white,
  },
  listHeaderComponent: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "transparent",
  },
});
