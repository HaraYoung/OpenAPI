/**
 * @filename: index.js
 * @description: store로 부터 구독받아서 App.js를 통해서 전달
 * @author: 최수진(sujin971008@gmail.com),박세영()
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import Meta from "./Meta";

/* 리덕스 구성을 위한 참조 */
import { Provider } from "react-redux";
import store from "./store/misaeStore";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Meta />
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
