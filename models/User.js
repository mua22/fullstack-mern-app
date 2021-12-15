const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  name: String,
  email: String,
  password: String,
  roles: [String],
});
const User = mongoose.models.User || mongoose.model("User", userSchema);
module.exports = User;
