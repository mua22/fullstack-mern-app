const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  price: String,
  color: String,
  department: String,
  description: String,
  image: String,
  category: { type: mongoose.Types.ObjectId, ref: "Category" },
});
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
