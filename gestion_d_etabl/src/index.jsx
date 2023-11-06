import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";

import "react-toggle/style.css";

import {
  IonApp,
  isPlatform,
} from "@ionic/react";
import "./index.scss";
import AppMobile from "./AppMobile.jsx";
//TODO avoir deux app et mettre les css optonnels que dans celle de ionic
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {isPlatform('desktop') ? (
      <BrowserRouter>
        <App />
      </BrowserRouter>
    ) : (
      <BrowserRouter>
        <IonApp>
          <AppMobile />
        </IonApp>
      </BrowserRouter>
    )}
  </React.StrictMode>
);
