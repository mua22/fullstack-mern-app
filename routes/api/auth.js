var express = require("express");
var router = express.Router();
var User = require("../../models/User");
const jwt = require("jsonwebtoken");
const _ = require("lodash");
const config = require("config");
const bcrypt = require("bcryptjs");
router.post("/", async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email,
  });
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).send("Invalid Password");
  }
  const token = jwt.sign(
    {
      _id: user._id,
      roles: user.roles,
      name: user.name,
      email: user.email,
    },
    config.get("jwtPrivateKey")
  );

  return res.send(token);
});

module.exports = router;
