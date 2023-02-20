// server.js
const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
var cors = require("cors");

app.use(
  cors({
    origin: "*",
  })
);

//BodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//api

app.use("/api/auth", require("./routes/apis/auth"));

app.use("/api/google", require("./routes/apis/google"));

// add middlewares

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "build")));
app.use(express.static("public"));
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "..", "build", "index.html"));
});

let DB = [];

app.listen("3001", () => console.log("Server running on port 3001"));
