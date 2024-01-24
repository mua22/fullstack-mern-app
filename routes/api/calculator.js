var express = require("express");
var router = express.Router();
var CalculatorOperation = require("../../models/CalculatorOperation");
router.post("/delete-all", async (req, res) => {
  let record = await CalculatorOperation.deleteMany({});
  return res.send("Records Deleted");
});
router.post("/", async (req, res) => {
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
  return res.send(calculatorOp);
});
router.delete("/:id", async (req, res) => {
  let record = await CalculatorOperation.findByIdAndDelete(req.params.id);
  return res.send("Record Deleted");
});
module.exports = router;
