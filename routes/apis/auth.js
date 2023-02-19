var express = require("express");
var router = express.Router();
const axios = require("axios");
var jwt = require("jsonwebtoken");
var config = require("../../config/config.json");
var {
  generateToken,
  verifyToken,
  sendToken,
} = require("../../middleware/token");

router.post("/profile", async (req, res) => {
  try {
    //get profile from google apis
    //https://www.googleapis.com/oauth2/v1/userinfo?alt=json

    let response = await axios.get(
      "https://www.googleapis.com/oauth2/v1/userinfo",
      {
        headers: {
          Authorization: "Bearer " + req.body.access_token,
        },
      }
    );

    console.log(response);

    let token = jwt.sign(
      { access_token: req.body.access_token, profile: response.data },
      config.Google.client_id,
      {
        expiresIn: 60, //1 minute
      }
    );

    console.log({ token, profile: response.data });
    res.send({ token, profile: response.data });
  } catch (e) {
    console.log(e);
    res.send(200);
  }
});

router.post("/isAuthenticated", async function (req, res) {
  if (!req.body.token) {
    console.log("No token no auth!");
    return res.sendStatus(401);
  }

  req.token = req.body.token;

  await res.setHeader("x-auth-token", req.token);

  verifyToken(req, res);
});
/*
router.post("/fetchPermissions", function (req, res) {
  console.log("fetching permissions");
  const permissions = config.permissions;

  let permissionsArray = Object.entries(permissions);

  const permissionsReturn = [];

  permissionsArray.forEach((value) => {
    if (value[1].indexOf(req.body.email) > -1) {
      permissionsReturn.push(value[0]);
    }
  });

  console.log(permissionsReturn);

  if (permissionsReturn.length == 0) {
    permissionsReturn.push("Normal_User");
    console.log(permissionsReturn);
    return res.send(permissionsReturn);
  } else {
    console.log(permissionsReturn);
    return res.send(permissionsReturn);
  }
});
*/
module.exports = router;
