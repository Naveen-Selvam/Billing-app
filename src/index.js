import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";
import "./index.css";
import configureStore from "./store/configureStore";
import { startGetCustomer } from "./action/customeraction";
import { startGetProduct } from "./action/productaction";

const store = configureStore();

// store.subscribe(() => {
//   console.log(store.getState());
// });

if (localStorage.getItem("token")) {
  store.dispatch(startGetCustomer());
  store.dispatch(startGetProduct());
}

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
