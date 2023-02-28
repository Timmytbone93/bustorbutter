import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "semantic-ui-css/semantic.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";
import config from "../config/config.json";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId={config.Google.client_id}>
    <App />
  </GoogleOAuthProvider>
);
