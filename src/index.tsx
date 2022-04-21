import React from "react";
import ReactDOM from "react-dom/client";

import BombShop from "./Containers/BombShop";
import "./index.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLDivElement
);

root.render(
  <React.StrictMode>
    <BombShop />
  </React.StrictMode>
);
