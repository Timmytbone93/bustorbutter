var express = require("express");
var router = express.Router();
const axios = require("axios");
var jwt = require("jsonwebtoken");
var qs = require("qs");
var config = require("../../config/config.json");
var {
  generateToken,
  verifyToken,
  sendToken,
} = require("../../middleware/token");

router.post("/findSpot", async (req, res) => {
  try {
    //get profile from google apis
    //https://www.googleapis.com/oauth2/v1/userinfo?alt=json
    console.log("FIND SPOT API");
    console.log(req.body);

    let response = await axios.get(
      "https://maps.googleapis.com/maps/api/geocode/json?",
      {
        params: {
          address: req.body.address,
          key: config.Google_Geocode.api_key,
        },
      }
    );

    console.log(response.data.results[0].geometry.location);

    res.send(response.data.results[0].geometry.location);
  } catch (e) {
    console.log(e);
    res.sendStatus(200);
  }
});

module.exports = router;
