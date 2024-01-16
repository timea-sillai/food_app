import { call, put, takeLatest, all } from "redux-saga/effects";
import {
  FETCH_CATEGORIES,
  setCategories,
  setCategoriesError,
  setCategoriesLoading,
} from "../actions/actions";
import axios, { AxiosResponse } from "axios";
import { FetchCategoriesResponse } from "../../types/types";

// Define the API call function
const fetchCategoriesApi = () =>
  axios.get("https://www.themealdb.com/api/json/v1/1/list.php?c=list");

// Saga worker function
function* fetchCategoriesSaga() {
  try {
    yield put(setCategories(undefined, true));
    // Call the API using the defined function
    const response: AxiosResponse<FetchCategoriesResponse> = yield call(
      fetchCategoriesApi
    );

    // Extract the categories from the response
    console.log("MESAJ ", response.data);
    const categories = response.data;

    // Dispatch the action to set the categories in the state
    yield put(setCategories(categories, false));
  } catch (error: any) {
    // Handle error
    yield put(setCategories(undefined, false, error.message));
    console.error("Error fetching categories:", error);
  }
}

// Saga watcher function
function* rootSaga() {
  // Use the 'all' effect to run multiple sagas concurrently
  yield all([takeLatest(FETCH_CATEGORIES, fetchCategoriesSaga)]);
}

export default rootSaga;
