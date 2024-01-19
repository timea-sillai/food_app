import { Action, Category, Meal } from "../../types/types";
import { SET_CATEGORIES } from "../actions/categoriesActions";
import { SET_RANDOM_MEAL } from "../actions/mealsActions";
import {
  RESET_SEARCH_RESULTS,
  SET_SEARCH_RESULTS,
} from "../actions/searchActions";

interface AppState {
  categories: Category[];
  randomMeal: Meal[];
  searchMealResults: Meal[];
}

const initialState: AppState = {
  categories: [],
  randomMeal: [],
  searchMealResults: [],
};

const rootReducer = (state = initialState, action: Action) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_RANDOM_MEAL:
      return {
        ...state,
        randomMeal: action.payload,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchMealResults: action.payload,
      };
    case RESET_SEARCH_RESULTS:
      return {
        ...state,
        searchMealResults: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
