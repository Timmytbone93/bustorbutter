import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "semantic-ui-css/semantic.min.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="246432958645-j103lgi2lc3r0avshrqqv0k958p4vjts.apps.googleusercontent.com">
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </GoogleOAuthProvider>
);
