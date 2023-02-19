var express = require("express");
var router = express.Router();

router.post("/profile", async (req, res) => {
  //get profile from google apis
  //https://www.googleapis.com/oauth2/v1/userinfo?alt=json

  console.log("hit profile auth back end");

  console.log("..done getting profile");
  console.log("profile");

  res.send("Auth done");
});

module.exports = router;
