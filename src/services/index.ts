import {
  FetchCategoriesResponse,
  FetchRandomMealResponse,
  SearchMealResponse,
} from "../types/types";
import Constants from "../utils/constants";

class BusinessManagerService {
  async getRequestData(
    endpoint: string,
    param?: string
  ): Promise<{ url: string; requestOptions: { method: string } }> {
    const url = `${Constants.BASE_URL}${endpoint}${param ? param : ""}`;
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
  ): Promise<FetchRandomMealResponse> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.CATEGORIES_DETAILS_ENDPOINT,
      categoryName
    );
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
  }

  async fetchRandomMealApi(): Promise<FetchRandomMealResponse> {
    const { url, requestOptions } = await this.getRequestData(
      Constants.RANDOM_MEAL_ENDPOINT
    );
    const response = await fetch(url, requestOptions);
    const json = await response.json();
    return json;
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

const businessManagerService = new BusinessManagerService();
export default businessManagerService;
