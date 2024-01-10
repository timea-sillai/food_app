import * as React from "react";
import RootContainer from "./src/Navigation/RootContainer";
import { Provider } from "react-redux";
import { store } from "./src/Store";

export default function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
