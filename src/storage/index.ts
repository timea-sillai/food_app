import AsyncStorage from "@react-native-async-storage/async-storage";
import { FavouritesDetails } from "../components/AddToFavourites";
import { Meal } from "../types/types";
import StorageKeys from "./StorageKeys";

class AsyncStorageManager {
  async getFavourites(): Promise<FavouritesDetails[]> {
    const favouritesJson = await this.getFavouritesJson();
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
      const favouritesJson = await this.getFavouritesJson();
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
      const favouritesJson = await this.getFavouritesJson();
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
        this.storeFavouritesList(newFavouritesList);
        return !isFound;
      } else {
        //there is no meal in database, input meal must be added
        let newFavouritesList: FavouritesDetails[] = [];
        newFavouritesList.push(meal);
        this.storeFavouritesList(newFavouritesList);
        return true;
      }
    } catch (e) {
      console.error("Error while reading data", e);
      return undefined;
    }
  }

  /**
   * Stores the favourites list to current user if exists/unlogged users list
   * @param json
   */
  async storeFavouritesList(
    favouritesList: FavouritesDetails[]
  ): Promise<boolean> {
    const userId = await AsyncStorage.getItem(StorageKeys.USER_ID);
    console.log("store", userId);
    if (userId == null) {
      //case for unlogged users
      return this.storeJson(
        StorageKeys.UNLOGGED_USERS_FAVOURITES_KEY,
        favouritesList
      );
    } else {
      //case for logged users
      return this.storeJson(userId, favouritesList);
    }
  }

  async getFavouritesJson(): Promise<string | null> {
    const userId = await AsyncStorage.getItem(StorageKeys.USER_ID);
    console.log("get", userId);
    if (userId == null) {
      //case for unlogged users
      return AsyncStorage.getItem(StorageKeys.UNLOGGED_USERS_FAVOURITES_KEY);
    } else {
      //case for logged users
      return AsyncStorage.getItem(userId);
    }
  }

  async storeJson(key: string, json: FavouritesDetails[]): Promise<boolean> {
    try {
      const jsonData = JSON.stringify(json);
      await AsyncStorage.setItem(key, jsonData);
      return true;
    } catch (e) {
      console.error("Error saving user id", e);
      return false;
    }
  }

  async storeUserId(userId: string): Promise<boolean> {
    try {
      await AsyncStorage.setItem(StorageKeys.USER_ID, userId.toString());
      return true;
    } catch (e) {
      console.error("Error saving user id", e);
      return false;
    }
  }

  async deleteUserId(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(StorageKeys.USER_ID);
      return true;
    } catch (e) {
      console.error("Error saving user id", e);
      return false;
    }
  }
}

const asyncStorage = new AsyncStorageManager();
export default asyncStorage;
