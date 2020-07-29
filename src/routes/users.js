var express = require("express");
var router = express.Router();

/* GET users listing. */
router.get("/register", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/login", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/auth", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/users", function (req, res, next) {
  res.send("respond with a resource");
});
router.get("/users/:id", function (req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
