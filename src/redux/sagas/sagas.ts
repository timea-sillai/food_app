import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_CATEGORIES,
  FETCH_RANDOM_MEAL,
  SEARCH_MEAL,
  setCategories,
  setRandomMeal,
  setSearchMealResults,
} from "../actions/actions";
import axios, { AxiosResponse } from "axios";
import {
  FetchCategoriesResponse,
  FetchRandomMealResponse,
  SearchMealResponse,
} from "../../types/types";

// Define the API call function
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
    // Call the API using the defined function
    const response: AxiosResponse<FetchCategoriesResponse> = yield call(
      fetchCategoriesApi
    );

    // Extract the categories from the response
    console.log("fetchCategoriesSaga ", response.data);
    const categories = response.data;

    // Dispatch the action to set the categories in the state
    yield put(setCategories(categories, false));
  } catch (error: any) {
    // Handle error
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
    console.log("fetchRandomMealSaga ", response.data);
    const randomMeal = response.data;
    yield put(setRandomMeal(randomMeal, false));
  } catch (error: any) {
    yield put(setRandomMeal(undefined, false, error.message));
    console.error("Error fetching meals:", error);
  }
}

function* searchMealSaga(action) {
  //TODO create a general action type
  try {
    yield put(setSearchMealResults(undefined, true));
    console.log("REQUEST - ", action.payload);
    const response: AxiosResponse<SearchMealResponse> = yield call(
      searchMealApi,
      action.payload
    );
    console.log("searchMealSaga ", response.data);
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
