export type Action = {
  type: string;
  payload: any;
};

// Define the type for the response
export interface FetchCategoriesResponse {
  categories: Category[];
}

export type Category = {
  idCategory: string;
  strCategory: string;
  strCategoryThumb: string;
};

export interface FetchRandomMealResponse {
  meals: Meal[];
}

export interface SearchMealResponse {
  searchResult: { meals: Meal[] };
}

export type Meal = {
  idMeal: string;
  strMeal: string;
  strArea: string;
  strCategory: string;
  strMealThumb: string;
};
