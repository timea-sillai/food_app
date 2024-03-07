export default class Constants {
  //API CONSTANTS
  static BASE_URL = "https://www.themealdb.com/api/json/v1/1";
  static CATEGORIES_ENDPOINT = "/categories.php";
  static CATEGORIES_DETAILS_ENDPOINT = "/filter.php?c=";
  static MEAL_DETAILS_ENDPOINT = "/lookup.php?i=";
  static RANDOM_MEAL_ENDPOINT = "/random.php";
  static SEARCH_MEAL_ENDPOINT = "/search.php?s=";
  static GET_METHOD_TYPE = "GET";
  static RANDOM_MEALS_SIZE = 3;

  //FIREBASE ERROR CODES
  static INVALID_EMAIL = "auth/invalid-email";
  static EMAIL_ALREADY_IN_USE = "auth/email-already-in-use";

  //REGEX
  static EMAIL_REGEX: RegExp = /^[^s@]+@[^s@]+.[^s@]+$/;
  static PASSWORD_REGEX: RegExp = /^.{8,}$/;
  static NOT_EMPTY_TEXT_REGEX: RegExp = /^.+$/;
}
