// Define the type for the response
export interface FetchCategoriesResponse {
  categories: { categories: Category[] };
}

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

export interface FetchRandomMealResponse {
  randomMeal: { meals: Meal[] };
}

export interface SearchMealResponse {
  searchResult: { meals: Meal };
}

export type Meal = {
  idMeal: number;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strMealThumb: string;
};
