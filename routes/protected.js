var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/my-account", function (req, res, next) {
  res.render("site/myaccount");
});

module.exports = router;
