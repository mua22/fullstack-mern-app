const mongoose = require("mongoose");
const productSchema = mongoose.Schema({
  name: String,
  description: String,
 
});
const Catagories = mongoose.model("Catagories", catagoriesSchema);
module.exports = Catagories;


