var express = require("express");
var router = express.Router();
var Product = require("../../../models/Product");

router.get("/", async function (req, res, next) {
  console.log("inside");
  setTimeout(async () => {
    let products = await Product.find();

    res.send(products);
  }, 5000);
});
module.exports = router;
