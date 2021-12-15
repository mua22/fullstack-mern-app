var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var expressLayouts = require("express-ejs-layouts");
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
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(expressLayouts);
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/api/products", require("./routes/api/products"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/", sessionAuth, indexRouter);
app.use("/", sessionAuth, checkSessionAuth, protectedRouter);
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

module.exports = app;
