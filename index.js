// server.js
const express = require("express");
const app = express();
require("dotenv/config"); // configure reading from .env
const cors = require("cors");
const { OAuth2Client } = require("google-auth-library");
const jwt = require("jsonwebtoken");

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: "GET,POST,PUT,DELETE,OPTIONS",
  })
);
app.use(express.json());

let DB = [];

app.listen("5152", () => console.log("Server running on port 5152"));
