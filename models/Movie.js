const mongoose = require("mongoose");
var moment = require("moment");
const moviesSchema = mongoose.Schema({
  name: String,
  date: {
    type: String,
    // default: () => moment().format("dddd, MMMM Do YYYY, h:mm:ss a"),
    default: () => moment().format("MMMM Do YYYY, h:mm:ss a"),
  },
});
const Movie = mongoose.model("Movie", moviesSchema);
module.exports = Movie;
