var express = require("express");
var router = express.Router();
var Movie = require("../models/Movie");
router.get("/", async function (req, res, next) {
  let Movies = await Movie.find();
  console.log(Movies);
  res.render("site/movieStore", { Movies });
});
router.get("/delete/:id", async function (req, res, next) {
  let movie = await Movie.findByIdAndDelete(req.params.id);
  res.redirect("/movieStore");
});
router.get("/add", async function (req, res, next) {
  res.render("site/addMovie");
});
router.post("/add", async function (req, res, next) {
  console.log(req.body);
  var movie = new Movie(req.body);
  await movie.save();
  res.redirect("/movieStore");
});
// router.get("/edit/:id", async function (req, res, next) {
//   // res.send("ID from URL" + req.params.id);
//   let movie = await Movie.findById(req.params.id);
//   res.render("site/editMovie", { movie });
// });

// router.post("/edit/:id", async function (req, res, next) {
//   let movie = await Movie.findById(req.params.id);
//   movie.name = req.body.name;
//   movie.date = req.body.date;
//   await movie.save();
// });
router.get("/edit/:id", async function (req, res, next) {
  let movie = await Movie.findById(req.params.id);
  res.render("site/editMovie", { movie });
});
router.post("/edit/:id", async function (req, res, next) {
  let movie = await Movie.findById(req.params.id);
  movie.name = req.body.name;
  movie.date = req.body.date;
  await movie.save();
  res.redirect("/movieStore");
});
module.exports = router;
