const express = require("express");
const UserController = require("../controllers/user");
const { passport } = require("../auth");
const router = express.Router();

router.get("/", passport.authenticate("jwt"), UserController.getAll);

router.get("/:id", passport.authenticate("jwt"), UserController.getOne);

module.exports = router;
