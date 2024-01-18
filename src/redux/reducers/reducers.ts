import { combineReducers } from "redux";
import {
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
  SET_RANDOM_MEAL,
  SET_RANDOM_MEAL_ERROR,
  SET_RANDOM_MEAL_LOADING,
  SET_SEARCH_RESULTS,
  SET_SEARCH_RESULTS_ERROR,
  SET_SEARCH_RESULTS_LOADING,
} from "../actions/actions";
import { Meal } from "../../types/types";

interface AppState {
  categories: string[];
  randomMeal: any;
  searchMealResults: any;
}

const initialState: AppState = {
  categories: [],
  randomMeal: [],
  searchMealResults: [],
};

const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    default:
      return state;
  }
};

const mealReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_RANDOM_MEAL:
      return {
        ...state,
        randomMeal: action.payload,
      };
    default:
      return state;
  }
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchMealResults: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = (state = initialState, action: any) => {
  switch (action.type) {
    //categories
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    case SET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //random meal
    case SET_RANDOM_MEAL:
      return {
        ...state,
        randomMeal: action.payload,
      };
    case SET_RANDOM_MEAL_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    case SET_RANDOM_MEAL_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    //search results
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        searchMealResults: action.payload,
      };
    case SET_SEARCH_RESULTS_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case SET_SEARCH_RESULTS_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    default:
      return state;
  }
};

// const rootReducer = combineReducers({
//   categories: categoryReducer,
//   randomMeal: mealReducer,
//   searchMealResults: searchReducer,
// });

export default rootReducer;
