import { useState, useContext } from "react";
import React from "react";
import ReactDOM from "react-dom/client";
import { Routes, Route } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import UserContext from "../../context/UserContext/UserContext";

import { Container } from "semantic-ui-react";

function Dashboard() {
  const [currentUser, setCurrentUser] = useContext(UserContext);
  return (
    <div className="Dashboard">
      <Container fluid>
        <Navbar />
        {currentUser.authenticated && }
      </Container>
    </div>
  );
}

export default Dashboard;
