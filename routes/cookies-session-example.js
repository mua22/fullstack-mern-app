const express = require("express");
let router = express.Router();
router.get("/cookies", (req, res) => {
  //   return res.send(req.cookies);
  let city = req.cookies.city;
  return res.render("cookies-session-example/cookies", { city });
});
router.post("/cookies", (req, res) => {
  res.cookie("city", req.body.city);
  res.redirect("/cookies-session-example/cookies");
});
router.get("/session", (req, res) => {
  //   return res.send(req.cookies);
  let university = req.session.university;
  return res.render("cookies-session-example/session", { university });
});
router.post("/session", (req, res) => {
  req.session.university = req.body.university;
  res.redirect("/cookies-session-example/session");
});
module.exports = router;
