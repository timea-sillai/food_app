import React, { FunctionComponent, useEffect, useState } from "react";
import { MealDetailsProps } from "../../navigation/NavigationTypes";
import { generalStyles } from "../../styles/generalStyleSheet";
import { ScrollView } from "react-native-gesture-handler";
import mealService from "../../services";
import { Meal } from "../../types/types";
import MealDetailsView from "./MealDetails";
import MealDetailsBackground from "./MealDetailsBackground";
import MealDetailsImage from "./MealDetailsImage";
import { View } from "react-native";

const MealDetails: FunctionComponent<MealDetailsProps> = ({
  route,
  navigation,
}) => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [mealDetails, setMealDetails] = useState<Meal>();

  const getMealDetails = async () => {
    const mealId = route.params?.mealId;
    try {
      setLoading(true);
      const response = await mealService.fetchMealDetailsApi(mealId);
      setMealDetails(response?.meals[0]);
    } catch (e) {
      console.error("Error while fetching meal details", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
    getMealDetails();
  }, []);

  return (
    <View style={[generalStyles.mainViewStyle]}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <MealDetailsBackground />
        <MealDetailsView mealDetails={mealDetails} isLoading={isLoading} />
        <MealDetailsImage mealImage={mealDetails?.strMealThumb} />
      </ScrollView>
    </View>
  );
};

export default MealDetails;
