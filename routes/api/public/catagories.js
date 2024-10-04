/**
 * @api {get} / Request CAtegories
 * @apiName getCategories
 * @apiGroup User
 *
 * @apiSuccess {Object[]} categories List of categories.
 */

var express = require("express");
var router = express.Router();
var Catagories = require("../../models/Catagories");

router.get("/", async function (req, res, next) {
  console.log("inside");
  setTimeout(async () => {
    let catagories = await Catagories.find();

    res.send(catagories);
  }, 5000);
});
module.exports = router;
