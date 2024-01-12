import { FetchCategoriesResponse } from "../../types/types";
export const FETCH_CATEGORIES = "FETCH_CATEGORIES";
export const SET_CATEGORIES = "SET_CATEGORIES";
export const SET_CATEGORIES_LOADING = "SET_CATEGORIES_LOADING";
export const SET_CATEGORIES_ERROR = "SET_CATEGORIES_ERROR";

export const fetchCategories = () => ({
  type: FETCH_CATEGORIES,
});

export const setCategories = (
  categories: FetchCategoriesResponse | undefined,
  loading: boolean,
  error?: string
) => ({
  type: SET_CATEGORIES,
  payload: { categories, loading, error },
});

export const setCategoriesLoading = (loading: boolean) => ({
  type: SET_CATEGORIES_LOADING,
  payload: loading,
});

export const setCategoriesError = (error: string | null) => ({
  type: SET_CATEGORIES_ERROR,
  payload: error,
});
