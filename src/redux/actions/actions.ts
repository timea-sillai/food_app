import {
  FetchCategoriesResponse,
  FetchRandomMealResponse,
  SearchMealResponse,
} from "../../types/types";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATEGORIES_LOADING = "SET_CATEGORIES_LOADING";
export const SET_CATEGORIES_ERROR = "SET_CATEGORIES_ERROR";

export const FETCH_RANDOM_MEAL = "FETCH_RANDOM_MEAL";
export const SET_RANDOM_MEAL = "SET_RANDOM_MEAL";
export const SET_RANDOM_MEAL_LOADING = "SET_RANDOM_MEAL_LOADING";
export const SET_RANDOM_MEAL_ERROR = "SET_RANDOM_MEAL_ERROR";

export const SEARCH_MEAL = "SEARCH_MEAL";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const SET_SEARCH_RESULTS_LOADING = "SET_SEARCH_RESULTS_LOADING";
export const SET_SEARCH_RESULTS_ERROR = "SET_SEARCH_RESULTS_ERROR";

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const fetchRandomMeal = () => ({
  type: FETCH_RANDOM_MEAL,
});

export const searchMeal = (mealName: string) => ({
  type: SEARCH_MEAL,
  payload: mealName,
});

export const setCategories = (
  categories: FetchCategoriesResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_CATEGORIES,
  payload: { ...categories, loading, error },
});

export const setRandomMeal = (
  randomMeal: FetchRandomMealResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_RANDOM_MEAL,
  payload: { randomMeal, loading, error },
});

export const setSearchMealResults = (
  searchResult: SearchMealResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResult, loading, error },
});
