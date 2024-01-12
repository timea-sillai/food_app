import apisauce, { ApisauceInstance } from "apisauce";
import { PayloadType } from "../Types";

// const apiConfig: ApisauceInstance = (baseURL: string) =>
//   apisauce.create({
//     baseURL,
//     timeout: 30000,
//     headers: { "Cache-Control": "no-cache" },
//   });

const SERVER_URL = "https://www.themealdb.com";
//export const api: ApisauceInstance = apiConfig(SERVER_URL);

const api = apisauce.create({
  baseURL: "https://api.github.com",
  headers: { Accept: "application/vnd.github.v3+json" },
});

const auth = () => {
  const signInUser = (credentials: PayloadType) => {
    // return api.post(END_POINT, credentials);
    console.log("ce vrei tu");
  };

  return { signInUser };
};

export default { auth, api };
