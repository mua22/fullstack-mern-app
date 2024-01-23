var express = require("express");
var router = express.Router();
var Product = require("../models/Product");
const Category = require("../models/Category");
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

router.get("/:Catagorys?", async function (req, res, next) {
  let catagories = await Category;
  let Categorys = [shirt, pant, beg, trousels, dresses];
      // return res.send({ page, pageSize, skip });
  return res.render("site/collections/Catetorys", {
    Category_title: "All Catagories",
      catagories,
      Categorys,
  
  });
});

module.exports = router;
