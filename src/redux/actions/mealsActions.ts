import { FetchRandomMealResponse } from "../../types/types";

export const FETCH_RANDOM_MEAL = "FETCH_RANDOM_MEAL";
export const SET_RANDOM_MEAL = "SET_RANDOM_MEAL";

export const fetchRandomMeal = () => ({
  type: FETCH_RANDOM_MEAL,
});

export const setRandomMeal = (
  randomMeal: FetchRandomMealResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_RANDOM_MEAL,
  payload: { randomMeal, loading, error },
});
