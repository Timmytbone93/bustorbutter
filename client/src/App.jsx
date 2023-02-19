import { useState } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { UserProvider } from "./context/UserContext/UserContext";

import Dashboard from "./views/Dashboard/Dashboard";

function App() {
  return (
    <div className="App">
      <Router>
        <UserProvider>
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </UserProvider>
      </Router>
    </div>
  );
}

export default App;
