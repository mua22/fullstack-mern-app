const express = require("express");
let router = express.Router();
router.get("/", async (req, res) => {
  return res.render("super-admin/dashboard");
});
module.exports = router;
