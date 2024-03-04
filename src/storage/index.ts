import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavouritesDetails } from "../components/mealDetails/AddToFavourites";
import { Meal } from "../types/types";
import StorageKeys from "./StorageKeys";

class AsyncStorageManager {
  async getFavourites(): Promise<Meal[]> {
    const favouritesJson = await AsyncStorage.getItem(
      StorageKeys.FAVOURITES_KEY
    );
    if (favouritesJson !== null) {
      return JSON.parse(favouritesJson);
    }
    return [];
  }
  /**
   *
   * @param id
   * @returns if current meal id is found in database by searching it in favourites json
   */
  async isMealLiked(id: string): Promise<boolean | undefined> {
    try {
      const favouritesJson = await AsyncStorage.getItem(
        StorageKeys.FAVOURITES_KEY
      );
      if (favouritesJson !== null) {
        const favouritesList = JSON.parse(favouritesJson);
        let isFound = false;
        if (favouritesList != null)
          favouritesList.forEach((element: FavouritesDetails) => {
            if (id === element.idMeal) {
              isFound = true;
            }
          });
        return isFound;
      } else {
        return false;
      }
    } catch (e) {
      console.error("Error while reading data", e);
      return undefined;
    }
  }

  /**
   * Updates the stored meals json by removing current meal if exists or adding current meal if it does not.
   * @param meal
   * @returns the new like value of meal parameter stored locally
   */
  async toggleFavourites(
    meal: FavouritesDetails
  ): Promise<boolean | undefined> {
    try {
      let newFavouritesList: FavouritesDetails[] = [];
      const favouritesJson = await AsyncStorage.getItem(
        StorageKeys.FAVOURITES_KEY
      );
      if (favouritesJson !== null) {
        //there is a list of meals in database, input meal must be added/removed from it
        const favouritesList = JSON.parse(favouritesJson);
        let isFound = false;
        if (favouritesList != null)
          favouritesList.forEach((element: FavouritesDetails) => {
            if (meal.idMeal == element.idMeal) {
              isFound = true;
            } else {
              newFavouritesList.push(element);
            }
          });
        if (!isFound) {
          newFavouritesList.push(meal);
        }
        this.storeJson(StorageKeys.FAVOURITES_KEY, newFavouritesList);
        return !isFound;
      } else {
        //there is no meal in database, input meal must be added
        let newFavouritesList: FavouritesDetails[] = [];
        newFavouritesList.push(meal);
        this.storeJson(StorageKeys.FAVOURITES_KEY, newFavouritesList);
        return true;
      }
    } catch (e) {
      console.error("Error while reading data", e);
      return undefined;
    }
  }

  async storeJson(key: string, json: FavouritesDetails[]): Promise<boolean> {
    try {
      const jsonData = JSON.stringify(json);
      await AsyncStorage.setItem(key, jsonData);
      return true;
    } catch (e) {
      console.error("Error saving data", e);
      return false;
    }
  }
}

const asyncStorage = new AsyncStorageManager();
export default asyncStorage;
