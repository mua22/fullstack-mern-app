var express = require("express");
var router = express.Router();
var Product = require("../models/Product");
var Category = require("../models/Category");
router.get("/cart", async function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  let products = await Product.find({ _id: { $in: cart } });

  let total = products.reduce(
    (total, product) => total + Number(product.price),
    0
  );

  res.render("site/cart", { products, total });
});
router.get("/add-cart/:id", function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = [];
  cart.push(req.params.id);
  res.cookie("cart", cart);
  req.flash("success", "Product Added To Cart");
  res.redirect("/");
});
router.get("/collections/:slug/:page?", async function (req, res, next) {
  let category = await Category.findOne({ slug: req.params.slug });
  if (!category) return next();
  let page = Number(req.params.page);
  let pageSize = 10;
  let skip = (page - 1) * pageSize;
  if (!page) page = 1;
  if (!skip) skip = 0;

  // return res.send({ page, pageSize, skip });
  let products = await Product.find({ category: category._id })
    .skip(skip)
    .limit(pageSize);
  let totalProducts = await Product.countDocuments({ category: category._id });
  let totalPages = Math.ceil(totalProducts / pageSize);

  return res.render("site/category", {
    pagetitle: "Awesome Products",
    products,
    page,
    pageSize,
    totalPages,
    category,
  });
});
router.get("/:page?", async function (req, res, next) {
  let page = Number(req.params.page);
  let pageSize = 10;
  let skip = (page - 1) * pageSize;
  if (!page) page = 1;
  if (!skip) skip = 0;

  // return res.send({ page, pageSize, skip });
  let products = await Product.find().skip(skip).limit(pageSize);
  let totalProducts = await Product.countDocuments();
  let totalPages = Math.ceil(totalProducts / pageSize);
  return res.render("site/homepage", {
    pagetitle: "Awesome Products",
    products,
    page,
    pageSize,
    totalPages,
  });
});

module.exports = router;
