import {
  SET_CATEGORIES,
  SET_CATEGORIES_ERROR,
  SET_CATEGORIES_LOADING,
} from "../actions/actions";

interface AppState {
  categories: string[];
  loading: boolean;
  error: string | null;
}

const initialState: AppState = {
  categories: [],
  loading: true,
  error: null,
};

const categoryReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
    case SET_CATEGORIES_LOADING:
      return {
        ...state,
        loading: action.payload,
        error: null,
      };
    case SET_CATEGORIES_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default categoryReducer;
