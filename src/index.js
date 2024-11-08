/*import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./App.css";

import App from "./App";

const root = createRoot(document.getElementById("root"));
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
*/

// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import "./App.css";

ReactDOM.render(
  // Temporarily remove StrictMode during development
  // <React.StrictMode>
    <App />,
  // </React.StrictMode>
  document.getElementById('root')
);
