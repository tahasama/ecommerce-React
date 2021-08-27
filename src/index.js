import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "./bootstrap.min.css";
import { Provider } from "react-redux";
import store from "./store";
import axios from "axios";

axios.defaults.baseURL = "http://127.0.0.1:8000/";
axios.defaults.withCredentials = true;

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
