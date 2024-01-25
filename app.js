var createError = require("http-errors");
var express = require("express");
var path = require("path"); //The node:path module provides utilities for working with file and directory paths
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts"); //Layout support for ejs in express
var indexRouter = require("./routes/index");
var protectedRouter = require("./routes/protected");
var sessionAuth = require("./middlewares/sessionAuth");
var checkSessionAuth = require("./middlewares/checkSessionAuth");
var apiauth = require("./middlewares/apiauth");
var session = require("express-session");
var app = express();

var config = require("config");
app.use(
  session({
    secret: config.get("sessionSecret"),
    cookie: { maxAge: 60000 },
    resave: true,
    saveUninitialized: true,
  })
);
// const { startCronJobs } = require("./croneJobs/index");
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs"); //tells express that we are using ejs as rendering engine
//view engine is responsible for rendering dynamic content on the server side
app.use(expressLayouts); //add express layouts middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false })); //is a middleware function that is used to parse incoming requests with urlencoded payloads e.g. form submissions
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
// his middleware is used to serve static files, such as images, CSS files, and JavaScript files, directly from a specified directory.

app.use("/api/public/products", require("./routes/api/public/products"));
app.use("/api/categories", require("./routes/api/catagories"));
app.use("/api/products", apiauth, require("./routes/api/products"));
app.use("/api/calculator", require("./routes/api/calculator"));
app.use("/api/auth", require("./routes/api/auth"));
app.use(sessionAuth); // add a middleware which should run on all server side rendering routes
app.use("/calculator", require("./routes/calculator")); //add a calculator router on all methods with /calculator prefix
app.use(
  "/cookies-session-example",
  require("./routes/cookies-session-example")
); //add a calculator router on all methods with /calculator prefix
app.use("/", indexRouter);
app.use("/my-account", checkSessionAuth, protectedRouter);
app.use("/", require("./routes/shop"));
app.get("/admin", async (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
});
app.get("/admin/*", async (req, res) => {
  res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
});
app.use(express.static(path.join(__dirname, "admin", "build")));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});
// startCronJobs();
module.exports = app;
