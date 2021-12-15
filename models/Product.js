const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: String,
  color: String,
  department: String,
  description: String,
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
