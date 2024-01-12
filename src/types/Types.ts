// Define the type for the response
export interface FetchCategoriesResponse {
  categories: { meals: Meal[] };
}

export type Meal = {
  strCategory: string;
};
