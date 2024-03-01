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

export interface FetchMealResponse {
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
  strInstructions: string;
  strTags: string;
  strYoutube: string;
};

type User = {
  uid: string;
  email: string;
};

export type FirebaseUser = {
  user: User;
};
