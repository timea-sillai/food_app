import { SearchMealResponse } from "../../types/types";

export const SEARCH_MEAL = "SEARCH_MEAL";
export const SET_SEARCH_RESULTS = "SET_SEARCH_RESULTS";
export const RESET_SEARCH_RESULTS = "RESET_SEARCH_RESULTS";

export const searchMeal = (mealName?: string) => ({
  type: SEARCH_MEAL,
  payload: mealName,
});

export const resetSearchResults = () => ({
  type: RESET_SEARCH_RESULTS,
});

export const setSearchMealResults = (
  searchResult: SearchMealResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_SEARCH_RESULTS,
  payload: { searchResult, loading, error },
});
