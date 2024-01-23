var express = require("express");
var router = express.Router();
var Category = require("../../models/Category");
const multer = require("multer");
router.get("/:id", async function (req, res, next) {
  let catagories = await Category.findById(req.params.id);
  return res.send(catagories);
});
router.get("/", async function (req, res, next) {
  let catagories = await Category.find();

  return res.send(catagories);
});
router.put("/:id", async function (req, res, next) {
  let catagories = await Category.findById(req.params.id);
  catagories.name = req.body.name;
  catagories.description = req.body.description;
  await catagories.save();
  return res.send(catagories);
});
router.delete("/:id", async function (req, res, next) {
  try {
    let catagories = await Category.findById(req.params.id);
    await catagories.delete();
    return res.send("deleted");
  } catch (err) {
    return res.status(400).send("Invalid Id");
  }
});
module.exports = router;
