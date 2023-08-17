import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
const option={
  timeout:5000,
  position:positions.BOTTOM_CENTER,
  transitions:transitions.SCALE
}
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...option}>
      <App />
    </AlertProvider>
  </Provider>
);
