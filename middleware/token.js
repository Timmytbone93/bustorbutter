var jwt = require("jsonwebtoken");
var config = require("../config/config");

var createToken = function (auth) {
  console.log("Creating token");
  userToken = {
    _id: auth.id,
    fullName: auth.name,
    firstName: auth.given_name,
    lastName: auth.family_name,
    email: auth.email,
    picture: auth.picture,
  };
  return jwt.sign(userToken, config.Google.client_id, {
    expiresIn: 60 * 2, //five minutes
  });
};

module.exports = {
  generateToken: async function (req, res, next) {
    var token = createToken(req);
    return token;
  },
  sendToken: async function (req, res) {
    //console.log("sending token")
    await res.setHeader("x-auth-token", req);
    return res.sendStatus(200);
  },
  verifyToken: function (req, res) {
    //console.log("verifying token...")

    jwt.verify(req.token, config.Google.client_id, function (err, decoded) {
      if (err) {
        console.log("No token found");
        return res.send(401, "No token found");
      }
      if (Date.now() > decoded.exp) {
        //res.setHeader('x-auth-token', req.token);
        return res.sendStatus(200);
        //return res.setHeader('x-auth-token', req.body.token)
      } else {
        console.log("token expired");
        return res.send(401, "Token expired");
      }
    });
  },
};
