var express = require("express");
const UserController = require("../controllers/user");
var router = express.Router();

router.get("/users", UserController.getAll);

router.get("/users/:id", UserController.getOne);

module.exports = router;
