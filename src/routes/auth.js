const express = require('express');

const router = express.Router();
const AuthController = require('../controllers/auth');
const { passport } = require('../auth');
const { validate } = require('../validators');
const { registerValidation } = require('../validators/auth');

router.post('/register', validate(registerValidation), AuthController.register);

router.post('/login', passport.authenticate('local'), AuthController.login);

router.post('/logout', passport.authenticate('jwt'), AuthController.logout);

router.post('/auth', passport.authenticate('jwt'), AuthController.auth);

module.exports = router;
