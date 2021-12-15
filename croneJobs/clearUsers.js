const User = require("../models/User");
var faker = require("faker");
async function clearUsers() {
  console.log("Refreshing Users");
  let users = [];
  const salt = await bcrypt.genSalt(10);
  const password = await bcrypt.hash(req.body.password, salt);
  users.push({
    name: "Usman Akram",
    email: "admin@admin.com",
    password,
    roles: ["customer", "admin"],
  });

  await User.deleteMany({});
  User.collection.insertMany(users, (err, docs) => {
    if (err) {
      console.error("Error Occured: " + err);
    } else {
      console.info("bulk inserted");
    }
  });
}

module.exports = clearUsers;
