var express = require("express");
var router = express.Router();
var Product = require("../../models/Product");

router.get("/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  return res.send(product);
});
router.get("/", async function (req, res, next) {
  let products = await Product.find();
  return res.send(products);
});
router.post("/", async function (req, res, next) {
  let product = new Product(req.body);
  await product.save();
  res.send(product);
});
router.put("/:id", async function (req, res, next) {
  let product = await Product.findById(req.params.id);
  product.name = req.body.name;
  product.price = req.body.price;
  product.color = req.body.color;
  product.description = req.body.description;
  product.department = req.body.department;
  await product.save();
  return res.send(product);
});
router.delete("/:id", async function (req, res, next) {
  try {
    let product = await Product.findById(req.params.id);
    await product.delete();
    return res.send("deleted");
  } catch (err) {
    return res.status(400).send("Invalid Id");
  }
});
module.exports = router;
