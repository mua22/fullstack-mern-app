const mongoose = require("mongoose");
const calculatorOperationSchema = mongoose.Schema(
  {
    operand1: String,
    operand2: String,
    operation: String,
    result: String,
    description: String,
  },
  { timestamps: true }
);
// The pre-save middleware is executed before a document is saved to the MongoDB database.
//This is useful for performing tasks or modifications to the document just before it gets persisted to the database.
calculatorOperationSchema.pre("save", function (next) {
  this.description =
    `You performed ` +
    this.operation +
    " on " +
    this.operand1 +
    " and " +
    this.operand2;
  next();
});
// a virtual is a property that is not stored in the MongoDB document itself but is computed or derived from other properties.
//Virtuals are typically used for computed properties or for formatting data in a specific way without persisting it in the database.
calculatorOperationSchema.virtual("virtual_result").get(function () {
  switch (this.operation) {
    case "+":
      return (
        this.operand1 +
        this.operation +
        this.operand2 +
        "=" +
        Number(Number(this.operand1) + Number(this.operand2))
      );
    case "-":
      return (
        this.operand1 +
        this.operation +
        this.operand2 +
        "=" +
        Number(Number(this.operand1) - Number(this.operand2))
      );

    default:
      return 0;
  }
});
const CalculatorOperation = mongoose.model(
  "CalculatorOperation",
  calculatorOperationSchema
);
module.exports = CalculatorOperation;
