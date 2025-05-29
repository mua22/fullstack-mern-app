const express = require("express");
let router = express.Router();
router.get("/dashboard", async (req, res) => {
  return res.send("super-admin/dashboard");
});
module.exports = router;
