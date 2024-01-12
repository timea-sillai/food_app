import * as React from "react";
import RootContainer from "./src/navigation/RootContainer";
import { Provider } from "react-redux";
import store from "./src/redux/store/store";

export default function App() {
  return (
    <Provider store={store}>
      <RootContainer />
    </Provider>
  );
}
