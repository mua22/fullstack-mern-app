/**
 * Category Model
 */
const mongoose = require("mongoose");
const catagoriesSchema = mongoose.Schema({
  name: String,
  description: String,
  slug: String,
});
const Category = mongoose.model("Category", catagoriesSchema);
module.exports = Category;
