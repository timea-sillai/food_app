import { FetchCategoriesResponse } from "../../types/types";

export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const setCategories = (
  categories: FetchCategoriesResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_CATEGORIES,
  payload: { ...categories, loading, error },
});
