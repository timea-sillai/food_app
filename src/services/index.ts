import {
  FetchCategoriesResponse,
  FetchMealResponse,
  Meal,
  SearchMealResponse,
} from "../types/types";
import Constants from "../utils/constants";

class MealService {
  async getRequestData(
    endpoint: string,
    param?: string
  ): Promise<{ url: string; requestOptions: { method: string } }> {
    const url = `${Constants.BASE_URL}${endpoint}${param ?? ""}`;
    const requestOptions = {
      method: Constants.GET_METHOD_TYPE,
    };
    return { url, requestOptions };
  }

  async fetchCategoriesApi(): Promise<FetchCategoriesResponse | undefined> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.CATEGORIES_ENDPOINT
    );
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
  }

  async fetchCategoriesDetailsApi(
    categoryName: string
  ): Promise<FetchMealResponse> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.CATEGORIES_DETAILS_ENDPOINT,
      categoryName
    );
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
  }

  async fetchMealDetailsApi(mealId: string): Promise<FetchMealResponse> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.MEAL_DETAILS_ENDPOINT,
      mealId
    );
    const response = await fetch(url, requestOptions);
    return await response.json();
  }

  async fetchRandomMealApi(): Promise<FetchMealResponse> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.RANDOM_MEAL_ENDPOINT
    );
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
  }

  async fetchRandomMeals(counter: number): Promise<Set<Meal>> {
    const newSet: Set<Meal> = new Set();
    for (let i = 1; i <= counter; i++) {
      const response: FetchMealResponse =
        await mealService.fetchRandomMealApi();
      response?.meals.map((meal) => {
        newSet.add(meal);
      });
    }
    return newSet;
  }

  async searchMealApi(searchQuery: string): Promise<SearchMealResponse> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.SEARCH_MEAL_ENDPOINT,
      searchQuery
    );
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
  }
}

const mealService = new MealService();
export default mealService;
