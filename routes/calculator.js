const express = require("express");
const CalculatorOperation = require("../models/CalculatorOperation");
let router = express.Router();
router.get("/ajax-example", async (req, res) => {
  console.log("get method /calculator");
  let results = await CalculatorOperation.find();
  // return res.send(results);
  return res.render("calculator/calculator-example-ajax", { results });
});
router.get("/delete-all", async (req, res) => {
  await CalculatorOperation.deleteMany({});
  return res.redirect("/calculator");
});
router.get("/delete/:id", async (req, res) => {
  await CalculatorOperation.findByIdAndDelete(req.params.id);
  return res.redirect("/calculator");
});

router.get("/", async (req, res) => {
  console.log("get method /calculator");
  let results = await CalculatorOperation.find();
  // return res.send(results);
  return res.render("calculator/calculator-example", { results });
});
router.post("/", async (req, res) => {
  // return res.send(req.body);
  console.log("post /calculator");
  let data = req.body;
  data.result = 0;
  switch (req.body.operation) {
    case "+":
      data.result = Number(req.body.operand1) + Number(req.body.operand2);
      break;
    case "-":
      data.result = Number(req.body.operand1) - Number(req.body.operand2);
      break;

    default:
      break;
  }
  let calculatorOp = new CalculatorOperation(data);
  await calculatorOp.save();
  // return res.send(data); // we do not send data from server side form submissions
  // return res.render("calculator/calculator-example"); //we do not render responses in form submissions either
  return res.redirect("/calculator");
});
module.exports = router;
