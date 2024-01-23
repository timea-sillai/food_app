import { call, put, takeLatest, all } from "redux-saga/effects";

import axios, { AxiosResponse } from "axios";
import {
  Action,
  FetchCategoriesResponse,
  FetchRandomMealResponse,
  SearchMealResponse,
} from "../../types/types";
import { setCategories, FETCH_CATEGORIES } from "../actions/categoriesActions";
import { setRandomMeal, FETCH_RANDOM_MEAL } from "../actions/mealsActions";
import { setSearchMealResults, SEARCH_MEAL } from "../actions/searchActions";

//API call functions
const fetchCategoriesApi = () =>
  axios.get("https://www.themealdb.com/api/json/v1/1/categories.php");

const fetchRandomMealApi = () =>
  axios.get("https://www.themealdb.com/api/json/v1/1/random.php");

const searchMealApi = (mealName: string) =>
  axios.get("https://www.themealdb.com/api/json/v1/1/search.php?s=" + mealName);

// Saga worker function
function* fetchCategoriesSaga() {
  try {
    yield put(setCategories(undefined, true));
    const response: AxiosResponse<FetchCategoriesResponse> = yield call(
      fetchCategoriesApi
    );
    const categories = response.data;
    yield put(setCategories(categories, false));
  } catch (error: any) {
    yield put(setCategories(undefined, false, error.message));
    console.error("Error fetching categories:", error);
  }
}

function* fetchRandomMealSaga() {
  try {
    yield put(setRandomMeal(undefined, true));
    const response: AxiosResponse<FetchRandomMealResponse> = yield call(
      fetchRandomMealApi
    );
    const randomMeal = response.data;
    yield put(setRandomMeal(randomMeal, false));
  } catch (error: any) {
    yield put(setRandomMeal(undefined, false, error.message));
    console.error("Error fetching meals:", error);
  }
}

function* searchMealSaga(action: Action) {
  try {
    yield put(setSearchMealResults(undefined, true));
    const response: AxiosResponse<SearchMealResponse> = yield call(
      searchMealApi,
      action.payload
    );
    const searchResponse = response.data;
    yield put(setSearchMealResults(searchResponse, false));
  } catch (error: any) {
    yield put(setSearchMealResults(undefined, false, error.message));
    console.error("Error searching meals:", error);
  }
}

// Saga watcher function
function* rootSaga() {
  // Use the 'all' effect to run multiple sagas concurrently
  yield all([takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga)]);
  yield all([takeLatest(FETCH_RANDOM_MEAL, fetchRandomMealSaga)]);
  yield all([takeLatest(SEARCH_MEAL, searchMealSaga)]);
}

export default rootSaga;
